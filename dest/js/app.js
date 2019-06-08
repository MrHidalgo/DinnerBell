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
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
var initHamburger = function initHamburger() {

	var btn = document.querySelector("[hamburger-js]"),
	    hideScrollContainer = document.querySelectorAll("html, body"),
	    mobileContainer = document.querySelector("[mobile-block-js]");

	/**
   * @description
  */
	btn.addEventListener("click", function (ev) {
		var elem = ev.currentTarget;

		elem.classList.toggle("is-active");
		mobileContainer.classList.toggle("is-open");

		hideScrollContainer.forEach(function (val, idx) {
			val.classList.toggle("is-hideScroll");
		});
	});
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
 * @name initScalableBlock
 *
 * @description
 */
var initScalableBlock = function initScalableBlock(element) {
	if ($(window).width() < 768) {
		if (element && $(element).length) {
			var $el = $(element),
			    $wrapper = $el.parent();

			var starterData = {
				size: {
					width: $wrapper.width(),
					height: $wrapper.height()
				}
			};

			var scale = Math.min(starterData.size.width / $el.outerWidth(), starterData.size.height / $el.outerHeight());

			if (scale > 1) {
				scale = 1;
			}

			$el.css({
				transform: "translate3d(-50%, 0, 0) " + "scale(" + scale + ")"
			});
		}
	} else {
		$(element).attr('style', '');
	}
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
 * @name initSwiper
 *
 * @description initialize Swiper
 */
var initSwiper = function initSwiper() {

	var mySwipertabletIntro = new Swiper('.swiper-container-intro', {
		// Optional parameters
		wrapperClass: "swiper-wrapper",
		slideClass: "swiper-slide",
		direction: 'horizontal', // 'horizontal' or 'vertical'
		loop: true,
		watchOverflow: true,
		normalizeSlideIndex: true,
		grabCursor: true,
		freeMode: false,
		effect: 'slide', // "slide", "fade", "cube", "coverflow" or "flip"
		speed: 750,
		// autoplay: {
		//   delay: 5000,
		// },
		// Disable preloading of all images
		// preloadImages: false,
		// Enable lazy loading
		// lazy: {
		//   loadPrevNext: true,
		// },

		// off touch for desktop
		// touchMoveStopPropagation:false,
		// simulateTouch : false,
		// allowSwipeToNext: true,
		// allowSwipeToPrev: true,
		// allowPageScroll: "auto ",

		slidesPerView: 1,
		spaceBetween: 0,
		// breakpoints: {
		//   // when window width is <= 320px
		//   320: {
		//     slidesPerView: 1,
		//     spaceBetween: 10
		//   },
		//   // when window width is <= 480px
		//   480: {
		//     slidesPerView: 2,
		//     spaceBetween: 20
		//   },
		//   // when window width is <= 640px
		//   640: {
		//     slidesPerView: 3,
		//     spaceBetween: 30
		//   }
		// },

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true
			// renderBullet: function (index, className) {
			//   return `
			//     <div class="${className}">
			//       ${index}
			//     </div>
			//   `;
			// }
		}

		// Navigation arrows
		// navigation: {
		//   nextEl: '.swiper-button-next',
		//   prevEl: '.swiper-button-prev',
		// },
		//
		// // And if we need scrollbar
		// scrollbar: {
		//   el: '.swiper-scrollbar',
		// },
		//
		// on: {
		//   "slideChange": function () {
		//     console.log("slideChange");
		//   },
		// }
	});

	var mySwiperTabletCarousel = new Swiper('.swiper-container-tabletcarousel', {
		// Optional parameters
		wrapperClass: "swiper-wrapper",
		slideClass: "swiper-slide",
		direction: 'horizontal', // 'horizontal' or 'vertical'
		loop: true,
		watchOverflow: true,
		normalizeSlideIndex: true,
		grabCursor: true,
		freeMode: false,
		effect: 'slide', // "slide", "fade", "cube", "coverflow" or "flip"
		speed: 750,
		// autoplay: {
		//   delay: 5000,
		// },
		// Disable preloading of all images
		// preloadImages: false,
		// Enable lazy loading
		// lazy: {
		//   loadPrevNext: true,
		// },

		// off touch for desktop
		// touchMoveStopPropagation:false,
		// simulateTouch : false,
		// allowSwipeToNext: true,
		// allowSwipeToPrev: true,
		// allowPageScroll: "auto ",

		slidesPerView: 1,
		spaceBetween: 0,
		// breakpoints: {
		//   // when window width is <= 320px
		//   320: {
		//     slidesPerView: 1,
		//     spaceBetween: 10
		//   },
		//   // when window width is <= 480px
		//   480: {
		//     slidesPerView: 2,
		//     spaceBetween: 20
		//   },
		//   // when window width is <= 640px
		//   640: {
		//     slidesPerView: 3,
		//     spaceBetween: 30
		//   }
		// },

		// If we need pagination
		// pagination: {
		//   el: '.swiper-pagination',
		//   clickable: true,
		//   // renderBullet: function (index, className) {
		//   //   return `
		//   //     <div class="${className}">
		//   //       ${index}
		//   //     </div>
		//   //   `;
		//   // }
		// },

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}

		// // And if we need scrollbar
		// scrollbar: {
		//   el: '.swiper-scrollbar',
		// },
		//
		// on: {
		//   "slideChange": function () {
		//     console.log("slideChange");
		//   },
		// }
	});
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
	initScalableBlock('#tablet .tablet__wrapper');
});

/**
 * @description Window on resize.
 */
$(window).on("resize", function (ev) {
	initScalableBlock('#tablet .tablet__wrapper');
});

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
			var className = '\n\t\t\t\t.sidebar__nav-drop-link p, \n\t\t\t\t.sidebar__nav-setting, \n\t\t\t\t.header__dropdown,\n\t\t\t\t.mds__title-wrapper\t\t\n\t\t\t';

			if (!$(e.target).closest(className).length) {
				$('.sidebar__nav-drop-more').removeClass('is-show is-drag');

				$('.header__dropdown').removeClass('is-open');
				$('.header__dropdown-toggle').siblings('.header__dropdown-menu').slideUp(350);

				$('.mds__title-wrapper').removeClass('is-open');
				$('.mds__title').siblings('.mds__title-drop').slideUp(350);
			}

			if ($(window).width() <= 1280) {
				var _className = '\t\t\n\t\t\t\t\t.header,\n\t\t\t\t\t.sidebar,\n\t\t\t\t\t.mds__wrapper-preview,\n\t\t\t\t\t.mds__wrapper-right\n\t\t\t\t';

				if (!$(e.target).closest(_className).length) {
					$('html, body').removeClass('is-hideScroll');
					$('[hamburger-js]').removeClass('is-active');
					$('[mobile-block-js]').removeClass('is-open');
				}
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

	var initMDSTitleDropDown = function initMDSTitleDropDown() {
		$('.mds__title').on('click', function (ev) {
			var _btn = $(ev.currentTarget),
			    _parent = _btn.closest('.mds__title-wrapper');

			_parent.toggleClass('is-open');
			_btn.siblings('.mds__title-drop').slideToggle(350);
		});
	};

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
			var _id = $(ev.currentTarget).data('name');

			$('.mds__screen').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');

			var _tabletWrapper = $('.tablet--intro .tablet__wrapper-' + _id);

			$('.tablet--intro .tablet__wrapper-content > div > div').hide();
			_tabletWrapper.css({ 'opacity': 1, 'visibility': 'visible' }).fadeIn(350);
		});
	};

	var initMenuLayout = function initMenuLayout() {
		$('.mds__menu').on('click', function (ev) {
			var _btn = $(ev.currentTarget),
			    _btnId = _btn.data('name');

			$('.mds__menu').removeClass('is-active');
			_btn.addClass('is-active');

			$('.tablet--menuItems .tablet__view').hide();

			if (_btnId === 'list') {
				$('.tablet--menuItems .tablet__view-' + _btnId).fadeIn(350);
			} else {
				$('.tablet--menuItems .tablet__view-' + _btnId).fadeIn(350);
			}
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

	var initTabletRange = function initTabletRange() {
		var _input = $('.tablet__range input');

		_input.map(function (idx, val) {
			$(val).ionRangeSlider({
				min: 1,
				max: 5,
				from: 3,
				step: 1,
				grid: true,
				hide_min_max: true,
				hide_from_to: true,
				skin: "round"
			});
		});
	};

	var initTabletBoxChoose = function initTabletBoxChoose() {
		$('.tablet__box').on('click', function (ev) {
			$('.tablet__box').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');
		});
	};

	var initTabletCollapse = function initTabletCollapse() {
		$('.tablet__collapse-header').on('click', function (ev) {
			var _btn = $(ev.currentTarget),
			    _parent = _btn.closest('.tablet__collapse');

			_parent.toggleClass('is-open');
			_parent.find('.tablet__collapse-body').slideToggle(400);
		});
	};

	var initTabletMenuItemsView = function initTabletMenuItemsView() {
		$('.tablet--menuItems .tablet__btn').on('click', function (ev) {
			var _btn = $(ev.currentTarget);

			$('.tablet--menuItems .tablet__btn').removeClass('is-choose');
			_btn.addClass('is-choose');
		});

		$('.tablet--menuItems .tablet__block').on('click', function (ev) {
			var _btn = $(ev.currentTarget);

			$('.tablet--menuItems .tablet__block').removeClass('is-choose');
			_btn.addClass('is-choose');
		});
	};

	var initTabletMainMenuBlock = function initTabletMainMenuBlock() {
		$('.tablet--mainMenu .tablet__block').on('click', function (ev) {
			$('.tablet--mainMenu .tablet__block').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');
		});
	};

	var initTabletPreview = function initTabletPreview() {
		$('.mds__wrapper-preview').on('click', function () {
			$('html, body').addClass('is-hideScroll');
			$('.mds__wrapper-right').addClass('is-show');
		});

		$('.mds__wrapper-close').on('click', function () {
			$('html, body').removeClass('is-hideScroll');
			$('.mds__wrapper-right').removeClass('is-show');
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
		initCustomSelect();
		initHamburger();
		initSwiper();
		// ==========================================

		// callback
		initBodyClick();
		initSidebarCollapse();
		initHeaderDropDown();
		initMDSTitleDropDown();
		initChooseColor();
		initChooseScreen();
		initMenuLayout();
		initRange();

		initTabletRange();
		initTabletBoxChoose();
		initTabletCollapse();
		initTabletMenuItemsView();
		initTabletMainMenuBlock();
		initTabletPreview();
		// ==========================================
	};
	initJquery();
});