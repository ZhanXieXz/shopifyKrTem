// Script for validating the voucher code on Cegid Database - by Viseo
function addErrorMessage(form, errorMessage) {
  let newNode = document.createElement("p");
  newNode.setAttribute('id', 'cegid-error-for-reduction_code');
  newNode.classList.add('field__message', 'voucher_code__message--error');
  newNode.style.color = 'red';
  newNode.innerText = errorMessage;
  form.appendChild(newNode);
}

document.querySelectorAll(".order-summary__sections .order-summary__section--discount .edit_checkout #checkout_submit").forEach( submitButton => submitButton.addEventListener("click",event=>{
  event.preventDefault();
  let voucherCodeInput = document.querySelector(".order-summary__sections .order-summary__section--discount .edit_checkout #checkout_reduction_code");
  let form = voucherCodeInput.parentNode.parentNode.parentNode.parentNode.parentNode;
  let voucherCode = voucherCodeInput.value;
  let customerShopifyId = document.querySelector(".content").getAttribute("customer-id");

  if (!customerShopifyId) {
    addErrorMessage(form, "Please login to use the voucher");
    return;
  }

  const getOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  // Only Cegid voucher code need to be validated by Cegid
  if (!voucherCode.startsWith("URLC") && !voucherCode.startsWith("URBD") && !voucherCode.startsWith("URNJ")) {
    form.submit();
    return;
  }

  let params = "?voucher_code=" + voucherCode;

  fetch("/apps/customer/" + customerShopifyId + "/voucher_check" + params, getOptions)
    .then(response => {
    if (response.status === 200) {
      response.json().then(result =>
      {
        if (result['available vouchers'] && result['available vouchers'].length > 0){
          form.submit();
        } else {
          voucherCodeInput.parentNode.classList.add('field--error');
          addErrorMessage(form, "Enter a valid discount code or gift card");
        }
      })
    } else {
      throw new Error("Failed to valid the voucher code");}
  })
    .catch(error => {
      console.log('error', error);
      addErrorMessage(form, "Failed to valid the voucher code");

    });
}))

document.querySelector(".order-summary__sections .order-summary__section--discount .edit_checkout #checkout_reduction_code").addEventListener("focus", evt => {
  let cegidErrorMessage = document.getElementById('cegid-error-for-reduction_code');
  if (cegidErrorMessage) {
    cegidErrorMessage.remove();
    evt.target.parentNode.classList.remove('field--error');
  }
})