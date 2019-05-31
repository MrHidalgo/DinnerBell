'use strict';

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
 *
 * @type {{init(): void, change(): void, chooseVal(*): void, focusElem(*): void, blurElem(*): void}}
 * @private
 */
var customSelect = {
	init: function init() {
		var _select = document.querySelectorAll('select');

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = _select[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var elem = _step.value;

				elem.previousElementSibling.innerHTML = elem.options[elem.selectedIndex].text;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	},
	change: function change() {
		var _select = document.querySelectorAll('select');

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = _select[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var elem = _step2.value;

				var _selectedOption = elem.options[elem.selectedIndex],
				    _selectedValue = _selectedOption.value,
				    _selectedText = _selectedOption.text;

				if (_selectedValue !== '') {
					this.chooseVal(elem);
				}

				elem.previousElementSibling.innerHTML = _selectedText;
				this.blurElem(elem);
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	},
	chooseVal: function chooseVal(elem) {
		elem.closest('.c-form__select-wrapper').classList.add('is-choose');
	},
	focusElem: function focusElem(elem) {
		elem.closest('.c-form__select-wrapper').classList.add('is-focus');
	},
	blurElem: function blurElem(elem) {
		elem.closest('.c-form__select-wrapper').classList.remove('is-focus');
	}
};

/**
 * @name initCustomSelect
 *
 * @description
 */
var initCustomSelect = function initCustomSelect() {
	var _select = document.querySelectorAll('select');

	customSelect.init();

	var _loop = function _loop(elem) {
		elem.addEventListener('change', function () {
			customSelect.change(elem);
		});
		elem.addEventListener('focus', function () {
			customSelect.focusElem(elem);
		});
		elem.addEventListener('click', function () {
			customSelect.focusElem(elem);
		});
		elem.addEventListener('blur', function () {
			customSelect.blurElem(elem);
		});
	};

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = _select[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var elem = _step3.value;

			_loop(elem);
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}
};

/**
 * @name initHeaderFixed
 *
 * @description Fixing the site header in the scrolling page.
 */
var initHeaderFixed = function initHeaderFixed() {

	var countScroll = $(window).scrollTop(),
	    headerElement = $('.header');

	if (countScroll > 30) {
		headerElement.addClass("header--fixed");
	} else {
		headerElement.removeClass("header--fixed");
	}
};

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
 * @description Window on load.
 */
$(window).on("load", function (ev) {
	initHeaderFixed();
});

/**
 * @description Window on resize.
 */
$(window).on("resize", function (ev) {});

/**
 * @description Window on scroll.
 */
$(window).on("scroll", function (ev) {
	initHeaderFixed();
});

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
			var className = '\n\t\t\t\t.sidebar__nav-drop-link p, \n\t\t\t\t.sidebar__nav-setting, \n\t\t\t\t.header__dropdown\n\t\t\t';

			if (!$(e.target).closest(className).length) {
				$('.sidebar__nav-drop-more').removeClass('is-show is-drag');

				$('.header__dropdown').removeClass('is-open');
				$('.header__dropdown-toggle').siblings('.header__dropdown-menu').slideUp(350);
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

			$('.sidebar__nav-drop-more').removeClass('is-show');
			_parent.addClass('is-show');
		});

		$('.sidebar__nav-setting--move').on('click', function (ev) {
			var _el = $(ev.currentTarget),
			    _parent = _el.closest('.sidebar__nav-drop-more');

			$('.sidebar__nav-drop-more').removeClass('is-show is-drag');
			_parent.addClass('is-drag');
		});
	};

	var initHeaderDropDown = function initHeaderDropDown() {
		$('.header__dropdown-toggle').on('click', function (ev) {
			var _btn = $(ev.currentTarget),
			    _parent = _btn.closest('.header__dropdown');

			_parent.toggleClass('is-open');
			_btn.siblings('.header__dropdown-menu').slideToggle(350);
		});
	};

	// const initChooseTheme = () => {
	// 	$('.mds__theme').on('click', (ev) => {
	// 		$('.mds__theme').removeClass('is-choose');
	// 		$(ev.currentTarget).addClass('is-choose');
	// 	});
	// };


	var initChooseColor = function initChooseColor() {
		var _colorArr = $('.mds__form-color-content > a');

		_colorArr.map(function (idx, val) {

			var _parentNode = $(val).closest('.mds__form-color-content'),
			    _inputNode = _parentNode.find('input[type="text"]'),
			    _spanNode = _parentNode.find('span');

			new Pickr({
				el: val,
				components: {
					preview: true,
					opacity: true,
					hue: true,
					interaction: {
						hex: true,
						rgba: true,
						hsva: true,
						input: true,
						clear: false,
						save: true
					}
				}
			}).on('change', function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				_inputNode.val(args[0].toHEXA().toString());
				_spanNode.css({
					'backgroundColor': args[0].toHEXA().toString()
				});
			});
		});
	};

	var initChooseScreen = function initChooseScreen() {
		$('.mds__screen').not('.mds__screen--nc').on('click', function (ev) {
			$('.mds__screen').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');
		});
	};

	var initMenuLayout = function initMenuLayout() {
		$('.mds__menu').on('click', function (ev) {
			$('.mds__menu').removeClass('is-active');
			$(ev.currentTarget).addClass('is-active');
		});
	};

	var initRange = function initRange() {
		var _input = $('.mds__fontSize-input');

		_input.map(function (idx, val) {
			$(val).ionRangeSlider({
				min: 14,
				max: 22,
				from: 18,
				step: 2,
				grid: true,
				hide_min_max: true,
				hide_from_to: true,
				skin: "round"
			});
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
		initCustomSelect();

		// callback
		// ==========================================
		initBodyClick();
		initSidebarCollapse();
		initHeaderDropDown();
		// initChooseTheme();
		initChooseColor();
		initChooseScreen();
		initMenuLayout();
		initRange();
	};
	initJquery();
});