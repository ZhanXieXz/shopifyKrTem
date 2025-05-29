// Script for getting data from Cegid - by Viseo
const getOptions = {
    method: 'GET',
    redirect: 'follow'
};
const limit = 10;

let customerId;
let orderPageNumber = 1;
let availableVoucherPageNumber = 1;
let redeemedVoucherPageNumber = 1;
let pointPageNumber = 1;
let totalCustomerOrders = [];
let totalAvailableVouchers = [];
let totalRedeemedVouchers = [];
let totalPointHistory = [];
let isFinalOrderPage = false;
let isFinalAvailableVoucherPage = false;
let isFinalRedeemedVoucherPage = false;
let isFinalPointsHistoryPage = false;

let orderDetailsCallController;

function generateCustomerIdQRCode(CegidCustomerId){
    document.getElementById("customer_id").innerText = CegidCustomerId;
    new QRCode(document.getElementById("customer_id_qrcode"), CegidCustomerId);
}

function displayLeftSide() {
    if ($("#left_side").hasClass("d-none")) {
        $("#left_side").removeClass("d-none");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    customerId = document.getElementById("profile_page").getAttribute("customer-id");

    if (window.location.href.includes("#orderhistory")) {
        initAndGetOrderHistory();
    }

    if (window.location.href.includes("#vouchers")) {
        availableVoucherPageNumber = 1;
        redeemedVoucherPageNumber = 1;
        getAvailableVouchers();
        getRedeemedVouchers();
    }

    fetch("/apps/customer/" + customerId + "/customer-additional-info", getOptions)
        .then(response => {
            switch (response.status) {
                case 200:
                    response.json().then(result => {
                        $("#birth_date").text(result.birthDate);
                       // generateCustomerIdQRCode(result.customerId);
                    });
                    break;
                case 404:
                    throw new Error("Cannot find this customer in Cegid" );
                default:
                    throw new Error("Error occurred on calling Cegid API");
            }
        })
        .catch(error => {
            $("#birth_date_label").hide();
            $("#birth_date").hide();
            $("#customer_id_label").hide();
            $("#customer_id").hide();
            $(".id-code").hide();
            console.log(error);
        }).finally(() => {
        displayLeftSide();
    });
});

// Edit account
document.getElementById("edit_account").addEventListener("submit", event => {
    event.preventDefault();
    let failedMessageDive = document.getElementById('failed_message');
    if (!failedMessageDive.classList.contains('d-none')) {
        failedMessageDive.classList.add('d-none');
    }
    let customerShopifyId = document.getElementById("edit_account").getAttribute("data-id");
    let firstNameInput = $("#first_name_input");
    let lastNameInput = $("#last_name_input");

    let patchOptions = {
        method: 'PATCH',
        redirect: 'follow'
    };

    let params = "?first_name=" + firstNameInput.val() + "&last_name=" + lastNameInput.val();
    fetch("/apps/customer/" + customerShopifyId + params, patchOptions)
      .then(response => {
          if (response.status === 200) {
              firstNameInput.hide();
              lastNameInput.hide();
              $(".account-details-table .btn_cancel").hide();
              $(".account-details-table .btn_submit").hide();
              $("#first_name").val(firstNameInput.val()).text(firstNameInput.val())
              $("#last_name").val(lastNameInput.val()).text(lastNameInput.val());
              $(".account-details-table .btn_edit").show();
              $(".account-details-table p").show();
          } else {
              throw new Error("Failed to edit the account");

          }
      })
      .catch(error => {
          console.log('error', error);
          failedMessageDive.classList.remove("d-none");
      });
});


/** Get order history and order details **/
function renderOderDetailsPage(result) {
    renderField(document.getElementById("order_details_number"), "{{ name }}", result['order_number']);
    renderField(document.getElementById("order_details_date"), "{{ date }}", result['created_at']);
    if (result['cancelled_at']) {
        renderField(document.getElementById("order_canceled_date"), "{{ date }}", result['cancelled_at']);
        renderField(document.getElementById("order_canceled_reason"), "{{ reason }}", result['cancelled_reason']);
        document.getElementById("order_cancelled").classList.remove("d-none");
    }

    // Total discount
    if (result['total_discount'] && result['total_discount'] !== '0.00') {
        document.getElementById("total_discount").classList.remove('d-none');
        document.getElementById("total_discount_amount").innerText = "-" + formatMoney(result['total_discount']);
    }

    // Order total price
    if (result['original_total_price'] && result['original_total_price'] !== '0.00' && parseFloat(result['original_total_price']) > parseFloat(result['final_total_price'])) {
        document.getElementById("order_total").innerHTML = "<dl>" +
          " <dt></dt>" +
          "<dd>" +
          "<s>"+ formatMoney(result['original_total_price']) +"</s>" +
          "</dd>" +
          "<dt></dt>" +
          "<dd>" +
          "<span class=\"order-discount\">" + formatMoney(result['final_total_price']) + "</span>" +
          "</dd>" +
          "</dl>"
    } else {
        document.getElementById("order_total").innerHTML = formatMoney(result['final_total_price']);
    }

    document.getElementById("sub_total").innerText = formatMoney(result['subtotal']);
    document.getElementById("details_payment_status").innerText = " " + result['payment_status'];
    document.getElementById("details_fulfillment_status").innerText = " " + result['fulfillment_status'];

    document.getElementById("billing_address").innerHTML = "<p>" +
      result['billing_address'].first_name +  result['billing_address'].lastname + "<br>" +
      (result['billing_address'].address2 ? result['billing_address'].address2 + "<br>": "") +
      result['billing_address'].address1 + "<br>" +
      (result['billing_address'].province ? result['billing_address'].province + "<br>": "") +
      result['billing_address'].zip + "<br>" +
      result['billing_address'].country + "</p>";
    document.getElementById("shipping_address").innerHTML = "<p>" +
      result['shipping_address'].first_name + result['shipping_address'].lastname + "<br>" +
      (result['shipping_address'].address2 ? result['shipping_address'].address2 + "<br>" : "") +
      result['shipping_address'].address1 + "<br>" +
      (result['shipping_address'].province ? result['shipping_address'].province + "<br>" : "") +
      result['shipping_address'].zip + "<br>" +
      result['shipping_address'].country + "</p>";

    // Tax
    if(result['tax_lines'] && result['tax_lines'].length >0 ) {
        let totalRow = document.getElementById("total_price");
        let taxLabel = document.getElementById("tax_table").getAttribute("data-label");
        result['tax_lines'].forEach(tax => {
            let tr = document.createElement("tr");
            tr.classList.add('offline-tax-row');
            let taxTitle = taxLabel + "(" + tax.title + " " + tax.rate + "%)";
            tr.innerHTML =
              " <th class=\"small--hide\" scope=\"row\" colspan=\"4\">" + taxTitle + "</th>" +
              "<td class=\"tr\" data-label=\" +  " + taxTitle + "\">" + formatMoney(tax.price) + "</td>";
            totalRow.parentNode.insertBefore(tr, totalRow);
        })

    }
    renderOrderDetailsTable(result.line_items);
}

function renderField(elementById, param, textValue) {
    elementById.innerText = elementById.innerText.replace(param, textValue);
}

function getOrderDetails(orderNumber) {
    document.getElementById("order_details_table").innerHTML = "";
    document.querySelectorAll('.offline-tax-row').forEach(taxRow => taxRow.remove());
    document.getElementById("total_discount").classList.add('d-none');

    orderDetailsCallController = new AbortController();
    const orderDetailsSignal = orderDetailsCallController.signal;
    fetch("/apps/customer/" + orderNumber + "/order-details",  {
        method: 'GET',
        redirect: 'follow',
        signal: orderDetailsSignal
    })
      .then(response => {
          switch (response.status) {
              case 200:
                  return response.json();
              case 404:
                  throw new Error("Cannot find this order in Cegid" );
              default:
                  throw new Error("Error occurred on calling Cegid API");
          }
      })
      .then(result => {
          renderOderDetailsPage(result);
          orderDetailsCallController = undefined;
      })
      .catch(error => {
          console.log('error', error.message);
          if (error.message.includes('The user aborted a request')) {
              return;
          }
          $("#error_order_details_message").removeClass("d-none");
      }).finally(() => {
        $("#load_more").prop('disabled', false).text("load more");
        displayLeftSide();
    });
}

function redirectToShopifyOrderPage(orderId, buttonId, order_detail_url) {
    fetch("/apps/customer/" + orderId + "/order-token", getOptions)
      .then(response => {
          if (response.status === 200) {
              return response.json()
          } else {
              throw new Error("Error occurred on calling Cegid API");
          }
      })
      .then(result => {
          document.getElementById(buttonId).href = order_detail_url + "/orders/" + result['token'];
          window.location.href = document.getElementById(buttonId).href;
      })
      .catch(error => {
          console.log('error', error.message);
          $("#error_order_message").removeClass("d-none");
      });
}

function renderOrderHistoryTable(paginatedOrders) {
    let customerOrders = paginatedOrders.orders;
    let total = parseInt(paginatedOrders['total orders count']);
    let orderDataLabel = document.getElementById("order_number").getAttribute("data-label-text");
    let dateDataLabel = document.getElementById("date").getAttribute("data-label-text");
    let paymentStatusDataLabel = document.getElementById("payment_status").getAttribute("data-label-text");
    let fulfillmentStatusDataLabel = document.getElementById("fulfillment_status").getAttribute("data-label-text");
    let totalDataLabel = document.getElementById("total").getAttribute("data-label-text");
    let pointDataLabel = document.getElementById("point").getAttribute("data-label-text");
    let orderDetailsDataLabel = document.getElementById("orderdetails").getAttribute("data-label-text");

    if (total > 0 && customerOrders.length !== 0) {
        $("#order_table").removeClass("d-none");
        customerOrders.forEach(order => {
            totalCustomerOrders.push(order);
            let buttonId = "view_button_" + totalCustomerOrders.length;
            let orderNumber = !order['order shopify number'] ? order['order number'] : order['order shopify number'];
            let orderDetailBaseUrl = $(".sp-myaccount-nav-link--orderdetails").attr("data-url");
            let orderDetailUrl = orderDetailBaseUrl + "#orderhistory?order_number=" + order['order number'];
            document.getElementById("order_history").innerHTML += "<tr>" +
              "<th data-label=\"" + orderDataLabel + "\" scope=\"row\">" + orderNumber + "</th>" +
              "<td data-label=\"" + dateDataLabel + "\">" + order['date'] + "</td>" +
              "<td data-label=\"" + paymentStatusDataLabel + "\">" + order['payment status'] + "</td>" +
              "<td data-label=\"" + fulfillmentStatusDataLabel + "\">" +  order['fulfillment status'] + "</td>" +
              "<td data-label=\"" + totalDataLabel + "\">" + formatMoney(order['total'])+ "</td>" +
              "<th data-label=\"" + pointDataLabel + "\" scope=\"row\">" + order['points earned'] + "</th>" +
              "<th data-label=\"" + orderDetailsDataLabel + "\" scope=\"row\">" +
              "<a id=\"" + buttonId + "\" href='" + orderDetailUrl  + "' class=\"btn js_add_ld\" aria-label=\"" + order['order number'] + "\">" + orderDetailsDataLabel + "</a>" +
              "</th>" +
              "</tr>";

            setTimeout(() => document.getElementById(buttonId).addEventListener("click", evt => {
                evt.preventDefault();
                let isOnline = order['isOnline'] === 'true';
                if ((!order['order number'] && !isOnline) || (!order['order shopify id'] && isOnline)) {
                    $(".orders").hide();
                    $(".orderhistory-title").hide();
                    $(".orderhistory-table").hide();
                    $(".sp-myaccount-nav-link.is-active").removeClass("is-active");
                    $(".sp-myaccount-nav-link.pe_none").removeClass("pe_none");
                    $(".sp-myaccount-nav-link--orderdetails")
                      .removeClass("d-none")
                      .addClass("is-active")
                      .addClass("pe_none");
                    $("#order_details").show();
                    $('#error_order_details_message').removeClass('d-none');
                } else if (isOnline) {
                    redirectToShopifyOrderPage(order['order shopify id'], buttonId, orderDetailBaseUrl);
                } else {
                    $(".orders").hide();
                    $(".orderhistory-title").hide();
                    $(".orderhistory-table").hide();
                    $(".sp-myaccount-nav-link.is-active").removeClass("is-active");
                    $(".sp-myaccount-nav-link.pe_none").removeClass("pe_none");
                    $(".sp-myaccount-nav-link--orderdetails")
                      .removeClass("d-none")
                      .addClass("is-active")
                      .addClass("pe_none");
                    let nav_text = $(".sp-myaccount-nav-link--orderdetails").attr("data-label");
                    $(".sp-myaccount-nav-link--orderdetails a")
                      .text(nav_text.replace("{{ name }}", order['order number']));
                    window.location.href = orderDetailUrl;
                    getOrderDetails(order['order number']);
                    $('#details_content').removeClass("d-none");
                }
            }), 10);
        });

        if (totalCustomerOrders.length < total) {
            $("#load_more_orders").removeClass("d-none");
        } else {
            isFinalOrderPage = true;
            $("#load_more_orders").addClass("d-none");
        }
    } else if (totalCustomerOrders.length === 0) {
        $("#no_order_message").removeClass("d-none");
    }

}

function renderOrderDetailsTable(orderLineItems) {
    let product_title = document.getElementById("details_product").getAttribute("data-label-text");
    let product_sku = document.getElementById("details_sku").getAttribute("data-label-text");
    let product_price = document.getElementById("details_price").getAttribute("data-label-text");
    let product_quantity = document.getElementById("details_quantity").getAttribute("data-label-text");
    let product_total = document.getElementById("details_total").getAttribute("data-label-text");
    if (orderLineItems.length !== 0) {
        orderLineItems.forEach(item => {
            let titleWithDiscountRow;
            if (item['discount']['amount'] && item['discount']['amount'] !== '0.00') {
                titleWithDiscountRow = "<th data-label=\"" + product_title + "\" class=\"order-table__product\" scope=\"row\">" +
                  item['product title'] +
                  "<ul class=\"ul_none order-discount order-discount--list order-discount--title\"" +
                  "aria-label=\"{{ 'customer.order.discount' | t }}\">" +
                  "<li class=\"order-discount__item\">" +
                  "<i class=\"facl facl-tags\"></i>" + item['discount']['title'] +
                  "(-"+ formatMoney(item['discount']['amount']) + ")" +
                  "</li>" +
                  "</ul>" +
                  "</th>";
            } else {
                titleWithDiscountRow = "<th data-label=\"" + product_title + "\" class=\"order-table__product\" scope=\"row\">" + item['product title'] + "</th>";
            }

            let priceRow;
            if (item['price']['original price'] && item['price']['original price'] !== '0.00' && parseFloat(item['price']['original price']) > parseFloat(item['price']['final price'])) {
                priceRow = " <td class=\"tr\" data-label=\""+ product_price +"\"><dl>" +
                  "<dt></dt>" +
                  "<dd>" +
                  "<s>" + formatMoney(item['price']['original price']) + "</s>" +
                  "</dd>" +
                  "<dt></dt>" +
                  "<dd>" +
                  "<span class=\"order-discount\">" + formatMoney(item['price']['final price']) + "</span>" +
                  "</dd></dl>"  +
                  "</td>";
            } else {
                priceRow = " <td class=\"tr\" data-label=\""+ product_price +"\"><dl>" +
                  "<dt></dt>" +
                  "<dd>" + formatMoney(item['price']['final price']) +
                  "</dd></dl>" +
                  "</td>";
            }

            let totalRow;
            if (item['original line price'] && item['original line price'] !== '0.00' && parseFloat(item['original line price']) > parseFloat(item['final_line_price'])) {
                totalRow = "<td data-label=\"" + product_total + "\"  class=\"tr\">" +
                  "<dl>" +
                  "<dt></dt>" +
                  "<dd>" +
                  "<s>"+  formatMoney(item['original line price'])  +"</s>" +
                  "</dd>" +
                  "<dt></dt>" +
                  "<dd>" +
                  " <span class=\"order-discount\">"+ formatMoney(item['final line price']) +"</span>" +
                  " </dd>" +
                  "</dl>" +
                  "</td>"
            } else {
                totalRow =  "<td data-label=\"" + product_total + "\"  class=\"tr\">" + formatMoney(item['final line price']) + "</td>";
            }
            document.getElementById("order_details_table").innerHTML += "<tr>" +
              titleWithDiscountRow +
              "<td data-label=\"" + product_sku + "\">" + item['sku'] + "</td>" +
              priceRow +
              "<td data-label=\"" + product_quantity + "\"  class=\"tr\">" +  parseInt(item['quantity']) + "</td>" +
              totalRow;
        });
    }
    $("#order_details").show();
}


function getOrderHistory() {
    fetch("/apps/customer/" + customerId + "/order-history?page=" + orderPageNumber + "&limit=" + limit, getOptions)
      .then(response => {
          switch (response.status) {
              case 200:
                  return response.json();
              case 404:
                  throw new Error("Cannot find this customer in Cegid" );
              default:
                  throw new Error("Error occurred on calling Cegid API");
          }
      })
      .then(result => {
          renderOrderHistoryTable(result);
      })
      .catch(error => {
          console.log('error', error.message);
          $("#error_order_message").removeClass("d-none");
      }).finally(() => {
        $("#load_more_orders").prop('disabled', false).text("load more");
        displayLeftSide();
    });
}

function initAndGetOrderHistory() {
    $("#order_table").addClass("d-none");
    $("#load_more_orders").addClass("d-none");
    $('#error_order_message').addClass('d-none');
    $('#error_order_details_message').addClass('d-none');
    totalCustomerOrders = [];
    document.getElementById("order_history").innerHTML = "";
    orderPageNumber = 1;
    isFinalOrderPage = false;
    getOrderHistory();
}

document.querySelector(".sp-myaccount-nav-link--orderhistory").addEventListener("click", () => {
    initAndGetOrderHistory();
})

document.getElementById("load_more_orders").addEventListener("click", event => {
    event.preventDefault();
    if (isFinalOrderPage) {
        return;
    }
    $("#load_more_orders").prop('disabled', true).text("loading...");
    orderPageNumber += 1;
    getOrderHistory();
});

/** Get available points, available vouchers, redeemed vouchers **/
function renderAvailableVouchersTable(paginatedAvailableVouchers) {
    let availableVouchers = paginatedAvailableVouchers['available vouchers'];
    let total = parseInt(paginatedAvailableVouchers['total available vouchers']);

    if (availableVouchers.length > 0) {
        availableVouchers.forEach( availableVoucher => {
            document.getElementById("available_voucher_table_body").innerHTML += "<tr>" +
              "<td class=\"date\">" + availableVoucher['date'] + "</td>" +
              "<td class=\"vouchers-type\">" + availableVoucher['voucher type'] + "</td>" +
              "<td class=\"vouchers-code\">" + availableVoucher['voucher code'] + "</td>" +
              "<td class=\"expiry-date\">"+ availableVoucher['expiry date'] + "</td>" +
              "<td class=\"online-offline\">"+ availableVoucher['online/offline'] + "</td>" +
              "<td class=\"orderno\">"+ availableVoucher['description'] + "</td>" +
              "</tr>";
            totalAvailableVouchers.push(availableVoucher);
        })
        if (totalAvailableVouchers.length < total) {
            $("#load_more_available_vouchers").removeClass("d-none");
        } else {
            isFinalAvailableVoucherPage = true;
            $("#load_more_available_vouchers").addClass("d-none");
        }
        $("#available_voucher_table").removeClass("d-none");
    } else if (totalAvailableVouchers.length === 0) {
        $("#no_available_vouchers_message").removeClass("d-none");
    }

}

function renderAvailablePoints(totalPoints) {
    $(".pointsPart").text(totalPoints);
}

function getAvailableVouchers() {
    fetch("/apps/customer/" + customerId + "/available_vouchers?page=" + availableVoucherPageNumber + "&limit=" + limit, getOptions)
      .then(response => {
          switch (response.status) {
              case 200:
                  return response.json();
              case 404:
                  throw new Error("Cannot find this customer in Cegid" );
              default:
                  throw new Error("Error occurred on calling Cegid API");
          }
      })
      .then(result => {
          renderAvailablePoints(result['total available points']);
          renderAvailableVouchersTable(result);
      })
      .catch(error => {
          console.log('error', error.message);
          $("#error_available_vouchers_message").removeClass("d-none");
      }).finally(() => {
        $("#load_more_available_vouchers").prop('disabled', false).text("load more");
        displayLeftSide();
    });
}

function renderRedeemedVouchersTable(paginatedRedeemedVouchers) {
    let redeemedVouchers = paginatedRedeemedVouchers['redeemed vouchers'];
    let total = parseInt(paginatedRedeemedVouchers['total redeemed vouchers']);

    if (total > 0 && redeemedVouchers.length > 0) {
        redeemedVouchers.forEach( redeemedVoucher => {
            document.getElementById("redeemed_voucher_table_body").innerHTML += "<tr>" +
              "<td class=\"date\">" + redeemedVoucher['date of redemption'] + "</td>" +
              "<td class=\"vouchers-type\">" + redeemedVoucher['voucher type'] + "</td>" +
              "<td class=\"vouchers-code\">" + redeemedVoucher['voucher code'] + "</td>" +
              "<td class=\"orderno\">"+ redeemedVoucher['order number'] + "</td>" +
              "</tr>";
            totalRedeemedVouchers.push(redeemedVoucher);
        })
        if (totalRedeemedVouchers.length < total) {
            $("#load_more_redeemed_vouchers").removeClass("d-none");
        } else {
            isFinalRedeemedVoucherPage = true;
            $("#load_more_redeemed_vouchers").addClass("d-none");
        }
        $("#redeemed_voucher_table").removeClass("d-none");
    } else if (totalRedeemedVouchers.length === 0) {
        $("#no_redeemed_vouchers_message").removeClass("d-none");
    }
}

function getRedeemedVouchers() {
    fetch("/apps/customer/" + customerId + "/redeemed_vouchers?page=" + redeemedVoucherPageNumber + "&limit=" + limit, getOptions)
      .then(response => {
          switch (response.status) {
              case 200:
                  return response.json();
              case 404:
                  throw new Error("Cannot find this customer in Cegid" );
              default:
                  throw new Error("Error occurred on calling Cegid API");
          }
      })
      .then(result => {
          renderRedeemedVouchersTable(result);
      })
      .catch(error => {
          console.log('error', error.message);
          $("#no_redeemed_vouchers_message").removeClass("d-none");
      }).finally(() => {
        $("#load_more_redeemed_vouchers").prop('disabled', false).text("load more");
        displayLeftSide();
    });
}

$(".sp-myaccount-nav-link--vouchers a").on('click', function() {
    availableVoucherPageNumber = 1;
    redeemedVoucherPageNumber = 1;
    totalAvailableVouchers = [];
    totalRedeemedVouchers = [];
    document.getElementById("redeemed_voucher_table_body").innerHTML = "";
    getAvailableVouchers();
    getRedeemedVouchers()
});

document.getElementById("load_more_redeemed_vouchers").addEventListener("click", event => {
    event.preventDefault();
    if (isFinalRedeemedVoucherPage) {
        return;
    }
    $("#load_more_redeemed_vouchers").prop('disabled', true).text("loading...");
    redeemedVoucherPageNumber += 1;
    getRedeemedVouchers();
});

document.getElementById("load_more_available_vouchers").addEventListener("click", event => {
    event.preventDefault();
    if (isFinalAvailableVoucherPage) {
        return;
    }
    $("#load_more_available_vouchers").prop('disabled', true).text("loading...");
    availableVoucherPageNumber += 1;
    getAvailableVouchers();
});

/**  Get points history **/
function renderPointsHistoryTable(paginatedPoints) {
    let points = paginatedPoints.points;
    let total = parseInt(paginatedPoints['total count']);

    if (total > 0 && points.length > 0) {
        points.forEach( point_item => {
            document.getElementById("points_history_table_body").innerHTML += "<tr class=\"lion-history-table__row\">" +
              "<td class=\"lion-history-table__row-cell lion-history-table__row-date\">" + point_item['date'] + "</td>" +
              "<td class=\"lion-history-table__row-cell\">" + point_item['action'] + "</td>" +
              "<td class=\"lion-history-table__row-cell\">" + point_item['point'] + "</td>" +
              "</tr>";
            totalPointHistory.push(point_item);
        })
        if (pointPageNumber === 1) {
            document.getElementById("points_history_table").classList.remove("d-none");
        }
        if (totalPointHistory.length < total) {
            $("#load_more_points_history").removeClass("d-none");
        } else {
            isFinalPointsHistoryPage = true;
            $("#load_more_points_history").addClass("d-none");
        }
    } else if (totalRedeemedVouchers.length === 0) {
        $("#no_points_history").removeClass("d-none");
    }
}

function getPointsHistory() {
    fetch("/apps/customer/" + customerId + "/points-history?page=" + pointPageNumber + "&limit=" + limit, getOptions)
      .then(response => {
          switch (response.status) {
              case 200:
                  return response.json();
              case 404:
                  throw new Error("Cannot find this customer in Cegid" );
              default:
                  throw new Error("Error occurred on calling Cegid API");
          }
      })
      .then(result => {
          renderPointsHistoryTable(result);
      })
      .catch(error => {
          console.log('error', error.message);
          $("#error_points_history_message").removeClass("d-none");
      }).finally(() => {
        $("#load_more_points_history").prop('disabled', false).text("load more");
    });
}

document.getElementById("check_points_history").addEventListener("click", event => {
    $(".vouchers_popup").fadeIn();
    getPointsHistory()
});


document.getElementById("load_more_points_history").addEventListener("click", event => {
    event.preventDefault();
    if (isFinalPointsHistoryPage) {
        return;
    }
    $("#load_more_points_history").prop('disabled', true).text("loading...");
    pointPageNumber += 1;
    getPointsHistory();
});

document.getElementById("points_history_close").addEventListener("click", event => {
    $(".vouchers_popup").fadeOut();
    pointPageNumber = 1;
    totalPointHistory = [];
    $("#load_more_points_history").addClass('d-none');
    document.getElementById("points_history_table").classList.add('d-none');
    document.getElementById("points_history_table_body").innerHTML = "";
});

function abortGettingOrderDetails() {
    if (orderDetailsCallController) {
        orderDetailsCallController.abort();
    }
}

// Abort order details call when switch to another page
document.querySelectorAll('.sp-myaccount-nav-link').forEach(el => {
    if (!el.classList.contains("sp-myaccount-nav-link--orderdetails")) {
        el.addEventListener('click', event => {
            abortGettingOrderDetails();
        })
    }
})


function formatMoney(cents, format) {
    if (typeof cents == 'string') { cents = cents.replace('.', ''); }
    var value = '',
      placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
      formatString = (format || t_moneyFormat || '${{amount}}');

    var defaultOption = function(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }

    var formatWithDelimiters = function(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) {
            return 0;
        };

        number = (number / 100.0).toFixed(precision);

        var parts = number.split('.');
        var dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        var cents = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
    }

    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }

    return formatString.replace(placeholderRegex, value);
}