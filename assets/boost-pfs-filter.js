/** VERSION: 0.0.3 Please do not delete this line. Thank you! **/
if(typeof lazySizes !== 'function' && typeof lazySizes !== 'object'){
  /*! lazysizes - v4.1.8 */
  !function (a, b) { var c = b(a, a.document); a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c) }(window, function (a, b) { "use strict"; if (b.getElementsByClassName) { var c, d, e = b.documentElement, f = a.Date, g = a.HTMLPictureElement, h = "addEventListener", i = "getAttribute", j = a[h], k = a.setTimeout, l = a.requestAnimationFrame || k, m = a.requestIdleCallback, n = /^picture$/i, o = ["load", "error", "lazyincluded", "_lazyloaded"], p = {}, q = Array.prototype.forEach, r = function (a, b) { return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b] }, s = function (a, b) { r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b) }, t = function (a, b) { var c; (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " ")) }, u = function (a, b, c) { var d = c ? h : "removeEventListener"; c && u(a, b), o.forEach(function (c) { a[d](c, b) }) }, v = function (a, d, e, f, g) { var h = b.createEvent("Event"); return e || (e = {}), e.instance = c, h.initEvent(d, !f, !g), h.detail = e, a.dispatchEvent(h), h }, w = function (b, c) { var e; !g && (e = a.picturefill || d.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src), e({ reevaluate: !0, elements: [b] })) : c && c.src && (b.src = c.src) }, x = function (a, b) { return (getComputedStyle(a, null) || {})[b] }, y = function (a, b, c) { for (c = c || a.offsetWidth; c < d.minSize && b && !a._lazysizesWidth;)c = b.offsetWidth, b = b.parentNode; return c }, z = function () { var a, c, d = [], e = [], f = d, g = function () { var b = f; for (f = d.length ? e : d, a = !0, c = !1; b.length;)b.shift()(); a = !1 }, h = function (d, e) { a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g))) }; return h._lsFlush = g, h }(), A = function (a, b) { return b ? function () { z(a) } : function () { var b = this, c = arguments; z(function () { a.apply(b, c) }) } }, B = function (a) { var b, c = 0, e = d.throttleDelay, g = d.ricTimeout, h = function () { b = !1, c = f.now(), a() }, i = m && g > 49 ? function () { m(h, { timeout: g }), g !== d.ricTimeout && (g = d.ricTimeout) } : A(function () { k(h) }, !0); return function (a) { var d; (a = !0 === a) && (g = 33), b || (b = !0, d = e - (f.now() - c), d < 0 && (d = 0), a || d < 9 ? i() : k(i, d)) } }, C = function (a) { var b, c, d = 99, e = function () { b = null, a() }, g = function () { var a = f.now() - c; a < d ? k(g, d - a) : (m || e)(e) }; return function () { c = f.now(), b || (b = k(g, d)) } }; !function () { var b, c = { lazyClass: "lazyload", loadedClass: "lazyloaded", loadingClass: "lazyloading", preloadClass: "lazypreload", errorClass: "lazyerror", autosizesClass: "lazyautosizes", srcAttr: "data-src", srcsetAttr: "data-srcset", sizesAttr: "data-sizes", minSize: 40, customMedia: {}, init: !0, expFactor: 1.5, hFac: .8, loadMode: 2, loadHidden: !0, ricTimeout: 0, throttleDelay: 125 }; d = a.lazySizesConfig || a.lazysizesConfig || {}; for (b in c) b in d || (d[b] = c[b]); a.lazySizesConfig = d, k(function () { d.init && F() }) }(); var D = function () { var g, l, m, o, p, y, D, F, G, H, I, J, K = /^img$/i, L = /^iframe$/i, M = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent), N = 0, O = 0, P = 0, Q = -1, R = function (a) { P-- , (!a || P < 0 || !a.target) && (P = 0) }, S = function (a) { return null == J && (J = "hidden" == x(b.body, "visibility")), J || "hidden" != x(a.parentNode, "visibility") && "hidden" != x(a, "visibility") }, T = function (a, c) { var d, f = a, g = S(a); for (F -= c, I += c, G -= c, H += c; g && (f = f.offsetParent) && f != b.body && f != e;)(g = (x(f, "opacity") || 1) > 0) && "visible" != x(f, "overflow") && (d = f.getBoundingClientRect(), g = H > d.left && G < d.right && I > d.top - 1 && F < d.bottom + 1); return g }, U = function () { var a, f, h, j, k, m, n, p, q, r, s, t, u = c.elements; if ((o = d.loadMode) && P < 8 && (a = u.length)) { for (f = 0, Q++; f < a; f++)if (u[f] && !u[f]._lazyRace) if (!M || c.prematureUnveil && c.prematureUnveil(u[f])) aa(u[f]); else if ((p = u[f][i]("data-expand")) && (m = 1 * p) || (m = O), r || (r = !d.expand || d.expand < 1 ? e.clientHeight > 500 && e.clientWidth > 500 ? 500 : 370 : d.expand, c._defEx = r, s = r * d.expFactor, t = d.hFac, J = null, O < s && P < 1 && Q > 2 && o > 2 && !b.hidden ? (O = s, Q = 0) : O = o > 1 && Q > 1 && P < 6 ? r : N), q !== m && (y = innerWidth + m * t, D = innerHeight + m, n = -1 * m, q = m), h = u[f].getBoundingClientRect(), (I = h.bottom) >= n && (F = h.top) <= D && (H = h.right) >= n * t && (G = h.left) <= y && (I || H || G || F) && (d.loadHidden || S(u[f])) && (l && P < 3 && !p && (o < 3 || Q < 4) || T(u[f], m))) { if (aa(u[f]), k = !0, P > 9) break } else !k && l && !j && P < 4 && Q < 4 && o > 2 && (g[0] || d.preloadAfterLoad) && (g[0] || !p && (I || H || G || F || "auto" != u[f][i](d.sizesAttr))) && (j = g[0] || u[f]); j && !k && aa(j) } }, V = B(U), W = function (a) { var b = a.target; if (b._lazyCache) return void delete b._lazyCache; R(a), s(b, d.loadedClass), t(b, d.loadingClass), u(b, Y), v(b, "lazyloaded") }, X = A(W), Y = function (a) { X({ target: a.target }) }, Z = function (a, b) { try { a.contentWindow.location.replace(b) } catch (c) { a.src = b } }, $ = function (a) { var b, c = a[i](d.srcsetAttr); (b = d.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c) }, _ = A(function (a, b, c, e, f) { var g, h, j, l, o, p; (o = v(a, "lazybeforeunveil", b)).defaultPrevented || (e && (c ? s(a, d.autosizesClass) : a.setAttribute("sizes", e)), h = a[i](d.srcsetAttr), g = a[i](d.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), o = { target: a }, s(a, d.loadingClass), p && (clearTimeout(m), m = k(R, 2500), u(a, Y, !0)), l && q.call(j.getElementsByTagName("source"), $), h ? a.setAttribute("srcset", h) : g && !l && (L.test(a.nodeName) ? Z(a, g) : a.src = g), f && (h || l) && w(a, { src: g })), a._lazyRace && delete a._lazyRace, t(a, d.lazyClass), z(function () { var b = a.complete && a.naturalWidth > 1; p && !b || (b && s(a, "ls-is-cached"), W(o), a._lazyCache = !0, k(function () { "_lazyCache" in a && delete a._lazyCache }, 9)), "lazy" == a.loading && P-- }, !0) }), aa = function (a) { if (!a._lazyRace) { var b, c = K.test(a.nodeName), e = c && (a[i](d.sizesAttr) || a[i]("sizes")), f = "auto" == e; (!f && l || !c || !a[i]("src") && !a.srcset || a.complete || r(a, d.errorClass) || !r(a, d.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, P++ , _(a, b, f, e, c)) } }, ba = C(function () { d.loadMode = 3, V() }), ca = function () { 3 == d.loadMode && (d.loadMode = 2), ba() }, da = function () { if (!l) { if (f.now() - p < 999) return void k(da, 999); l = !0, d.loadMode = 3, V(), j("scroll", ca, !0) } }; return { _: function () { p = f.now(), c.elements = b.getElementsByClassName(d.lazyClass), g = b.getElementsByClassName(d.lazyClass + " " + d.preloadClass), j("scroll", V, !0), j("resize", V, !0), a.MutationObserver ? new MutationObserver(V).observe(e, { childList: !0, subtree: !0, attributes: !0 }) : (e[h]("DOMNodeInserted", V, !0), e[h]("DOMAttrModified", V, !0), setInterval(V, 999)), j("hashchange", V, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function (a) { b[h](a, V, !0) }), /d$|^c/.test(b.readyState) ? da() : (j("load", da), b[h]("DOMContentLoaded", V), k(da, 2e4)), c.elements.length ? (U(), z._lsFlush()) : V() }, checkElems: V, unveil: aa, _aLSL: ca } }(), E = function () { var a, c = A(function (a, b, c, d) { var e, f, g; if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || "")) for (e = b.getElementsByTagName("source"), f = 0, g = e.length; f < g; f++)e[f].setAttribute("sizes", d); c.detail.dataAttr || w(a, c.detail) }), e = function (a, b, d) { var e, f = a.parentNode; f && (d = y(a, f, d), e = v(a, "lazybeforesizes", { width: d, dataAttr: !!b }), e.defaultPrevented || (d = e.detail.width) && d !== a._lazysizesWidth && c(a, f, e, d)) }, f = function () { var b, c = a.length; if (c) for (b = 0; b < c; b++)e(a[b]) }, g = C(f); return { _: function () { a = b.getElementsByClassName(d.autosizesClass), j("resize", g) }, checkElems: g, updateElem: e } }(), F = function () { F.i || (F.i = !0, E._(), D._()) }; return c = { cfg: d, autoSizer: E, loader: D, init: F, uP: w, aC: s, rC: t, hC: r, fire: v, gW: y, rAF: z } } });
  /*! ls.rias.min.ks - v4.1.8 */
  !function (a, b) { var c = function () { b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0) }; b = b.bind(null, a, a.document), "object" == typeof module && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0) }(window, function (a, b, c) { "use strict"; function d(b, c) { var d, e, f, g, h = a.getComputedStyle(b); e = b.parentNode, g = { isPicture: !(!e || !m.test(e.nodeName || "")) }, f = function (a, c) { var d = b.getAttribute("data-" + a); if (!d) { var e = h.getPropertyValue("--ls-" + a); e && (d = e.trim()) } if (d) { if ("true" == d) d = !0; else if ("false" == d) d = !1; else if (l.test(d)) d = parseFloat(d); else if ("function" == typeof j[a]) d = j[a](b, d); else if (q.test(d)) try { d = JSON.parse(d) } catch (a) { } g[a] = d } else a in j && "function" != typeof j[a] ? g[a] = j[a] : c && "function" == typeof j[a] && (g[a] = j[a](b, d)) }; for (d in j) f(d); return c.replace(p, function (a, b) { b in g || f(b, !0) }), g } function e(a, b) { var c = [], d = function (a, c) { return k[typeof b[c]] ? b[c] : a }; return c.srcset = [], b.absUrl && (s.setAttribute("href", a), a = s.href), a = ((b.prefix || "") + a + (b.postfix || "")).replace(p, d), b.widths.forEach(function (d) { var e = b.widthmap[d] || d, f = b.aspectratio || b.ratio, g = !b.aspectratio && j.traditionalRatio, h = { u: a.replace(n, e).replace(o, f ? g ? Math.round(d * f) : Math.round(d / f) : ""), w: d }; c.push(h), c.srcset.push(h.c = h.u + " " + d + "w") }), c } function f(a, c, d) { var f = 0, g = 0, h = d; if (a) { if ("container" === c.ratio) { for (f = h.scrollWidth, g = h.scrollHeight; !(f && g || h === b);)h = h.parentNode, f = h.scrollWidth, g = h.scrollHeight; f && g && (c.ratio = g / f) } a = e(a, c), a.isPicture = c.isPicture, u && "IMG" == d.nodeName.toUpperCase() ? d.removeAttribute(i.srcsetAttr) : d.setAttribute(i.srcsetAttr, a.srcset.join(", ")), Object.defineProperty(d, "_lazyrias", { value: a, writable: !0 }) } } function g(a, b) { var e = d(a, b); return j.modifyOptions.call(a, { target: a, details: e, detail: e }), c.fire(a, "lazyriasmodifyoptions", e), e } function h(a) { return a.getAttribute(a.getAttribute("data-srcattr") || j.srcAttr) || a.getAttribute(i.srcsetAttr) || a.getAttribute(i.srcAttr) || a.getAttribute("data-pfsrcset") || "" } var i, j, k = { string: 1, number: 1 }, l = /^\-*\+*\d+\.*\d*$/, m = /^picture$/i, n = /\s*\{\s*width\s*\}\s*/i, o = /\s*\{\s*height\s*\}\s*/i, p = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi, q = /^\[.*\]|\{.*\}$/, r = /^(?:auto|\d+(px)?)$/, s = b.createElement("a"), t = b.createElement("img"), u = "srcset" in t && !("sizes" in t), v = !!a.HTMLPictureElement && !u; !function () { var b, d = function () { }, e = { prefix: "", postfix: "", srcAttr: "data-src", absUrl: !1, modifyOptions: d, widthmap: {}, ratio: !1, traditionalRatio: !1, aspectratio: !1 }; i = c && c.cfg || a.lazySizesConfig, i || (i = {}, a.lazySizesConfig = i), i.supportsType || (i.supportsType = function (a) { return !a }), i.rias || (i.rias = {}), "widths" in (j = i.rias) || (j.widths = [], function (a) { for (var b, c = 0; !b || b < 3e3;)c += 5, c > 30 && (c += 1), b = 36 * c, a.push(b) }(j.widths)); for (b in e) b in j || (j[b] = e[b]) }(), addEventListener("lazybeforesizes", function (a) { if (a.detail.instance == c) { var b, d, e, k, l, m, o, p, q, s, t, u, x; if (b = a.target, a.detail.dataAttr && !a.defaultPrevented && !j.disabled && (q = b.getAttribute(i.sizesAttr) || b.getAttribute("sizes")) && r.test(q)) { if (d = h(b), e = g(b, d), t = n.test(e.prefix) || n.test(e.postfix), e.isPicture && (k = b.parentNode)) for (l = k.getElementsByTagName("source"), m = 0, o = l.length; m < o; m++)(t || n.test(p = h(l[m]))) && (f(p, e, l[m]), u = !0); t || n.test(d) ? (f(d, e, b), u = !0) : u && (x = [], x.srcset = [], x.isPicture = !0, Object.defineProperty(b, "_lazyrias", { value: x, writable: !0 })), u && (v ? b.removeAttribute(i.srcAttr) : "auto" != q && (s = { width: parseInt(q, 10) }, w({ target: b, detail: s }))) } } }, !0); var w = function () { var d = function (a, b) { return a.w - b.w }, e = function (a) { var b, c, d = a.length, e = a[d - 1], f = 0; for (f; f < d; f++)if (e = a[f], e.d = e.w / a.w, e.d >= a.d) { !e.cached && (b = a[f - 1]) && b.d > a.d - .13 * Math.pow(a.d, 2.2) && (c = Math.pow(b.d - .6, 1.6), b.cached && (b.d += .15 * c), b.d + (e.d - a.d) * c > a.d && (e = b)); break } return e }, f = function (a, b) { var d; return !a._lazyrias && c.pWS && (d = c.pWS(a.getAttribute(i.srcsetAttr || ""))).length && (Object.defineProperty(a, "_lazyrias", { value: d, writable: !0 }), b && a.parentNode && (d.isPicture = "PICTURE" == a.parentNode.nodeName.toUpperCase())), a._lazyrias }, g = function (b) { var d = a.devicePixelRatio || 1, e = c.getX && c.getX(b); return Math.min(e || d, 2.4, d) }, h = function (b, c) { var h, i, j, k, l, m; if (l = b._lazyrias, l.isPicture && a.matchMedia) for (i = 0, h = b.parentNode.getElementsByTagName("source"), j = h.length; i < j; i++)if (f(h[i]) && !h[i].getAttribute("type") && (!(k = h[i].getAttribute("media")) || (matchMedia(k) || {}).matches)) { l = h[i]._lazyrias; break } return (!l.w || l.w < c) && (l.w = c, l.d = g(b), m = e(l.sort(d))), m }, j = function (d) { if (d.detail.instance == c) { var e, g = d.target; if (!u && (a.respimage || a.picturefill || lazySizesConfig.pf)) return void b.removeEventListener("lazybeforesizes", j); ("_lazyrias" in g || d.detail.dataAttr && f(g, !0)) && (e = h(g, d.detail.width)) && e.u && g._lazyrias.cur != e.u && (g._lazyrias.cur = e.u, e.cached = !0, c.rAF(function () { g.setAttribute(i.srcAttr, e.u), g.setAttribute("src", e.u) })) } }; return v ? j = function () { } : addEventListener("lazybeforesizes", j), j }() });
}

// Fix the confict suggestion search in Debut theme
if (typeof theme !== 'undefined' && theme.hasOwnProperty('settings')) theme.settings.predictiveSearchEnabled = false;
// Override Settings

function getUrlParam(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

let default_page_size = boostPFSThemeConfig.custom.products_per_page
function getPageSize(){
  console.log(getUrlParam('page'),getUrlParam('sort_by_handle'))
  let _currentPage = getUrlParam('page'),
    _sort_by = getUrlParam('sort_by'),
    _pageSize = default_page_size
  // 是否为有置顶的页面
  if (!_currentPage||_currentPage<=1) {
    if (_sort_by) {
      let _sort_by_number = _sort_by.split(',');
      // _pageSize = default_page_size + _sort_by_number.length
    }
  }
  return _pageSize
}

let old_productList = [] // 需要置顶的商品列表


var boostPFSFilterConfig = {
  general: {
    limit: getPageSize(),
    /* Optional */
    loadProductFirst: true,
    // Placeholder  
    showPlaceholderProductList: true,
    placeholderProductPerRow: 4,
    placeholderProductGridItemClass: 'boost-pfs-filter-product-item boost-pfs-filter-product-item-grid boost-pfs-filter-grid-width-4 boost-pfs-filter-grid-width-mb-2',
    enableOTP: true,
    filterTreeMobileStyle: 'style2', // 'style2', 'style3',
    aspect_ratio: boostPFSThemeConfig.custom.aspect_ratio,
    cropImagePossitionEqualHeight: boostPFSThemeConfig.custom.product_img_crop,
    defaultDisplay: boostPFSThemeConfig.custom.product_item_type,
    enableAjaxCart: true,
    ajaxCartStyle: 'slide', // 'slide' or 'popup'
    showAjaxCartOnAdd: true, // Opens the ajax cart after add to cart
    autoCloseMiniCart: false, // Auto close the cart after add to cart > open cart > close cart
    autoCloseMiniCartDuration: 2000,
    selectOptionInProductItem: true, // Append the product's option inside the product item when clicking "select option"
    selectOptionContainer: '.boost-pfs-filter-product-item-image',  // CSS selector to append the product option, if left empty it will append to the product item
  },
  selector: {
    otpButtons: '.boost-pfs-filter-product-item-image'
  }
};

(function() {
var onSale = false,
  soldOut = false,
  priceVaries = false,
  images = [],
  firstVariant = {},
  boostPFSImgDefaultSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  boostPFSRangeWidths = [180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048];

  BoostPFS.inject(this);
  boostPFSFilterConfig.general.separateRefineByFromFilter = jQ('.boost-pfs-filter-tree-h').length > 0 ? true : false;

/************************** CUSTOMIZE DATA BEFORE BUILDING PRODUCT ITEM **************************/
function prepareShopifyData(data) {
  // Displaying price base on the policy of Shopify, have to multiple by 100
  soldOut = !data.available; // Check a product is out of stock
  onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
  priceVaries = data.price_min != data.price_max; // Check a product has many prices
  // Convert images to array
  images = data.images_info;
  // Get First Variant (selected_or_first_available_variant)
  firstVariant = data['variants'][0];
  if (Utils.getParam('variant') !== null && Utils.getParam('variant') != '') {
    var paramVariant = data.variants.filter(function(e) {
      return e.id == Utils.getParam('variant');
    });
    if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
  } else {
    for (var i = 0; i < data['variants'].length; i++) {
      if (data['variants'][i].available) {
        firstVariant = data['variants'][i];
        break;
      }
    }
  }
  return data;
}

/************************** END CUSTOMIZE DATA BEFORE BUILDING PRODUCT ITEM **************************/
/************************** BUILD PRODUCT LIST **************************/
// Build Product Grid Item
ProductGridItem.prototype.compileTemplate = function(data) {
  if (!data) data = this.data;
  // Customize API data to get the Shopify data

  if (needSetToTop()) {
    if (old_productList[this.index]) {
      data = old_productList[this.index]
    }
  }

  data = prepareShopifyData(data);
    
  // Get Template
  var itemHtml = boostPFSTemplate.productGridItemHtml;
  // Add Custom class
  var soldOutClass = soldOut ? boostPFSTemplate.soldOutClass : '';
  var saleClass = onSale ? boostPFSTemplate.saleClass : '';

  itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);
  itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);
  // Add Grid Width class
  itemHtml = itemHtml.replace(/{{gridWidthClass}}/g, buildGridWidthClass(data));
  // Add Label
  itemHtml = itemHtml.replace(/{{itemLabels}}/g, buildLabels(data));
  // Add TAG Label
  itemHtml = itemHtml.replace(/{{itemTagLabels}}/g, buildTagLabels(data, false));
  // Add Images
  itemHtml = itemHtml.replace(/{{itemImages}}/g, buildImages(data));
  // Add Price
  itemHtml = itemHtml.replace(/{{itemPrice}}/g, buildPrice(data));

  // Add Review
  if (typeof Integration === 'undefined' ||
    (typeof Integration != 'undefined' &&
      typeof Integration.hascompileTemplate == 'function' &&
      !Integration.hascompileTemplate('reviews'))) {
    console.log(11111111)
    itemHtml = itemHtml.replace(/{{itemReviews}}/g, buildReview(data));
  }

  // Add Vendor
  itemHtml = itemHtml.replace(/{{itemVendor}}/g, buildVendor(data));

  // itemActiveSwapClass
  itemHtml = itemHtml.replace(/{{itemActiveSwapClass}}/g, buildActiveSwapClass(data));

  // Add Color Swatches
  itemHtml = itemHtml.replace(/{{itemSwatches}}/g, buildProductOptionSwatches(data));

  // Add main attribute (Always put at the end of this function)
  itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
  itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
  itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
  itemHtml = itemHtml.replace(/{{itemVendorLabel}}/g, data.vendor);
  itemHtml = itemHtml.replace(/{{itemUrl}}/g, Utils.buildProductItemUrl(data));
  itemHtml = itemHtml.replace(/{{itemDiscountTag}}/g, addDiscountTag(data));
  return itemHtml;
};
// Build Product List Item
ProductListItem.prototype.compileTemplate = function(data) {
    console.log('ProductListItem',this.data)
  if (!data) data = this.data;
  // Customize API data to get the Shopify data
  data = prepareShopifyData(data);

  // For List View
  // Get Template
  var itemHtml = boostPFSTemplate.productListItemHtml;

  // Add Custom class
  var soldOutClass = soldOut ? boostPFSTemplate.soldOutClass : '';
  var saleClass = onSale ? boostPFSTemplate.saleClass : '';

  itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);
  itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);
  // Add Label
  itemHtml = itemHtml.replace(/{{itemLabels}}/g, buildLabels(data));
  // Add TAG Label
  itemHtml = itemHtml.replace(/{{itemTagLabels}}/g, buildTagLabels(data, false));
  // Add Images
  itemHtml = itemHtml.replace(/{{itemImages}}/g, buildImages(data));

  // Add Review
  if (typeof Integration === 'undefined' ||
    (typeof Integration != 'undefined' &&
      typeof Integration.hascompileTemplate == 'function' &&
      !Integration.hascompileTemplate('reviews'))) {
    itemHtml = itemHtml.replace(/{{itemReviews}}/g, buildReview(data));
  }

  // Add Vendor
  itemHtml = itemHtml.replace(/{{itemVendor}}/g, buildVendor(data));

  // Add Price
  var itemPriceHtml = buildPrice(data, onSale, priceVaries);
  itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

  // Description
  var itemDescription = jQ('<p>' + data.body_html + '</p>').text();
  itemDescription = (itemDescription.split(" ")).length > 35 ? itemDescription.split(" ").splice(0, 35).join(" ") + '...' : itemDescription.split(" ").splice(0, 35).join(" ");
  itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);

  // itemActiveSwapClass
  itemHtml = itemHtml.replace(/{{itemActiveSwapClass}}/g, buildActiveSwapClass(data));

  // Add Color Swatches
  itemHtml = itemHtml.replace(/{{itemSwatches}}/g, buildProductOptionSwatches(data));

  // Add main attribute
  itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
  itemHtml = itemHtml.replace(/{{itemVendorLabel}}/g, data.vendor);
  itemHtml = itemHtml.replace(/{{itemUrl}}/g, Utils.buildProductItemUrl(data));
  itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
  itemHtml = itemHtml.replace(/{{itemDiscountTag}}/g, addDiscountTag(data));

  return itemHtml;
  // End For List View
};

/************************** END BUILD PRODUCT LIST **************************/
/************************** BUILD PRODUCT ITEM ELEMENTS **************************/
function buildGridWidthClass() {
  var gridWidthClass = '';
  // On PC
  switch (boostPFSThemeConfig.custom.products_per_row) {
    case 2:
      gridWidthClass = 'boost-pfs-filter-grid-width-2';
      break;
    case 3:
      gridWidthClass = 'boost-pfs-filter-grid-width-3';
      break;
    case 5:
      gridWidthClass = 'boost-pfs-filter-grid-width-5';
      break;
    case 6:
      gridWidthClass = 'boost-pfs-filter-grid-width-6';
      break;
    default:
      gridWidthClass = 'boost-pfs-filter-grid-width-4';
      break;
  }
  // On Mobile
  switch (boostPFSThemeConfig.custom.products_per_row_m) {
    case 1:
      gridWidthClass += ' boost-pfs-filter-grid-width-mb-1';
      break;
    case 3:
      gridWidthClass += ' boost-pfs-filter-grid-width-mb-3';
      break;
    default:
      gridWidthClass += ' boost-pfs-filter-grid-width-mb-2';
      break;
  }
  return gridWidthClass;
}
  
function addDiscountTag (data) {
  let discount = ((data.compare_at_price_max - data.price_max) / data.compare_at_price_max) * 100
  discount = Math.floor(discount)
  let html = `<div class="discount-tag discount_${discount}">-${discount}%</div>`
  return html
}

function buildImages(data) {
  var html = '',
    aspectRatio = '',
    rangeWidths = boostPFSRangeWidths,
    paddingTop = 100;

  var dataSrcSet = '',
    dataWidths = '',
    dataSizes = 'auto',
    imgAlt = data.title,
    flipImageSrcSet = '';

  var activeSwapImage = !Utils.isMobile() && images.length > 1 &&
    boostPFSThemeConfig.custom.hasOwnProperty('active_image_swap') &&
    boostPFSThemeConfig.custom.active_image_swap == true;

  for (var i = 0; i < rangeWidths.length; i++) {
    dataSrcSet += Utils.getFeaturedImage(images, rangeWidths[i] + 'x') + ' ' + rangeWidths[i] + 'w';
    dataWidths += rangeWidths[i];

    if (activeSwapImage) {
      flipImageSrcSet += Utils.optimizeImage(images[1]['src'], rangeWidths[i] + 'x') + ' ' + rangeWidths[i] + 'w';
    }

    if (i < rangeWidths.length - 1) {
      dataSrcSet += ', ';
      dataWidths += ', ';

      if (activeSwapImage) {
        flipImageSrcSet += ', ';
      }
    }
  }

  if (images.length > 0) {
    aspectRatio = images[0]['width'] / images[0]['height'];
    paddingTop = 1 / aspectRatio * 100;
  }

  html += '<a href="{{itemUrl}}" class="boost-pfs-filter-product-item-image-link" ';
  html += 'style="padding-top: 127.7777778%;">';
  html += '<img class="boost-pfs-filter-product-item-main-image lazyload Image--lazyLoad"' +
    'data-srcset="' + dataSrcSet + '" ' +
    'data-src="' + Utils.getFeaturedImage(images, rangeWidths[2] + 'x') + '" ' +
    'data-widths="[' + dataWidths + ']" ' +
    'data-sizes="' + dataSizes + '" ' +
    'src="' + boostPFSImgDefaultSrc + '" ' +
    'alt="' + imgAlt + '" ';

  if (activeSwapImage) {
    html += 'data-img-flip-src="' + Utils.optimizeImage(images[1]['src'], rangeWidths[2] + 'x') + '" ' +
      'data-img-flip-srcset="' + flipImageSrcSet + '" ';
  }
  html += '/></a>';

  return html;
}

function buildVendor(data) {
  var html = '';
  if (boostPFSThemeConfig.custom.hasOwnProperty('show_vendor') &&
    boostPFSThemeConfig.custom.show_vendor == true) {
    html = boostPFSTemplate.vendorHtml;
  }
  return html;
}

function buildPrice(data) {
  var html = '';
  if (boostPFSThemeConfig.custom.hasOwnProperty('show_price') &&
    boostPFSThemeConfig.custom.show_price) {
    html = '<p class="boost-pfs-filter-product-item-price">';
    if (onSale) {

      html += '<span class="boost-pfs-filter-product-item-sale-price">' + Utils.formatMoney(data.price_min) + '</span>';
      html += '<s>' + Utils.formatMoney(data.compare_at_price_min) + '</s> ';
    } else {
      if (priceVaries) {
        html += '<span class="boost-pfs-filter-product-item-price-from-text">' + (boostPFSThemeConfig.label_basic.from) + ' ' + '</span>';
      }
      html += '<span class="boost-pfs-filter-product-item-regular-price">' + Utils.formatMoney(data.price_min) + '</span>';
    }
    html += '</p>';
  }
  return html;
}

function buildLabels(data) {
  // Build Sold out label
  var soldOutLabel = '';
  if (boostPFSThemeConfig.custom.hasOwnProperty('sold_out_enable') &&
    boostPFSThemeConfig.custom.sold_out_enable && soldOut) {
    soldOutLabel = boostPFSTemplate.soldOutLabelHtml.replace(/{{style}}/g, '');
  }
  console.log(boostPFSTemplate.saleLabelHtml);
  // Build Sale label
  var saleLabel = '';
  var salePercent = '';
  if (boostPFSThemeConfig.custom.sale_label_enable && onSale && !soldOut) {
    if (boostPFSThemeConfig.custom.sale_label_display == 'sale_percent'){
      salePercent = Math.round((data.compare_at_price_min - data.price_min) * 100 / data.compare_at_price_max);
    }
    saleLabel = boostPFSTemplate.saleLabelHtml.replace(/{{style}}/g, '');
    saleLabel = boostPFSTemplate.saleLabelHtml.replace(/{{percent}}/g, salePercent + '%');
  }
  // Build Labels
  return soldOutLabel + saleLabel;
}

// BUILD LABEL PRODUCT WITH TAGS
function buildTagLabels(data, showall) {
  if (boostPFSThemeConfig.custom.tag_label_enable) {
    if (showall) {
      var tagLabel = '';
      if (data.tags) {
        for (var i = 0; i < data.tags.length; i++) {
          var tag = data.tags[i];
          if (tag.indexOf("pfs:label") !== -1) {
            var preTagLabel = boostPFSTemplate.tagLabelHtml.replace(/{{labelTag}}/g, tag.split('pfs:label-')[1]);
            tagLabel += preTagLabel;
          }
        }
      }
    } else {
      var tagLabel = '';
      if (data.tags) {
        for (var i = data.tags.length - 1; i >= 0; i--) {
          tag = data.tags[i];
          if (tag.indexOf("pfs:label") !== -1) {
            var preTagLabel = boostPFSTemplate.tagLabelHtml.replace(/{{labelTag}}/g, tag.split('pfs:label-')[1]);
            tagLabel += preTagLabel;
            break;
          }
        }
      }
    }
    // console.log(tagLabel)
    return tagLabel;
  } else {
    return "";
  }
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
// Build Color Swatches
function buildProductOptionSwatches(data) {
  if (boostPFSThemeConfig.custom.swatch_enable) {
    var swatchApplyFor = ['color', 'img', 'pro_img', 'text'];
    var swatchesProductOptionHtml = '';
    for(var i = 0; i < swatchApplyFor.length; i++){
      var optionNames = boostPFSThemeConfig.custom["swatch_by_" + swatchApplyFor[i] + "_apply"].split(',').filter(onlyUnique);
      var swatchShape = boostPFSThemeConfig.custom["swatch_by_" + swatchApplyFor[i] + "_shape"];
      var swatchType = swatchApplyFor[i];
      for(var j=0; j < optionNames.length; j++){
        var optionName = optionNames[j].trim();
        var filterSwatchTitle = optionName,
        swatchArr = [],
        countSwatch = 0,
        swatchValues = [],
        swatchLimit = 4;
    
        var dataImgSize = '360',
          bgSize = '50x',
          dataImgSrc = Utils.getFeaturedImage(data.images_info, dataImgSize + 'x'),
          swatchName = '#ffffff',
          bgImageSrc = '',
          viewMoreLabel = 'More ' + filterSwatchTitle;

        if (typeof data.options_with_values != 'undefined' && data.options_with_values.length > 0) {
          swatchArr = data.options_with_values.filter(function(option) {
            return option.name == optionName;
          });
          if (swatchArr.length > 0) {
            countSwatch = swatchArr[0].values.length;

            if (swatchLimit > countSwatch) {
              swatchLimit = countSwatch;
            }
            swatchValues = swatchArr[0].values;

            swatchesProductOptionHtml += '<ul class="boost-pfs-filter-item-swatch boost-pfs-filter-item-swatch-option' + optionName + ' boost-pfs-filter-item-swatch-shape-' + swatchShape + ' boost-pfs-filter-item-swatch-type-' + swatchType + '">';

            for (var sIndex = 0; sIndex < swatchLimit; sIndex++) {
              swatchName = swatchValues[sIndex].title;
              swatchVariant = data['variants'][sIndex];
              sImageIndex = swatchValues[sIndex].image || '';
              if (sImageIndex != '') {
                dataImgSrc = Utils.optimizeImage(data.images[sImageIndex], dataImgSize + 'x') + ' ' + dataImgSize + 'w';
              }
              
              if (swatchType) {
                switch (swatchType) {
                  case 'img':
                    bgImageSrc = boostPFSAppConfig.general.file_url.replace(/\?/, Utils.slugify(filterSwatchTitle).replace(/\-/g, '_') + '-' + Utils.slugify(swatchName) + '.png?v=');
                    break;
                  case 'pro_img':
                    bgImageSrc = Utils.getFeaturedImage(data.images_info, bgSize);
                    if (sImageIndex != '') {
                      bgImageSrc = Utils.optimizeImage(data.images[sImageIndex], bgSize);
                    }
                    break;
                  default:
                    bgImageSrc = '';
                }
              }
              swatchesProductOptionHtml += '<li>';
                if(swatchType == 'text'){
                  swatchesProductOptionHtml += '<a title="' + swatchName + '" href="' + Utils.buildProductItemUrl(data) + '?variant=' + swatchVariant.id + '">' + swatchName + '</a>';
                } else {
                  if(boostPFSThemeConfig.custom.show_swatch_tooltip){
                    swatchesProductOptionHtml += '<div class="boost-pfs-product-item-tooltip">' + swatchName + '</div>';
                  }
                  swatchesProductOptionHtml += '<span tabindex="0" aria-label="' + swatchName + '" ' +
                      'style="background-color: ' + swatchName + '; ';
                  if (bgImageSrc != '') {
                      swatchesProductOptionHtml += 'background-image: url(' + bgImageSrc + ');" ';
                  } else {
                      swatchesProductOptionHtml += '" ';
                  }
                  if (dataImgSrc != '') {
                      swatchesProductOptionHtml += 'data-img="' + dataImgSrc + '" ';
                  }

                  swatchesProductOptionHtml += '></span>';
                }
              swatchesProductOptionHtml += '</li>';
            }

            if (countSwatch > swatchLimit) {
              swatchesProductOptionHtml += '<li class="boost-pfs-filter-item-swatch-more">';
              swatchesProductOptionHtml += '<a href="{{itemUrl}}" title="' + viewMoreLabel + '">+' + (countSwatch - swatchLimit) + '</a>';
              swatchesProductOptionHtml += '</li>';
            }

            swatchesProductOptionHtml += '</ul>';
          }
        }
      }
      
    }
    return swatchesProductOptionHtml;
  }
}

// Build Color Swatches
function eventColorSwatches(event) {
  jQ('.boost-pfs-filter-item-swatch li span').each(function() {
    var img = jQ(this).parents('.boost-pfs-filter-product-item-inner').find('.boost-pfs-filter-product-item-main-image');
    if (event == 'hover') {
      jQ(this).hover(function() {
        var newImage = jQ(this).data('img');
        img.attr('srcset', newImage);
      });
    }
    if (event == 'click') {
      jQ(this).click(function() {
        var newImage = jQ(this).data('img');
        img.attr('srcset', newImage);
      });
    }
    jQ(this).focus(function() {
      if (jQ('body').hasClass('boost-pfs-ada')) {
        var newImage = jQ(this).data('img');
        img.attr('srcset', newImage);
      }
    });
  });
}

function buildReview(data) {
  console.log(data);
  var html = '';
  if (boostPFSThemeConfig.custom.hasOwnProperty('show_product_review') &&
    boostPFSThemeConfig.custom.show_product_review == true) {
    html = '<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>';
  }
  return html;
}

function buildActiveSwapClass(data) {
  if (!Utils.isMobile() && images.length > 1 &&
    boostPFSThemeConfig.custom.hasOwnProperty('active_image_swap') &&
    boostPFSThemeConfig.custom.active_image_swap == true) {
    return 'has-bc-swap-image';
  }
  return '';
}

/************************** END BUILD PRODUCT ITEM ELEMENTS **************************/
/************************** BUILD TOOLBAR **************************/
// Build Pagination
ProductPaginationDefault.prototype.compileTemplate = function(totalProduct) {
  console.log('ProductPaginationDefault compileTemplate');
  if (!totalProduct) totalProduct = this.totalProduct;
  // Get page info
  var currentPage = parseInt(Globals.queryParams.page);
  var totalPage = Math.ceil(totalProduct / Globals.queryParams.limit);
  // If it has only one page, clear Pagination
  if (totalPage <= 1) {
    return '';
  }

  var paginationHtml = boostPFSTemplate.paginateHtml;
  // Build Previous
  var previousHtml = (currentPage > 1) ? boostPFSTemplate.previousActiveHtml : boostPFSTemplate.previousDisabledHtml;
  previousHtml = previousHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage - 1));
  paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);
  // Build Next
  var nextHtml = (currentPage < totalPage) ? boostPFSTemplate.nextActiveHtml : boostPFSTemplate.nextDisabledHtml;
  nextHtml = nextHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage + 1));
  paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);
  // Create page items array
  var beforeCurrentPageArr = [];
  for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
    beforeCurrentPageArr.unshift(iBefore);
  }
  if (currentPage - 4 > 0) {
    beforeCurrentPageArr.unshift('...');
  }
  if (currentPage - 4 >= 0) {
    beforeCurrentPageArr.unshift(1);
  }
  beforeCurrentPageArr.push(currentPage);
  var afterCurrentPageArr = [];
  for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
    afterCurrentPageArr.push(iAfter);
  }
  if (currentPage + 3 < totalPage) {
    afterCurrentPageArr.push('...');
  }
  if (currentPage + 3 <= totalPage) {
    afterCurrentPageArr.push(totalPage);
  }
  // Build page items
  var pageItemsHtml = '';
  var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
  for (var iPage = 0; iPage < pageArr.length; iPage++) {
    if (pageArr[iPage] == '...') {
      pageItemsHtml += boostPFSTemplate.pageItemRemainHtml;
    } else {
      pageItemsHtml += (pageArr[iPage] == currentPage) ? boostPFSTemplate.pageItemSelectedHtml : boostPFSTemplate.pageItemHtml;
    }
    pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
    pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, pageArr[iPage]));
  }
  paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);
  return paginationHtml;
};

// Build Sorting
ProductSorting.prototype.compileTemplate = function() {
  console.log('ProductSorting compileTemplate');
  var html = '';
  if (boostPFSThemeConfig.custom.show_sort_by && boostPFSTemplate.hasOwnProperty('sortingHtml')) {
    var sortingArr = Utils.getSortingList();
    if (sortingArr) {
      var paramSort = Globals.queryParams.sort || '';
      // Build content
      var sortingItemsHtml = '';
      for (var k in sortingArr) {
        activeClass = '';
        if (paramSort == k) {
          activeClass = 'boost-pfs-filter-sort-item-active';
        }
        sortingItemsHtml += '<li><a href="#" data-sort="' + k + '" class="' + activeClass + '">' + sortingArr[k] + '</a></li>';
      }
      html = boostPFSTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
    }
  }
  return html;
};

ProductSorting.prototype.render = function() {
  console.log('ProductSorting render');
  jQ(Selector.topSorting).html(this.compileTemplate());

  if (jQ('.boost-pfs-filter-custom-sorting').hasClass('boost-pfs-filter-sort-active')) {
    jQ('.boost-pfs-filter-custom-sorting').toggleClass('boost-pfs-filter-sort-active');
  }

  var labelSort = '';
  var paramSort = Globals.queryParams.sort || '';
  var sortingList = Utils.getSortingList();
  if (paramSort.length > 0 && sortingList && sortingList[paramSort]) {
    labelSort = sortingList[paramSort];
  } else {
    labelSort = Labels.sorting_heading;
  }

  jQ('.boost-pfs-filter-custom-sorting button span span').text(labelSort);
}

// Build Sorting event
ProductSorting.prototype.bindEvents = function() {
  console.log('ProductSorting bindEvents');
  var _this = this;
  jQ('.boost-pfs-filter-filter-dropdown a').click(function(e) {
    e.preventDefault();
    FilterApi.setParam('sort', jQ(this).data('sort'));
    FilterApi.setParam('page', 1);
    FilterApi.applyFilter('sort');
  });

  jQ(".boost-pfs-filter-custom-sorting > button").click(function() {
      jQ('.boost-pfs-filter-filter-dropdown').toggle().parent().toggleClass('boost-pfs-filter-sort-active');
  });

  jQ(Selector.filterTreeMobileButton).click(function() {
    jQ('.boost-pfs-filter-top-sorting-mobile .boost-pfs-filter-filter-dropdown').hide();
  });

  jQ(document).on('click', function (e) {
    if (jQ(e.target).parents('.boost-pfs-filter-top-sorting').find(".boost-pfs-filter-filter-dropdown").length === 0) {
      jQ('.boost-pfs-filter-filter-dropdown').hide().parent().removeClass('boost-pfs-filter-sort-active');
    }
  });
};
// For Toolbar - Build Display type
ProductDisplayType.prototype.compileTemplate = function() {
  console.log('ProductDisplayType compileTemplate');
  
  var itemHtml = '<span>' + boostPFSThemeConfig.label.toolbar_viewas + '</span>';
  if (boostPFSThemeConfig.custom.product_item_type == 'grid') {
    if (boostPFSThemeConfig.custom.view_as_type == 'view_as_type_list_grid_multi_col' && !Utils.isMobile()) {
        itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-list" data-view="list"><span class="icon-fallback-text"></span></a>';
        itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-2" data-view="grid-2"><span class="icon-fallback-text"></span></a>';
        itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-3" data-view="grid-3"><span class="icon-fallback-text"></span></a>';
        itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-4" data-view="grid-4"><span class="icon-fallback-text"></span></a>';
        itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-5" data-view="grid-5"><span class="icon-fallback-text"></span></a>';
        itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-6" data-view="grid-6"><span class="icon-fallback-text"></span></a>';
    } else {
        itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid" data-view="grid"><span class="icon-fallback-text"></span></a>';
        itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-list" data-view="list"><span class="icon-fallback-text"></span></a>';
    }
  } else {
    if (boostPFSThemeConfig.custom.view_as_type == 'view_as_type_list_grid_multi_col' && !Utils.isMobile()) {
      itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-list" data-view="list"><span class="icon-fallback-text"></span></a>';
      itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-2" data-view="grid-2"><span class="icon-fallback-text"></span></a>';
      itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-3" data-view="grid-3"><span class="icon-fallback-text"></span></a>';
      itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-4" data-view="grid-4"><span class="icon-fallback-text"></span></a>';
      itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-5" data-view="grid-5"><span class="icon-fallback-text"></span></a>';
      itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid {{class.productDisplayType}}-grid-6" data-view="grid-6"><span class="icon-fallback-text"></span></a>';
    } else {
      itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-list" data-view="list"><span class="icon-fallback-text"></span></a>';
      itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid" data-view="grid"><span class="icon-fallback-text"></span></a>';
    }
  }

  itemHtml = itemHtml.replace(/{{class.productDisplayType}}/g, Class.productDisplayType);

  return itemHtml;
};

var originalRenderProductDisplayType = ProductDisplayType.prototype.render;
ProductDisplayType.prototype.render = function() {
  console.log('ProductDisplayType render');
  
  
  // Call the original function in our app lib.
  // We don't have to copy a very big function out here to modify.
  // function.call(this, param1, param2) binds the "this" pointer and params to the original function.
  originalRenderProductDisplayType.call(this);

  // Do your custom code after the original function has run
  // Active current display type
  if (this.$element.length) {
    this.$element.find(this.selector.productDisplayTypeList).removeClass('active');
    this.$element.find(this.selector.productDisplayTypeGrid).removeClass('active');
    if (Globals.queryParams.display == 'list') {
      this.$element.find(this.selector.productDisplayTypeList).addClass('active');
    } else if (Globals.queryParams.display == 'grid') {
      if (boostPFSThemeConfig.custom.view_as_type == 'view_as_type_list_grid_multi_col' && !Utils.isMobile()) {
        var curentGridColumn = boostPFSThemeConfig.custom.products_per_row;
        this.$element.find(this.selector.productDisplayTypeGrid).each(function(){
        var $parent = jQ(this).parent();
        var $cssNames = jQ('.boost-pfs-filter-top-display-type').attr('class').split(' ');
        var $activeClass = $cssNames[$cssNames.length - 1];
        var indexCurrentColumn = $activeClass.split('-')[$activeClass.split('-').length - 1];
        
        if($parent.hasClass('boost-pfs-filter-view-as-click') && jQ(this).data('view') == $activeClass){
            jQ(this).addClass('active');

            // jQ('.boost-pfs-filter-product-item').removeClass(function(index, css) {
            // return (css.match (/(^|\s)boost-pfs-filter-grid-width-\S+/g) || []).join(' ');
            // }).addClass('boost-pfs-filter-grid-width-' + indexCurrentColumn);

            var arrClss = jQ('.boost-pfs-filter-product-item').attr('class').split(' ');
            var gridIndex = arrClss.findIndex((ele) => ele.match (/(^|\s)boost-pfs-filter-grid-width-\S+/g));
            jQ('.boost-pfs-filter-product-item').removeClass(arrClss[gridIndex]);
            jQ('.boost-pfs-filter-product-item').addClass('boost-pfs-filter-grid-width-' + indexCurrentColumn);

            // jQ('.boost-pfs-filter-product-item').className = jQ('.boost-pfs-filter-product-item').className.replace(/(^|\s)boost-pfs-filter-grid-width-\S+/g , '');
            // jQ('.boost-pfs-filter-product-item').addClass('boost-pfs-filter-grid-width-' + indexCurrentColumn);

        } else if(!$parent.hasClass('boost-pfs-filter-view-as-click') && jQ(this).data('view').split('-')[1] == curentGridColumn) {    
            jQ(this).addClass('active');
        }
      });

      } else {
        this.$element.find(this.selector.productDisplayTypeGrid).addClass('active');
      }
    }
  }
};

// Build Show Limit
ProductLimit.prototype.compileTemplate = function() {
  console.log('ProductLimit compileTemplate');
  
  var html = '';
  if (boostPFSThemeConfig.custom.show_limit && boostPFSTemplate.hasOwnProperty('showLimitHtml')) {

    var numberList = Settings.getSettingValue('general.showLimitList');
    if (numberList != '') {
      // Build content
      var showLimitItemsHtml = '';
      var arr = numberList.split(',');
      for (var k in sortingArr) {
        showLimitItemsHtml += '<option value="' + arr[k].trim() + '">' + arr[k].trim() + '</option>';
      }
      html = boostPFSTemplate.showLimitHtml.replace(/{{showLimitItems}}/g, showLimitItemsHtml);
    }
  }
  return html;
};
// Build Breadcrumb
Breadcrumb.prototype.compileTemplate = function(colData) {
  console.log('Breadcrumb compileTemplate');
  if (!colData) colData = this.collectionData;
  var breadcrumbItemsHtml = '';
  if (boostPFSTemplate.hasOwnProperty('breadcrumbHtml')) {
    if (typeof colData !== 'undefined' && colData.hasOwnProperty('collection')) {
      var colInfo = colData.collection;
      if (typeof this.collectionTags !== 'undefined' && this.collectionTags !== null) {
        breadcrumbItemsHtml += boostPFSTemplate.breadcrumbItemLink.replace(/{{itemLink}}/g, '/collections/' + colInfo.handle).replace(/{{itemTitle}}/g, colInfo.title);
        breadcrumbItemsHtml += " {{breadcrumbDivider}} ";
        breadcrumbItemsHtml += boostPFSTemplate.breadcrumbItemSelected.replace(/{{itemTitle}}/g, this.collectionTags[0]);
      } else {
        breadcrumbItemsHtml += boostPFSTemplate.breadcrumbItemSelected.replace(/{{itemTitle}}/g, colInfo.title);
      }
    } else {
      breadcrumbItemsHtml += boostPFSTemplate.breadcrumbItemSelected.replace(/{{itemTitle}}/g, Settings.getSettingValue('label.defaultCollectionHeader'));
    }
  }
  return breadcrumbItemsHtml
};

/************************** END BUILD TOOLBAR **************************/

// Add additional feature for product list, used commonly in customizing product list
ProductList.prototype.afterRender = function(data) {
  console.log('ProductList afterRender')
  Globals.queryParams.limit = default_page_size
  // collections页加载完第一次后，还原pagesize为自定义时的大小
  if (!data) data = this.data;

  // Intergrate Review Shopify
  if (window.SPR &&
    typeof window.SPR.initDomEls == 'function' &&
    typeof window.SPR.loadBadges == 'function' &&
    boostPFSThemeConfig.custom.show_product_review) {
    window.SPR.initDomEls();
    window.SPR.loadBadges();
  }

};

// Build additional elements
Filter.prototype.afterRender = function(data) {
  console.log('Filter afterRender')
  Globals.queryParams.limit = default_page_size
  
  if (!data) data = this.data;

  var totalProduct = data.total_product + '<span> ' + boostPFSThemeConfig.label.items_with_count_other + '</span>';
  if (data.total_product == 1) {
    totalProduct = data.total_product + '<span> ' + boostPFSThemeConfig.label.items_with_count_one + '</span>';
  }
  if (data.total_product == 0) {
    jQ(".boost-pfs-filter-default-toolbar-inner").addClass('boost-pfs-filter-toolbar-product-0');
  }
  jQ('.boost-pfs-filter-total-product').html(totalProduct);

  jQ('body').find('.boost-pfs-filter-skeleton-button').remove();

  // Prevent double tap on iOS
  var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isiOS) {
    Utils.isMobile() && jQ(".boost-pfs-filter-product-item").find("a").on("touchstart", function() {
      isScrolling = !1
    }).on("touchmove", function() {
      isScrolling = !0
    }).on("touchend", function() {
      isScrolling || (window.location = jQ(this).attr("href"))
    });
  }

  // Build Image Swap. Put this function here to impprove the pagespeed.
  swapImage(data);

  // Build Equal Height
  if (Globals.queryParams.display !== 'list') {
    equalHeight(data);
  };

  jQ(window).resize(function() {
    if (Globals.queryParams.display !== 'list') {
      equalHeight(data);
    }
  });

  // Build Event Color Swatch
  if (boostPFSThemeConfig.custom.swatch_change_img != 'none') {
    eventColorSwatches(boostPFSThemeConfig.custom.swatch_change_img);
  }

  if (typeof boostRemoveImageLoadingAnimation == 'function') {
    boostRemoveImageLoadingAnimation(jQ(Selector.products).find('[data-boost-image-loading-animation]'));
  }

  // Filter Sticky 
  if (boostPFSThemeConfig.custom.hasOwnProperty('enable_filter_sticky_d') && boostPFSThemeConfig.custom.enable_filter_sticky_d && !Utils.isMobile()) {
    if(jQ('.boost-pfs-filter-left-col-inner').length > 0){
      var stickyElemet = '.boost-pfs-filter-left-col-inner';
      var stickyElementParent = '.boost-pfs-filter-left-col';
      var startElement = '.boost-pfs-filter-products';
      jQ(stickyElemet).stickTo(startElement,stickyElementParent);
    }
  }

  // Init Sticky Mobile */
  stickyFilterMobile();
  var _times = 0
  var last_url = sessionStorage.getItem('page_url'),isReload = false
  sessionStorage.setItem('page_url',window.location.href)
  if(last_url==window.location.href){
  	isReload = true
  }
  console.log('是否刷新',isReload)
  document.addEventListener('scroll', function() {
    if(!isReload){
      //   处理切换菜单后，页面滚动位置不正常问题
      if(window.location.href.split('?').length<=1&&_times<=1){
        $(window).scrollTop(0)
        _times++
      }
    }
	  stickyFilterMobile();
  });

  // Init Sticky Horizontal
  stickyFilterHorizontal();
  document.addEventListener('scroll', function() {
  stickyFilterHorizontal();
  });

  // Layout Fullwidth Page
  if (boostPFSThemeConfig.custom.hasOwnProperty('layout_type') && boostPFSThemeConfig.custom.layout_type == 'fullwidth' && !Utils.isMobile()) {
    jQ('body').addClass('boost-pfs-filter-fullwidth-page');
  }
    
    setCustomHandle()
};

// Filter Sticky
jQ.fn.stickTo = function(startElement, stickyElementParent) {
  /* constants */    
  var showingHeader = false;
  var headerHeight = 0; /* change the header height here */
  var headerSelector = '';  
  var $window = jQ(window);  
  var $startElement = jQ(startElement);               
  var _this = this;          

  /* variables */
  var lastScrollTop = window.pageYOffset || document.body.scrollTop;  

  /* sticky method */
  var setPosition = function() {
  /* declarations */
  var width = jQ(stickyElementParent).outerWidth();
  var $windowHeight = $window.height();
  var $contentHeight = $startElement.outerHeight(true);     
  var $contentTop = $startElement.offset().top;      

  var sidebarHeight = _this.outerHeight();
  var sidebarTop = _this.offset().top;
  var sidebarBottom = sidebarTop + sidebarHeight;

  var scrollTop = window.pageYOffset || document.body.scrollTop;                        
  var scrollBottom = scrollTop + $windowHeight;  
  var isScrollingDown = (scrollTop > lastScrollTop);

  var endPos = $contentTop + $contentHeight;
  
  /* Match Header Height Sticky */
  if(jQ('.site-header-wrapper .action-area').length > 0){
  /* For the Boundless theme */
    headerSelector = '.site-header-wrapper .action-area';
    } else if (jQ('.site-header .nav-bar').length > 0) {
  /* For the Venture theme */
    headerSelector = '.site-header .nav-bar';
  } else if (jQ('.site-header--fixed').length > 0) {
    headerSelector = '.site-header--fixed';
  } else if (jQ('.header-wrapper--fixed').length > 0) {
    headerSelector = '.header-wrapper--fixed';
  }

  if(headerSelector != ''){
  headerHeight = jQ(headerSelector).outerHeight();
  }

  document.addEventListener('scroll', function() {
    showingHeader = false;
    /* For the Boundless, Venture theme */
    if(jQ('.js-sticky-action-bar').length > 0 || jQ('.site-header .sticky--open').length > 0 || jQ('.site-header--fixed' || jQ('.header-wrapper--fixed'))){
      showingHeader = true;
    }
  });
  /* End Match Header Height Sticky */

  if (sidebarHeight > $contentHeight) {
    _this.removeClass('boost-pfs-filter-stick');
    jQ('body').removeClass('boost-pfs-filter-stick-vertical-body');           
    _this.css({
    position: 'initial'
    });
    return;
  }

  if (scrollTop <= $contentTop) { /* Initial Position */
    _this.removeClass('boost-pfs-filter-stick');
    jQ('body').removeClass('boost-pfs-filter-stick-vertical-body');          
    _this.css({
    position: 'initial',
    width: '100%'
    });
    return;
  }      

  if ((scrollBottom >= endPos)) { /* End Position  */          
    var absolutePos = endPos - sidebarHeight - $contentTop;
    if (absolutePos > 0) {
    _this.removeClass('boost-pfs-filter-stick');
    jQ('body').removeClass('boost-pfs-filter-stick-vertical-body');            
    _this.css({
      position: 'absolute',
      top: absolutePos,
      bottom: 'unset',
      width: width
    });
    } 
    return;
  }
  /* when scrolling down */  
  if (isScrollingDown) {          
    if (scrollBottom < sidebarBottom) { /* Until reach the sidebar bottom  */
    if (_this.css('position') !== 'relative') {
      _this.removeClass('boost-pfs-filter-stick');
      jQ('body').removeClass('boost-pfs-filter-stick-vertical-body');          
      _this.css({
      position: 'relative',
      top: sidebarTop - $contentTop,
      bottom: 'unset',
      width: '100%'
      });          
    }
    } else if (scrollBottom >= sidebarBottom && scrollTop > $contentTop) { /* Sticky sidebar */                
    _this.addClass('boost-pfs-filter-stick');
    jQ('body').addClass('boost-pfs-filter-stick-vertical-body');                        

    _this.css({
      position: 'fixed',
      top: showingHeader ? (headerHeight + 'px') : '20px',
      bottom: $windowHeight > (sidebarHeight + headerHeight) ? 'unset' : 0,
      width: width,
      left: 'auto'
    });
    }
  } else { /* when scrolling up */     
    if ((scrollTop - headerHeight) > sidebarTop) {  /* Until reach the sidebar top  */   
    if (_this.css('position') !== 'relative') {
      _this.removeClass('boost-pfs-filter-stick');
      jQ('body').removeClass('boost-pfs-filter-stick-vertical-body');           
      _this.css({
      position: 'relative',
      top: sidebarTop - $contentTop,
      bottom: 'unset',
      width: '100%'
      });          
    }
    } else if (scrollTop <= (endPos - sidebarHeight)) { /* Sticky sidebar */
    _this.addClass('boost-pfs-filter-stick');
    jQ('body').addClass('boost-pfs-filter-stick-vertical-body');                        

    _this.css({
      position: 'fixed',
      top:  showingHeader ? (headerHeight + 'px') : '20px',
      bottom: 'unset',
      width: width,
      left: 'auto'
    });
    }
  }
  /* End when scrolling down */ 
  /* save last scroll position */
  lastScrollTop = window.pageYOffset || document.body.scrollTop;
  };

  /* on window resize */
  jQ(window).resize(function() {        
  setPosition();
  });

  /* on scroll */
  document.addEventListener('scroll', function() {
    setPosition();
  });
    setPosition();
  
  jQ(document).on('click', '.boost-pfs-filter-button.boost-pfs-filter-option-title-heading', function() {
    setTimeout(setPosition, 400);
  });
};
/* End filter sticky */

var original_onClickEventProductDisplayType = ProductDisplayType.prototype._onClickEvent;
ProductDisplayType.prototype._onClickEvent = function(event) {
  console.log('ProductDisplayType _onClickEvent');
  // Call the original function in our app lib.
  // We don't have to copy a very big function out here to modify.
  // function.call(this, param1, param2) binds the "this" pointer and params to the original function.
  original_onClickEventProductDisplayType.call(this, event);

  // Do your custom code after the original function has run
  /*  View As Type 2/3/4/5/6 */
  
  if (boostPFSThemeConfig.custom.view_as_type == 'view_as_type_list_grid_multi_col' && !Utils.isMobile()) {
    jQ('.boost-pfs-filter-top-display-type').addClass('boost-pfs-filter-view-as-click');
        var currentClass = jQ(event.target).data('view');
        jQ('.boost-pfs-filter-top-display-type')[0].className = jQ('.boost-pfs-filter-top-display-type')[0].className.replace(/(^|\s)grid-\S+/g , '');
        jQ('.boost-pfs-filter-top-display-type').addClass(currentClass);
  }
}

ProductListPlaceholder.prototype.render = function() {
  console.log('ProductListPlaceholder render')
  
  
  if (this.parent.data&&needSetToTop()) {
    let top_productList = []// 原商品列表
    let url_sort = getUrlParam('sort_by').split(',')
    let sort_by_handle = url_sort[0].includes('-') ? true : false

    for (let i = 0; i < this.parent.data.products.length; i++) {
      const item = this.parent.data.products[i];
      let idx = -1
      if (sort_by_handle) {
        console.log('all product 商品置顶');
        idx = url_sort.findIndex( sItem => sItem == item.handle )
      } else {
        console.log('spu商品置顶');
        idx = url_sort.findIndex( sItem => item.handle.includes(sItem) )
      }
      // 分别找出置顶商品与普通商品列表
      if (idx>=0) { 
        top_productList.push(item)
      }else {
        old_productList.push(item)
      }
    }
    console.log(top_productList);
    old_productList = top_productList.concat(old_productList)
    console.log(old_productList);
  }


  // Set limit number for product skeleton
  var placeholderLimit = this.settings.productsPerRow || this.settings.placeholderProductPerRow;
  // Build placeholder items
  var placeholderItem = this.compileTemplate();
  this.$element = [];
  for (var i = 0; i < placeholderLimit; i++) {
    this.$element.push(jQ(placeholderItem));
  }
  // Show placeholder before send filter request OR hide it after get filter data
  if (!this.isFetchedProductData) {
    this.setShow();
  } else {
    this.setHide();
  }
}

ProductListPlaceholder.prototype.compileTemplateExtra = function() {
  console.log('ProductListPlaceholder compileTemplateExtra')
  var display = Globals.queryParams.display
  switch (display) {
    case 'list':
      //Todo: Build placeholder for List mode
      var template = boostPFSTemplate.productListPlaceholderHtml;
      var imgRatioSetting = parseFloat(this.settings.placeholderImageRatio);
      var imgRatio = imgRatioSetting > 0 ? imgRatioSetting : 1.4; // It mean w1:h1.4
      /**
       * Set product class for product skeleton (to set column, style, etc.)
       * - If had defined product_grid_class in boostPFSThemeConfig => use this config ELSE use our setting
       */
      break;
  }
  return template
    .replace(/{{class.filterProductSkeleton}}/g, Class.filterProductSkeleton)
    .replace(/{{class.filterSkeleton}}/g, Class.filterSkeleton)
    .replace(/{{class.filterSkeletonText}}/g, Class.filterSkeletonText)
    .replace(/{{paddingTop}}/g, imgRatio * 100)
}

/* Prevent conflict with theme vendor js */
Array.prototype.insert = function(a, b) {}

/* Math qual Height */
function equalHeight(data) {
  var equal_i = -1;
  var equal_els = [];
  var equal_element = null;

  // Equal Height Title
  jQ('.boost-pfs-filter-product-item').each(function(i, element) {

    var offsetTop = jQ(element).offset().top;
    if (!equal_element || equal_element.offset().top !== offsetTop) {
      equal_element = jQ(element);
      equal_i++;
    }

    if (!equal_els[equal_i]) {
      equal_els[equal_i] = [];
    }
    equal_els[equal_i].push(element);
  });

  for (var i = 0; i < equal_els.length; i++) {
    var max = 0;
    var maxRatio = 0;
    var iLength = equal_els[i].length;

    for (var j = 0; j < equal_els[i].length; j++) {
      var item = equal_els[i][j];
      var height = jQ(item).find('.boost-pfs-filter-product-bottom-inner').height();
      max = Math.max(max, height);

    }

    jQ(equal_els[i]).find('.boost-pfs-filter-product-bottom-inner').css({ 'min-height': max });

  }

  var aspect_ratio = boostPFSFilterConfig.general.aspect_ratio;

  if (aspect_ratio != 'false') {
    var cropImagePosition = boostPFSFilterConfig.general.cropImagePossitionEqualHeight;

    var widthImage = jQ('.boost-pfs-filter-product-item').width();
    var indexData = 0;

    // For Ratio
    if (aspect_ratio != 'false' && aspect_ratio != 'auto') {
      var heightImage = 0;
      var widthImage = jQ('.boost-pfs-filter-product-item').width();
      if (aspect_ratio != 'false' && aspect_ratio != 'auto' && aspect_ratio != 'other') {
        var ratioWidthHeight = boostPFSThemeConfig.custom.aspect_ratio;
      } else {
        var ratioWidthHeight = '';
      }

      var ratioWidthHeightOther = boostPFSThemeConfig.custom.aspect_ratio_other;
      if (ratioWidthHeightOther == '' && ratioWidthHeight == '') {
        return null;
      } else {
        if (aspect_ratio != 'other') {
          ratioWidthHeight = ratioWidthHeight.split(':');
          ratioWidthHeight = parseInt(ratioWidthHeight[1]) / parseInt(ratioWidthHeight[0]);
          heightImage = widthImage * ratioWidthHeight;
        } else if (ratioWidthHeightOther != '' && aspect_ratio == 'other') {
          ratioWidthHeightOther = ratioWidthHeightOther.split(':');
          ratioWidthHeightOther = parseInt(ratioWidthHeightOther[1]) / parseInt(ratioWidthHeightOther[0]);
          heightImage = widthImage * ratioWidthHeightOther;
        }
      }
      jQ('.boost-pfs-filter-product-item-image-link').css({ 'padding-top': heightImage + 'px' }).addClass('boost-pfs-filter-crop-image-position-' + cropImagePosition);

    }
  }
}

// Swap Image
function swapImage(data) {
  if (!Utils.isMobile()) {
    if (boostPFSThemeConfig.custom.hasOwnProperty('active_image_swap') &&
      boostPFSThemeConfig.custom.active_image_swap == true) {
      var dataSrcSetFlipImg = '',
        dataSrcFlipImg = '',
        flipImageAlt = '',
        dataSizes = 'auto',
        dataWidths = '',
        html = '';

      jQ(".boost-pfs-filter-product-item").each(function() {
        var productItemSelector = jQ(this);
        var imgSelector = productItemSelector.find('.boost-pfs-filter-product-item-main-image');

        if (typeof imgSelector.data('img-flip-src') != 'undefined' &&
          imgSelector.data('img-flip-src') != '') {
          dataSrcFlipImg = imgSelector.data('img-flip-src');
          dataSrcSetFlipImg = imgSelector.data('img-flip-srcset');
          flipImageAlt = imgSelector.attr('alt');
          dataWidths = imgSelector.data('widths');
          html = '<img class="boost-pfs-filter-product-item-flip-image lazyload Image--lazyLoad"' +
            'data-srcset="' + dataSrcSetFlipImg + '" ' +
            'data-src="' + dataSrcFlipImg + '" ' +
            'data-widths="[' + dataWidths + ']" ' +
            'data-sizes="' + dataSizes + '" ' +
            'src="' + boostPFSImgDefaultSrc + '" ' +
            'alt="' + flipImageAlt + '" />';

          productItemSelector.find('.boost-pfs-filter-product-item-image-link').append(html);
        }

      });
    }
  }
}

// Build Placeholder for the first load
function boostRemoveImageLoadingAnimation($selector) {
  if ($selector.length) {
    $selector.removeAttr('data-boost-image-loading-animation');
  }
}
/* Expand Filter */
jQ(document).ready(function() {
    jQ('.boost-pfs-filter-custom-filter-button').on('click', function(){
        jQ('body').toggleClass('boost-pfs-filter-custom-drawer-open');
    });
    jQ('.boost-pfs-filter-custom-drawer-close').click(function(){
        jQ('body').removeClass('boost-pfs-filter-custom-drawer-open');
    });
    jQ('.boost-pfs-filter-custom-drawer-overlay').click(function(){
        jQ('body').removeClass('boost-pfs-filter-custom-drawer-open');
    });
});

/* Sticky Filter Mobile */
function stickyFilterMobile() {
  var windowTop = window.pageYOffset || document.body.scrollTop;
  var heightFooter = 0;
  var divTop = 0;
  var divHeight = 0;
  if(jQ("#shopify-section-footer").length > 0){
    heightFooter = jQ("#shopify-section-footer").height();
  }
  if(jQ(".boost-pfs-filter-wrapper").length > 0){
    divTop = jQ('.boost-pfs-filter-wrapper').offset().top;
  }
  if(jQ(".boost-pfs-filter-wrapper").length > 0){
    divHeight = jQ(".boost-pfs-filter-wrapper").height();
  }

  if (windowTop > divTop + divHeight - heightFooter){
      jQ('body').removeClass('boost-pfs-mobile-stick');
  } else if (windowTop > divTop) {
      jQ('body').addClass('boost-pfs-mobile-stick');
  } else {
      jQ('body').removeClass('boost-pfs-mobile-stick');
  }
}

/* Sticky Filter Desktop Horizontal */
function stickyFilterHorizontal() {
  if(jQ('.boost-pfs-filter-tree-h-sticky-filter').length > 0 && !Utils.isMobile()){
    var windowTop = window.pageYOffset || document.body.scrollTop;
    var divTop = 0;
    if(jQ('.boost-pfs-filter-wrapper').length > 0){
      divTop = jQ('.boost-pfs-filter-wrapper').offset().top;
    }
        
    if (windowTop > divTop) {
      jQ('body').addClass('boost-pfs-filter-horizontal-sticky-body');
    } else {
      jQ('body').removeClass('boost-pfs-filter-horizontal-sticky-body');
    }
  }
}

//  添加置顶功能后的逻辑处理
function setCustomHandle(){
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  console.log('start custom')
  // function getUrlParam(name) {
  //   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  // }
  // let sortby = false
  // let _currentPage = getUrlParam('page'),
    // _sort_by = getUrlParam('sort_by')

  // 是否为有置顶的页面
  // if (!_currentPage||_currentPage<=1) {
  //   if (_sort_by) {
  //     sortby = true
  //   }
  // }

  let act_variants = {}

  var $btn = $(".boost-pfs-filter-product-item")
  if (needSetToTop()) {
    console.log('需要进行置顶处理',needSetToTop(),$btn.length)
    for (let i = 0; i < $btn.length; i++) {

      // 去除直接Add To Cart的逻辑（boost-pfs-otp.js 4053行），需先Select Options，然后再Add To Cart
      if ($btn.eq(i).find('.boost-pfs-addtocart-product-form .boost-pfs-addtocart-btn-text').text() == 'Add To Cart') {
        $btn.eq(i).find('.boost-pfs-addtocart-product-form .boost-pfs-addtocart-btn-text').text('Select Options')
      }
      
      let fakePid = $btn.eq(i).attr('data-id'), // 错误的商品id
        truePid = $btn.eq(i).find('.idWrap').attr('data-id'), // 正确的商品id
        trueSpuArr = $btn.eq(i).find('.boost-pfs-filter-product-item-image-link').attr('href').split('/'), // 正确的spu
        trueSpu = trueSpuArr[trueSpuArr.length-1]

      let optionBtn = $btn.eq(i).find('form.boost-pfs-addtocart-product-form'),
        viewBtn = $btn.eq(i).find('button.boost-pfs-quickview-btn.boost-pfs-filter-button'),
        trueOptionHref = '', trueViewHref = ''

      if (optionBtn.length>0) {
        let wrongSpuArr = $btn.eq(i).find('form.boost-pfs-addtocart-product-form').attr('data-href').split('/'), // 错误的spu
        wrongSpu = wrongSpuArr[wrongSpuArr.length-1]
        trueOptionHref = optionBtn.attr('data-href').replace(wrongSpu, trueSpu)
        trueViewHref = viewBtn.attr('data-href').replace(wrongSpu, trueSpu)
      }

      // 修改置顶后，两加购按钮，商品SPU不正确的问题
      $btn.eq(i).attr('data-id', truePid);
      $btn.eq(i).attr('data-page', $btn.eq(i-1).attr('data-page'))
      $btn.eq(i).find('form.boost-pfs-addtocart-product-form').attr('data-href', trueOptionHref);
      $btn.eq(i).find('button.boost-pfs-quickview-btn.boost-pfs-filter-button').attr('data-href', trueViewHref);
      $btn.eq(i).find('.custom-form-btn').attr('data-spu', trueSpu)
      $btn.eq(i).find('.custom-form-btn').attr('data-id', $btn.eq(i).attr('data-id'))
    }

      // 处理size、color规格选择时，加购的商品规格不正确问题
      // 设置form的提交参数为选中的类别
      $(".boost-pfs-filter-product-item").on('click', '.boost-pfs-swatch-element',function(){
      let productId = $(this).find('input').attr('id').split('-')[1]
      let productIndex = getTureProductIndex(productId)
      $('select.boost-pfs-quickview-variants-selector').find('option').removeAttr('selected')
      $('select.boost-pfs-quickview-variants-selector').find('option').eq(productIndex).attr('selected', 'selected')
    })

    // 所有商品置顶的情况下
    $('.boost-pfs-addtocart-btn.custom-form-btn').click(function(){
    let spu = $(this).attr('data-spu'),
        pid = $(this).attr('data-id')
        console.log(spu, pid)
      $.ajax({
        type: 'get',
        url: `/collections/best-sellers-nv030000/products/${spu}?view=boost-pfs-quickview-option`,
        dataType: "html",
        success: function (data) {
          quickviewOption_success(data, pid)
        },
        error: function (XMLHttpRequest, textStatus) {
        }
      });
    })
    
  }

  // 处理ajax数据
  function quickviewOption_success(data, pid){
    act_variants = {}
    let _html = `<div class="boost-pfs-select-option-wrapper"><div class="boost-pfs-select-option-close"></div>${data}</div>`
    $(".boost-pfs-filter-product-item[data-id="+pid+"]").find('.boost-pfs-filter-product-item-image').append(_html);
    
    // 展示默认选中的值
    for (let i = 0; i < $(".boost-pfs-filter-product-item[data-id="+pid+"]").find('.boost-pfs-quickview-selector-wrapper.last').length; i++) {
    const item = $(".boost-pfs-filter-product-item[data-id="+pid+"]").find('.boost-pfs-quickview-selector-wrapper.last').eq(i);
    item.find('.boost-pfs-quickview-product-option-header-select-option').html(item.find('input:checked').val())
    }

    //  关闭option框
    $('.boost-pfs-select-option-close').click(function(){
      act_variants = {}
      $(this).parent('.boost-pfs-select-option-wrapper').remove()
    })
  }

  // 选择规格时，获取选择前的初始规格
  function getProductVariantsWhenSelectChange(productId){
    let $target = $(".boost-pfs-filter-product-item[data-id="+productId+"]").find('.boost-pfs-quickview-selector-wrapper.last')
    let types_num = $target.length
    act_variants = {}
    for (let iv = 0; iv < $target.length; iv++) {
      const item = $target.eq(iv);
      act_variants['option'+(iv+1)] = item.find('input:checked').val()
      item.find('.boost-pfs-quickview-product-option-header-select-option').html(item.find('input:checked').val())
    }
    console.log(act_variants)
    return act_variants
  }

  // 找出选择规格后的正确商品
  function getTureProductIndex(productId){
    let selectdProduct = getProductVariantsWhenSelectChange(productId)
    let variantsLIst = JSON.parse($('.boost-pfs-quickview-variants-data-'+productId).html())
    for (let i = 0; i < variantsLIst.length; i++) {
      const item = variantsLIst[i];
      if (item['option1'] == selectdProduct['option1']&&item['option2'] == selectdProduct['option2']&&item['option3'] == selectdProduct['option3']) {
      return i
      }
    }
    return -1
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
}

// 
function needSetToTop(){
  let _currentPage = getUrlParam('page'),
    _sort_by = getUrlParam('sort_by'),
    paramsLen = window.location.search.split('&').length

  // 是否为有置顶的页面
  // if (!_currentPage||_currentPage<=1) {
  // 限制有且只有一个param参数，切参数名为sort_by时才显示置顶功能
  if (paramsLen<=1) {
    if (_sort_by) {
      return true
    }
  }

  return false
}
  
})();
