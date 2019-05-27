"use strict";

/*
*
* ============================
* ============================
*
* Include lib:
*
* - webFontLoader.js;
* - preventBehavior.js;
* - svg4everybody.js;
*
* ============================
* ============================
* */

/**
 * @name initPreventBehavior
 *
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {

  var link = document.querySelectorAll("a");

  link.forEach(function (val, idx) {

    val.addEventListener("click", function (e) {
      if (val.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  });
};

/**
 * @name initSvg4everybody
 *
 * @description SVG for Everybody adds external spritemaps support to otherwise SVG-capable browsers.
 */
var initSvg4everybody = function initSvg4everybody() {

  svg4everybody();
};

/**
 * @name initWebFontLoader
 *
 * @description Loading fonts regardless of the source, then adds a standard set of events you may use to control the loading experience... for more details => https://github.com/typekit/fvd
 */
var initWebFontLoader = function initWebFontLoader() {

  /**
    * @description
   */
  // WebFont.load({
  //   google: {
  //     families: [
  //       'Roboto:100,300,400,500,700,900'
  //     ]
  //   }
  // });

  /**
    * @description
   */
  var WebFontConfig = {
    custom: {
      families: ['Fort:n1,n2,n3,n4,n5,n7,n8,n9']
    }
  };
};

/**
 * @description Document DOM ready.
 */
$(document).ready(function (ev) {
  /**
   *
   * @type {*|jQuery|HTMLElement}
   * @private
   */
  var _document = $(document),
      _window = $(window);

  /*
  * =============================================
  * CALLBACK :: start
  * ============================================= */
  var initBodyClick = function initBodyClick() {
    $('body').on('click', function (e) {
      var className = ".sidebar__nav-drop-link p, .sidebar__nav-setting";

      if (!$(e.target).closest(className).length) {
        $('.sidebar__nav-drop-more').removeClass('is-show');
      }
    });
  };

  var initSidebarCollapse = function initSidebarCollapse() {
    $('.sidebar__nav-btn--drop').on('click', function (ev) {
      var _btn = $(ev.currentTarget),
          _parent = _btn.closest('.sidebar__nav-btn-node');

      _parent.toggleClass('is-open');
      _btn.siblings('.sidebar__nav-drop').slideToggle(350);
    });

    $('.sidebar__nav-drop-link p').on('click', function (ev) {
      var _menu = $(ev.currentTarget),
          _parent = _menu.closest('.sidebar__nav-drop-more');

      _parent.addClass('is-show');
    });
  };
  /*
  * CALLBACK :: end
  * ============================================= */

  /**
   * @description Init all method
   */
  var initJquery = function initJquery() {
    // default
    initWebFontLoader();
    initPreventBehavior();
    initSvg4everybody();
    // ==========================================

    // lib
    // ==========================================

    // callback
    // ==========================================
    initBodyClick();
    initSidebarCollapse();
  };
  initJquery();
});