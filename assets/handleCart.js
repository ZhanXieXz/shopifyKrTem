// 当顾客消费够XXX ,赠送商品自动加入购物车
let $ld = $('#ld_cl_bar'),
      $ld_cart = $('.ld_cart_bar');
console.log('是否开启自动加购：'+enable_gift,$('.mini_cart_actions input.qty_cart_js').length)
$('head').append('<style>.mini_cart_actions input.qty_cart_js{pointer-events:none}</style>')

const handleCart = {
  open: enable_gift, // 是开启自动赠送礼品
  giftVariantId: 40636383199429,  // 礼品的属性id
  moneyOffNumber: 3500000,    // 需满足的金额
  is_in_cart: false, // 是否在购物车加减删除商品按钮场景
  is_check_with_tag: false,// 是否开启排除对应tag商品的功能
  excludeProductTag: 'markdown:mss22'.toLocaleLowerCase(), // 需要排除的有此tag的商品
  cartUrl: t_cart_url,
  cartAddUrl: t_cartadd_url + '.js',
  cartChangeUrl: t_cartchange_url + '.js',
  _cart_upsell: $('[data-cart-upsell-js]'),
  _cart_upsell_length: $('[data-cart-upsell-js]').length,
  // 检查是否需要赠送商品
  init(){
    // 是否已开启自动加购
    if(!this.open) { return false }

    // 当前操作是否为编辑购物车的，为购物车场景则不执行自动添加操作
    if (handleCart.is_in_cart) {
      console.log('为购物车场景');
      handleCart.is_in_cart = false
      return false
    }

    
    // 判断购物车中是否已存在该商品,不存在则执行赠送
    this.checkGiftIsInCart().then(data => {
      if (data.items.length>0) {
        if (handleCart.is_check_with_tag) {
          // 检查tag
          handleCart.checkHasExcludeProduct(data)
        }else{
          // 不检查tag
          handleCart.checkCart(data)
        }
      }else{
        console.log('购物车为空')
      }
    })
  },
  // 检查是否存在需要排除的商品
  checkHasExcludeProduct(data){
    console.log('检查是否存在需要排除的商品');
    let cartTotalPrice = data.total_price

    if (!$('body').hasClass('template-cart')) {
      if ($('.mini_cart_item.js_cart_item').length<=0) {
        setTimeout(() => {
          handleCart.checkHasExcludeProduct(data)
        }, 10);
  
        return
      }

      for (let i = 0; i < $('.mini_cart_item.js_cart_item').length; i++) {
        const item_tag = $('.mini_cart_item.js_cart_item').eq(i).find('.js-pro-tag').text().toLocaleLowerCase()
        if (item_tag.indexOf(handleCart.excludeProductTag) > -1) {
          console.log('存在打折商品',$('.mini_cart_item.js_cart_item').eq(i).find('.mini_cart_title').text(), data.items[i].final_price,data.items[i].quantity );
          cartTotalPrice = cartTotalPrice - (data.items[i].final_price * data.items[i].quantity)
        }
      }
    }else{
      if ($('.cart_item.js_cart_item').length<=0) {
        setTimeout(() => {
          handleCart.checkHasExcludeProduct(data)
        }, 10);
  
        return
      }

      for (let i = 0; i < $('.cart_item.js_cart_item').length; i++) {
        const item_tag = $('.cart_item.js_cart_item').eq(i).find('.js-pro-tag').text().toLocaleLowerCase()
        if (item_tag.indexOf(handleCart.excludeProductTag) > -1) {
          console.log('存在打折商品',$('.mini_cart_item.js_cart_item').eq(i).find('.mini_cart_title').text(), data.items[i].final_price,data.items[i].quantity );
          cartTotalPrice = cartTotalPrice - (data.items[i].final_price * data.items[i].quantity)
        }
      }
    }

    data.total_price = cartTotalPrice

    console.log('去除【'+handleCart.excludeProductTag+'】商品后的总额为：',data.total_price);
    handleCart.checkCart(data)
  },
  checkCart(data){
    return new Promise (resolve => {
      let isInCart = false
      for (let i = 0; i < data.items.length; i++) {
        const item_id = data.items[i].variant_id;
        // PS：此包分男女款，男女款任一在购物车中都视为已添加
        let womenVId = handleCart.giftVariantId,
          menVId = 43442609848538
        if (item_id==womenVId || item_id==menVId) {
          isInCart = true
        }
      }
      console.log(data);

      console.log(data.total_price, handleCart.moneyOffNumber);
      if (data.total_price >= handleCart.moneyOffNumber) {
        console.log('达到赠送标准');
        if (!isInCart) {
          console.log('不在购物车中，需要添加');
          handleCart.addToCart(handleCart.giftVariantId).then(data => {
            console.log('赠品加入购物车成功');
            handleCart.onCartUpdate()
          })
        }else{
          console.log('已在购物车中，不需要再添加');
        }
      } else{
        console.log('未达到赠送标准');
        // if (isInCart) {
        //   console.log('已在购物车中，需要删除');
        // }
      }

      resolve()
    });
  },
  // 检查购物车中是否已经存在赠品
  checkGiftIsInCart(){
    // return isInCart
    return new Promise (resolve => {
      $.ajax({
          type: 'GET',
          url: `/cart.js`,
          dataType: "json",
          success: function (data) {
            resolve(data)
          },
          error: function (XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest.responseJSON.description);
          }
      });
    })
  },
  getUrlParam(url,name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
  },
  addToCart(variantId) {
    return new Promise (resolve => {
       $.ajax({
          type: 'post',
          url: `/cart/add.js?id=${variantId}`,
          dataType: "json",
          success: function (data) {
            // WishlistPage.openCart()
             console.log('~~~~~~执行完毕')
            //  $('.js-option-pro').hide()
            //  $('.mask').hide()
            //  $('body').css('overflow','auto')
             resolve()
          },
          error: function (XMLHttpRequest, textStatus) {
            $("body").append(`
              <div id="sp_notices_wrapper">
                <p class="shopify-info sp_notice show_notice">
                  <i class="facl facl-attention"></i>
                  Error: ${XMLHttpRequest.responseJSON.description}
                  <i class="pegk pe-7s-close"></i>
                </p>  
              </div>`)
            $('.add_js_cart').removeClass('loading')
            console.log(XMLHttpRequest.responseJSON.description);
          }
       });
    })
  },
  onCartUpdate(bl,blUp_items,id) {
    if ($('body').hasClass('template-cart')) {
      if ($('.reload_cart_js').length > 0) {
        location.reload(); 
        return false;
      }
      
      fetch(handleCart.cartUrl+'?view=pagejs', {
          "credentials": "same-origin",
          "headers": {
            "cache-control": "no-cache"
          }
      })
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
          data = data.split('[split_t4nt0]')[1];
          var arrCat = data.split("[split_t4nt]"),
            OldCartCount = $('.jsccount').first().html(),
            CurrentCartCount = arrCat[0];

          if (CurrentCartCount != OldCartCount ) {
            $('body').removeClass('t4_cart_count_'+OldCartCount).addClass('t4_cart_count_'+CurrentCartCount);
            if ( parseInt(CurrentCartCount) == 0 ) {
                $('.nt_js_cart, .js_cart_cd').hide();
                $('.shipping_calc_page').addClass('dn');
                $('.empty_cart_page').show();
            } else {
                $('.empty_cart_page').hide();
                $('.nt_js_cart, .js_cart_cd').show();
                $('.shipping_calc_page').removeClass('dn');
            }

            $('.jsccount').html(CurrentCartCount)
            var aar1 = arrCat[1].split(',]'),
                this_thres = $('.cart_thres_'+aar1[0]);
            if (aar1 != 'spt4') {

              if (this_thres.is(":hidden")) {
                $('.cart_thres_1,.cart_thres_2,.cart_thres_3').slideUp(200);
                    this_thres.slideDown(250);
              }
                if (CurrentCartCount != 0 && $('.cart_thres_3').is(":hidden")) {
                ck_canvas = true;
                } else {
                ck_canvas = false
                }
              // UpdateShipBar(arrCat[1],aar1[1],this_thres);
            }
            if (blUp_items) {$('.js_cat_items').html(arrCat[2]);}
            $('.js_cat_dics').html(arrCat[3]);
            $('.js_cat_ttprice').html(arrCat[4]);
                
                //console.log(arrCat[5])
            if (arrCat[5] == '1') {
              $('.js_gift_wrap').addClass('dn');
            } else {
              $('.js_gift_wrap').removeClass('dn');
            }

            $('body').trigger('refresh_currency');
            if ($.magnificPopup.instance.isOpen){
              $.magnificPopup.close();
            }

            //if (bl && !body.hasClass('pside_opened')) {  $('.push_side[data-id="#nt_cart_canvas"]').trigger('click'); }
          }
          $('.nt_js_cart.loading, .js_addtc.loading, .js_frm_cart.loading, .js_add_group.loading, .sticky_atc_js.loading').removeClass('loading');
          $ld.trigger( "ld_bar_end" );
          if (blUp_items) {
              $('html, body').animate({
                  scrollTop: $('#shopify-section-cart-template').offset().top - 40
              }, 400);
          }

          console.log('更新成功');
          let CurrentCart = arrCat[2];
          $('.cart_items.js_cat_items').html(CurrentCart)
      })
      .catch(function(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      });
      
    } else {
      fetch(handleCart.cartUrl+'?view=js', {
          "credentials": "same-origin",
          "headers": {
            "cache-control": "no-cache"
          }
      })
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        data = data.split('[split_t4nt0]')[1];
        var arrCat = data.split("[split_t4nt]"),
            OldCartCount = $('.jsccount').first().html(),
            CurrentCartCount = arrCat[0];

        if (CurrentCartCount != OldCartCount ) {
          $('body').removeClass('t4_cart_count_'+OldCartCount).addClass('t4_cart_count_'+CurrentCartCount);
          if ( parseInt(CurrentCartCount) == 0 ) {
              $('.nt_js_cart .js_cart_note,.nt_js_cart .js_cart_footer,.nt_js_cart .js_cart_tool,.js_cat_items,.js_cart_cd').hide();
              $('.nt_js_cart .empty').show();
              $('[data-cart-upsell-js]').html('');
          } else {
              $('.nt_js_cart .empty').hide();
              $('.nt_js_cart .js_cart_note,.nt_js_cart .js_cart_footer,.nt_js_cart .js_cart_tool,.js_cat_items,.js_cart_cd').show();
          }

          $('.jsccount').html(CurrentCartCount)
          var aar1 = arrCat[1].split(',]'),
              this_thres = $('.cart_thres_'+aar1[0]);
          if (aar1 != 'spt4') {
            //console.log(arrCat[1])
              if (this_thres.is(":hidden")) {
                $('.cart_thres_1,.cart_thres_2,.cart_thres_3').slideUp(200);
                    this_thres.slideDown(250);
              }
                if (CurrentCartCount != 0 && $('.cart_thres_3').is(":hidden")) {
                ck_canvas = true;
                } else {
                ck_canvas = false
                }
            // UpdateShipBar(arrCat[1],aar1[1],this_thres);
          }
          if (blUp_items) {$('.js_cat_items').html(arrCat[2]);}
          $('.js_cat_dics').html(arrCat[3]);
          $('.js_cat_ttprice').html(arrCat[4]);

          if (arrCat[5] == '1') {
            $('.js_cart_tls_back').trigger('click')
                $('.js_gift_wrap').addClass('dn');
          } else {
                $('.js_gift_wrap').removeClass('dn');
          }
              
          // if ( $('.popup_uppr_wrap').length > 0 ) {
          //   id = 19041994;
          //   TriggerAfterATC(bl,id);
          // } else if ($.magnificPopup.instance.isOpen){
          //   $.magnificPopup.close();
          //   setTimeout(function(){ TriggerAfterATC(bl,id); }, 505);
          // } else {
          //   TriggerAfterATC(bl,id);
          // }
          handleCart.WidgetCartUpdateMobile(); 
          $('body').trigger('refresh_currency');
            // open hidden sidebar cart
          
          console.log('更新成功');
          let CurrentCart = arrCat[2];
          $('.mini_cart_items').html(CurrentCart)
        }
        $('.nt_js_cart.loading, .js_addtc.loading, .js_frm_cart.loading, .js_add_group.loading, .sticky_atc_js.loading').removeClass('loading');
        $ld.trigger( "ld_bar_end" );
      })
      .catch(function(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    }
  },
  WidgetCartUpdateMobile() {
      if ( $('.js_cart_footer').height() < $(window).height()/2 || $('#nt_cart_canvas').hasClass('fix_layout_mbt4') || window_w > 767 ) return;
      $('#nt_cart_canvas').addClass('fix_layout_mbt4');
  }
  // 
}

handleCart.init()

// 购物车加减删除商品按钮场景
$(document).on('click','button.plus,button.minus,a.cart_ac_remove',function(){
  handleCart.is_in_cart = true
})

$(document).on('change','.mini_cart_actions input.qty_cart_js',function(){
  console.log('change');
  handleCart.is_in_cart = true
})