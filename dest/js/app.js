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

			var scale = Math.min(starterData.size.width / $el.outerWidth());

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

	var mySwiperTabletIntro = new Swiper('.swiper-container-intro', {
		loop: false,
		watchOverflow: true,
		normalizeSlideIndex: true,
		grabCursor: true,
		freeMode: false,
		effect: 'slide', // "slide", "fade", "cube", "coverflow" or "flip"
		speed: 750,
		slidesPerView: 1,
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
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
	initScalableBlock('.mds__wrapper-right #tablet');
});

/**
 * @description Window on resize.
 */
$(window).on("resize", function (ev) {
	initScalableBlock('.mds__wrapper-right #tablet');
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
			var className = '\n\t\t\t\t.sidebar__nav-drop-link p, \n\t\t\t\t.sidebar__nav-setting, \n\t\t\t\t[dropdown-js]\t\t\n\t\t\t';

			if (!$(e.target).closest(className).length) {
				$('.sidebar__nav-drop-more').removeClass('is-show is-drag');

				$('[dropdown-js]').removeClass('is-open');
				$('[dropdown-menu-js]').slideUp(350);
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

	var initDropDown = function initDropDown() {
		$('[dropdown-btn-js]').on('click', function (ev) {
			var _btn = $(ev.currentTarget),
			    _parent = _btn.closest('[dropdown-js]');

			if (!_btn.closest('[dropdown-js]').hasClass('is-open')) {
				$('[dropdown-js]').removeClass('is-open');
				$('[dropdown-menu-js]').slideUp(350);
			} else {
				_parent.removeClass('is-open');
				_btn.siblings('[dropdown-menu-js]').slideUp(350);

				return false;
			}

			_parent.addClass('is-open');
			_btn.siblings('[dropdown-menu-js]').slideDown(350);
		});
	};

	var initChooseColor = function initChooseColor() {
		var _colorArr = $('.mds__form-color-content > a, [change-color-js] > a');

		var _loop2 = function _loop2(el) {
			var _parentNode = $(el).closest('[change-color-js]').length === 0 ? $(el).closest('.mds__form-color-content') : $(el).closest('[change-color-js]');

			new Pickr({
				el: el,
				default: _parentNode.data('color'),
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

				var _color = args[0].toHEXA().toString();

				_parentNode.find('input[type="text"]').val(_color);
				_parentNode.find('span').css({
					'backgroundColor': _color
				});
				_parentNode.css({
					'backgroundColor': _color
				});

				if ($('.tablet--menuItems').length > 0) {
					$('[changeColor-' + _parentNode.data('name') + '-js]').css({
						'color': _color
					});
				}

				if ($('.tablet--feedback').length > 0) {
					$('[changeColor-' + _parentNode.data('name') + '-js]').css({
						'color': _color
					});
					$('[changeBgColor-' + _parentNode.data('bg') + '-js]').css({
						'background-color': _color
					});
				}

				if ($('.tablet--myorder').length > 0) {
					$('[changeColor-' + _parentNode.data('name') + '-js]').css({
						'color': _color
					});
					$('[changeBgColor-' + _parentNode.data('bg') + '-js]').css({
						'background-color': _color
					});
				}

				if ($('.tablet--logout').length > 0) {
					$('.tablet--logout .tablet__content').css({
						'background-color': _color
					});
				}

				if ($('.tablet--general').length > 0) {
					if (_parentNode.data('name') === 'fontNumeric') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}
					if (_parentNode.data('name') === 'fontText') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}

					if (_parentNode.data('name') === 'navText') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}
					if (_parentNode.data('name') === 'navBg') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'background-color': _color
						});
					}
					if (_parentNode.data('name') === 'navBorder') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'border-color': _color
						});
					}

					if (_parentNode.data('name') === 'alert') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color': _color
						});
						$('[' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}
					if (_parentNode.data('name') === 'alertTxt') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}

					if (_parentNode.data('name') === 'confirmation') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color': _color
						});
						$('[' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}
					if (_parentNode.data('name') === 'confirmationTxt') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}

					if (_parentNode.data('name') === 'confirm') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color': _color
						});
						$('[' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}
					if (_parentNode.data('name') === 'confirmTxt') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}

					if (_parentNode.data('name') === 'background') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color': _color
						});
					}

					if (_parentNode.data('name') === 'border') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'border-color': _color
						});
					}

					if (_parentNode.data('name') === 'highlight') {
						$('.is-choose[change-' + _parentNode.data('name') + '-js]').css({
							'background-color': _color
						});
					}

					if (_parentNode.data('name') === 'neutral') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color': _color
						});
					}
					if (_parentNode.data('name') === 'neutral1') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color': _color
						});
					}
					if (_parentNode.data('name') === 'neutral2') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'color': _color
						});
					}
				}
			});
		};

		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = _colorArr[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var el = _step4.value;

				_loop2(el);
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}
	};

	var _screenName = '';
	var _additionMethodsUploadFiles = function _additionMethodsUploadFiles() {
		var _additionalOption = $('[upload-additional-js]'),
		    _colorPallet = $('[change-bg-js]').closest('.mds__upload-left'),
		    _uploadBtn = $('[change-img-js]').closest('.mds__upload-right'),
		    _previewNode = $('[upload-preview-js]'),
		    _fixedImageBtn = $('[upload-imgFixed-js]'),
		    _repeatImageBtn = $('[upload-imgRepeat-js]');

		var _tabletBG = $('[tablet-bg-js]');

		var _defaultOption = {
			fixed: {
				'background-repeat': 'no-repeat',
				'background-position': 'center',
				'background-size': 'cover'
			},
			repeat: {
				'background-repeat': 'repeat',
				'background-position': 'top left',
				'background-size': 'unset'
			},
			default: {
				'background-image': 'url("")',
				'background-size': 'cover',
				'background-repeat': 'no-repeat',
				'background-position': 'center'
			}
		};

		return {
			showAdditionalUploadImageOption: function showAdditionalUploadImageOption() {
				console.log('showAdditionalUploadImageOption');

				_additionalOption.show();
			},
			hideAdditionalUploadImageOption: function hideAdditionalUploadImageOption() {
				console.log('hideAdditionalUploadImageOption');

				_additionalOption.hide();
			},
			addImageOnPreview: function addImageOnPreview(file) {
				console.log('showImageOnPreview');

				_previewNode.css({
					'background-image': 'url("' + file + '")'
				}).find("> *").hide();

				if ($('.tablet--intro').length > 0) {

					if (_screenName === 'static') {
						$('[introScreen-bg-js]').css({
							'background-image': 'url("' + file + '")'
						});
					}
				} else {
					_tabletBG.css({
						'background-image': 'url("' + file + '")'
					});
				}
			},
			removeImageOnPreview: function removeImageOnPreview() {
				console.log('hideImageOnPreview');

				_previewNode.css(_defaultOption.default).find("> *").show();

				if ($('.tablet--intro').length > 0) {

					if (_screenName === 'static') {
						$('[introScreen-bg-js]').css(_defaultOption.default);
					}
				} else {
					_tabletBG.css(_defaultOption.default);
				}
			},
			showColorPalletUploadBtn: function showColorPalletUploadBtn() {
				console.log('showColorPalletUploadBtn');

				[_colorPallet, _uploadBtn].map(function (val, idx) {
					val.css({
						'opacity': '1',
						'visibility': 'visible',
						'height': 'auto'
					});
				});
			},
			hideColorPalletUploadBtn: function hideColorPalletUploadBtn() {
				console.log('hideColorPalletUploadBtn');

				[_colorPallet, _uploadBtn].map(function (val, idx) {
					val.css({
						'opacity': '0',
						'visibility': 'hidden',
						'height': '0'
					});
				});
			},
			fixedBGOption: function fixedBGOption() {
				console.log('fixedBGOption');

				_fixedImageBtn.on('change', function (ev) {
					[_previewNode, _tabletBG, $('[introScreen-bg-js]')].map(function (el, idx) {
						el.css(_defaultOption.fixed);
					});
				});
			},
			repeatBGOption: function repeatBGOption() {
				console.log('repeatBGOption');

				_repeatImageBtn.on('change', function (ev) {
					[_previewNode, _tabletBG, $('[introScreen-bg-js]')].map(function (el, idx) {
						el.css(_defaultOption.repeat);
					});
				});
			},
			resetBGOption: function resetBGOption() {
				console.log('resetBGOption');

				if (_repeatImageBtn.is(':checked')) {
					_fixedImageBtn.prop('checked', true).change();
				}
			},
			removeImage: function removeImage() {
				var _this = this;

				console.log('removeImage');

				$('[upload-remove-js]').on('click', function (ev) {
					_this.hideAdditionalUploadImageOption();
					_this.showColorPalletUploadBtn();
					_this.removeImageOnPreview();
					_this.resetBGOption();

					ev.stopPropagation();
				});
			}
		};
	};

	var initTPChangeImage = function initTPChangeImage() {
		_additionMethodsUploadFiles().removeImage();
		_additionMethodsUploadFiles().fixedBGOption();
		_additionMethodsUploadFiles().repeatBGOption();

		$('[change-img-js] input[type="file"]').on('change', function (ev) {
			console.log('change upload');

			var _self = $(ev.currentTarget);

			_screenName = _self.closest('[change-img-js]').data('name');

			_additionMethodsUploadFiles().hideColorPalletUploadBtn();

			if (_self[0].files.length !== 0) {
				var reader = new FileReader();

				reader.onload = function () {
					var _file = reader.result;

					_additionMethodsUploadFiles().addImageOnPreview(_file);
				};

				_additionMethodsUploadFiles().showAdditionalUploadImageOption();

				reader.readAsDataURL(_self[0].files[0]);
			}

			_self.val('');
		});
	};

	var initTPChangeColor = function initTPChangeColor() {
		var _colorNodes = $('[change-bg-js] > a');

		var _loop3 = function _loop3(_el) {
			var _parentNode = $(_el).closest('[change-bg-js]');

			new Pickr({
				el: _el,
				default: _parentNode.data('default-color'),
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
				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}

				var _color = args[0].toHEXA().toString();

				var _colorNodeView = _parentNode.find('> span'),
				    _tabletBG = $('[tablet-bg-js]');

				_colorNodeView.css({
					'backgroundColor': _color
				});

				// BACKGROUND COLOR
				if (_tabletBG.length > 0) {
					_tabletBG.css({
						'backgroundColor': _color
					});
				}
			});
		};

		var _iteratorNormalCompletion5 = true;
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			for (var _iterator5 = _colorNodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				var _el = _step5.value;

				_loop3(_el);
			}
		} catch (err) {
			_didIteratorError5 = true;
			_iteratorError5 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion5 && _iterator5.return) {
					_iterator5.return();
				}
			} finally {
				if (_didIteratorError5) {
					throw _iteratorError5;
				}
			}
		}
	};

	var initChooseScreen = function initChooseScreen() {
		var removeUploadDetails = function removeUploadDetails() {
			$('[upload-previewFiles-js]').on('click', '[upload-remove-js]', function (ev) {
				console.log('remove');
				$(ev.currentTarget).closest('.mds__upload-row').remove();
			});
		};
		removeUploadDetails();

		$('[choose-screen-btn-js]').on('click', function (ev) {
			var _btn = $(ev.currentTarget),
			    _btnIDName = _btn.data('name'),
			    _tabletContainer = $('[introScreen-container-js][data-intro-name="' + _btnIDName + '"]');

			var _bgImgContainer = $('[introScreen-bg-js]'),
			    slideImgContainer = $('[introScreen-slideshow-js]'),
			    videoContainer = $('[introScreen-video-js]');

			var selectionScreenForPreview = function selectionScreenForPreview(fadeDuration) {
				$('[choose-screen-btn-js]').removeClass('is-error is-choose');
				$(ev.currentTarget).addClass('is-choose');

				$('[tablet-introScreen-js] [introScreen-container-js]').hide();
				_tabletContainer.css({
					'opacity': 1,
					'visibility': 'visible'
				}).fadeIn(fadeDuration);
			};

			var readFileURL = function readFileURL(input, mode) {

				var _previewTemplate = function _previewTemplate(fileName) {
					return '\n\t\t\t\t\t\t<div class="mds__fileName-row">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<p>' + fileName + '</p>\n\t\t\t\t\t\t\t\t<a href="#" title="" upload-remove-js>\n\t\t\t\t\t\t\t\t\t<i class="icon-font icon-bin"></i>\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t';
				};

				var _showDetails = function _showDetails(node, filesArr) {
					node.prev().hide();
					node.fadeIn(350).css({ 'display': 'flex' });

					for (var _idx = 0; _idx < filesArr; _idx++) {
						node.append(_previewTemplate(input.files[_idx].name));
					}
				};

				var _hideDetails = function _hideDetails(node) {
					node.prev().fadeIn(350);
					node.hide();
					node.find('> *').remove();
				};

				if (mode === 'slideshow') {
					// let _count = 0;
					//
					// const _parentNode = $(input).closest('.mds__screen'),
					// 	_previewSlideShow = _parentNode.find('[upload-previewFiles-js]');
					//
					// if(input.files.length > 3) {
					// 	_parentNode.addClass('is-error');
					// 	return false;
					// } else {
					// 	_parentNode.removeClass('is-error');
					//
					// 	for(let _idx = 0; _idx < input.files.length; _idx++) {
					// 		if (input.files[_idx]) {
					// 			const reader = new FileReader();
					//
					// 			reader.onload = () => {
					// 				const _slide = slideImgContainer.find('.swiper-slide')[_idx];
					//
					// 				$(_slide).css({
					// 					'background-image' : 'url("' + reader.result + '")'
					// 				});
					// 			};
					//
					// 			// _previewSlideShow.fadeIn(350).css({'display':'flex'});
					// 			//
					// 			// _previewSlideShow.append(_previewTemplate(input.files[_idx].name));
					// 			//
					// 			// reader.readAsDataURL(input.files[_idx]);
					// 		}
					// 	}
					// }

				} else if (mode === 'video') {
					var _parentNode2 = $(input).closest('.mds__screen'),
					    _previewVideo = _parentNode2.find('[upload-previewFiles-js]');

					if (input.files.length !== 0) {
						var reader = new FileReader(),
						    _vd = $(videoContainer).find('video');

						reader.onload = function () {
							$(_vd).map(function (idx, val) {
								$(val).find('source').attr('src', reader.result);

								val.load();
							});
						};

						_showDetails(_previewVideo, input.files.length);

						$('[upload-preview-video-js]').on('click', '[upload-remove-js]', function (ev) {
							_hideDetails(_previewVideo);

							$(_vd).map(function (idx, val) {
								$(val).find('source').attr('src', '');

								val.load();
							});
						});

						reader.readAsDataURL(input.files[0]);
					}
				}
			};

			// REMOVE BUTTON
			if ($(ev.target).closest('.mds__upload-row-wrapper').length !== 0) {
				return false;
			}
			// SLIDE SHOW
			else if ($(ev.target).closest('[upload-slideshow-js]').length !== 0) {}
				// console.log(`if slideshow`);
				//
				// $('[upload-slideshow-js] input[type="file"]').on('change', (ev) => {
				// 	readFileURL(ev.currentTarget, 'slideshow');
				// 	$(ev.currentTarget).val('');
				// });
				//
				// selectionScreenForPreview(0);

				// VIDEO PREVIEW
				else if ($(ev.target).closest('[upload-video-js]').length !== 0) {
						console.log('VIDEO PREVIEW');

						$('[upload-video-js] input[type="file"]').on('change', function (ev) {
							readFileURL(ev.currentTarget, 'video');
							$(ev.currentTarget).val('');
						});

						selectionScreenForPreview(0);
					}
					// SCREEN SELECTION FOR PREVIEW CHANGES
					else {
							console.log('SCREEN SELECTION FOR PREVIEW CHANGES');
							selectionScreenForPreview(0);
						}
		});
	};

	var initMenuLayout = function initMenuLayout() {
		$('.mds__menu').on('click', function (ev) {
			var _btn = $(ev.currentTarget),
			    _btnId = _btn.data('name');

			$('.mds__menu').removeClass('is-active');
			_btn.addClass('is-active');

			if (_btn.closest('.mds__menu-wrapper--menuItems')) {
				$('.tablet--menuItems .tablet__view').hide();

				if (_btnId === 'list') {
					$('.tablet--menuItems .tablet__view-' + _btnId).fadeIn(350);
				} else {
					$('.tablet--menuItems .tablet__view-' + _btnId).fadeIn(350);
				}
			}

			if (_btn.closest('.mds__menu-wrapper--mainMenu')) {
				var _nodeTablet = $('.tablet.tablet--mainMenu'),
				    _nodeTabletList = _nodeTablet.find('.tablet__block-wrapper--list'),
				    _nodeTabletThumbnail = _nodeTablet.find('.tablet__block-wrapper--thumbnail');

				if (_btnId === 'list') {
					_nodeTabletList.fadeIn(400);
					_nodeTabletThumbnail.hide();
				} else {
					_nodeTabletThumbnail.fadeIn(400);
					_nodeTabletList.hide();
				}
			}
		});
	};

	var initRange = function initRange() {
		var _rangeOption = function _rangeOption(min, max, start) {
			return {
				connect: true,
				range: {
					'min': min,
					'max': max
				},
				start: [start],
				step: 1,
				pips: {
					mode: 'steps',
					stepped: true,
					density: 10
				}
			};
		};

		if ($('#myOrderFSHeader').length > 0) {
			noUiSlider.create($('#myOrderFSHeader')[0], _rangeOption(26, 34, 30)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--myorder .tablet__heading p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#myOrderFSItemTitle').length > 0) {
			noUiSlider.create($('#myOrderFSItemTitle')[0], _rangeOption(18, 26, 22)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--myorder .tablet__list p, .tablet--myorder .tablet__new-body p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#myOrderFSItemCategory').length > 0) {
			noUiSlider.create($('#myOrderFSItemCategory')[0], _rangeOption(10, 18, 14)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--myorder .tablet__list i, .tablet--myorder .tablet__new-body i').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#myOrderFSInProcess').length > 0) {
			noUiSlider.create($('#myOrderFSInProcess')[0], _rangeOption(10, 18, 14)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--myorder .tablet__list--inprogress span').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#myOrderFSPending').length > 0) {
			noUiSlider.create($('#myOrderFSPending')[0], _rangeOption(10, 18, 14)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--myorder .tablet__list--pending span').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#myOrderFSServed').length > 0) {
			noUiSlider.create($('#myOrderFSServed')[0], _rangeOption(10, 18, 14)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--myorder .tablet__list--served span').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#feedbackFSItemTitle').length > 0) {
			noUiSlider.create($('#feedbackFSItemTitle')[0], _rangeOption(18, 26, 22)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--feedback .tablet__rating-top p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#feedbackFSItemCategory').length > 0) {
			noUiSlider.create($('#feedbackFSItemCategory')[0], _rangeOption(10, 18, 14)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--feedback .tablet__rating-top i').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#feedbackFSItemAssessment').length > 0) {
			noUiSlider.create($('#feedbackFSItemAssessment')[0], _rangeOption(10, 18, 14)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--feedback .tablet__rating span').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#menuItemsFSPrice').length > 0) {
			noUiSlider.create($('#menuItemsFSPrice')[0], _rangeOption(18, 26, 22)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--menuItems .tablet__btn span').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#itemDetailsFSTitle').length > 0) {
			noUiSlider.create($('#itemDetailsFSTitle')[0], _rangeOption(26, 34, 30)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--itemDetails .tablet__heading p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#itemDetailsFSDesc').length > 0) {
			noUiSlider.create($('#itemDetailsFSDesc')[0], _rangeOption(14, 22, 18)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--itemDetails .tablet__heading span, .tablet--itemDetails .tablet__desc p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#itemDetailsFSModTitle').length > 0) {
			noUiSlider.create($('#itemDetailsFSModTitle')[0], _rangeOption(26, 34, 30)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--itemDetails .tablet__sibtitle').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#itemDetailsFSModText').length > 0) {
			noUiSlider.create($('#itemDetailsFSModText')[0], _rangeOption(18, 26, 22)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--itemDetails .tablet__radio-group p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#menuItemsFSSectionHeader').length > 0) {
			noUiSlider.create($('#menuItemsFSSectionHeader')[0], _rangeOption(24, 32, 28)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--menuItems .tablet__subheader p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#menuItemsFSSubsection').length > 0) {
			noUiSlider.create($('#menuItemsFSSubsection')[0], _rangeOption(32, 40, 36)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--menuItems .tablet__subtitle').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#menuItemsFSItemTitleMenu').length > 0) {
			noUiSlider.create($('#menuItemsFSItemTitleMenu')[0], _rangeOption(18, 26, 22)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--menuItems .tablet__btn p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#menuItemsFSItemTitleMenuThb').length > 0) {
			noUiSlider.create($('#menuItemsFSItemTitleMenuThb')[0], _rangeOption(14, 22, 18)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--menuItems .tablet__block p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#menuItemsFSPriceThb').length > 0) {
			noUiSlider.create($('#menuItemsFSPriceThb')[0], _rangeOption(14, 22, 18)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--menuItems .tablet__block p i').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#mainMenuFSList').length > 0) {
			noUiSlider.create($('#mainMenuFSList')[0], _rangeOption(22, 30, 26)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--mainMenu .tablet__block-wrapper--list').find('p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#mainMenuFSThumbnail').length > 0) {
			noUiSlider.create($('#mainMenuFSThumbnail')[0], _rangeOption(14, 22, 18)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--mainMenu .tablet__block-wrapper--thumbnail').find('p').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#mainMenuFSInformation').length > 0) {
			noUiSlider.create($('#mainMenuFSInformation')[0], _rangeOption(20, 28, 24)).on('slide', function (values, handle, unencoded, tap, positions) {
				$('.tablet--mainMenu .tablet__info-link').css({
					'font-size': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#marginFeedback').length > 0) {
			noUiSlider.create($('#marginFeedback')[0], _rangeOption(0, 200, 0)).on('slide', function (values, handle, unencoded, tap, positions) {
				var _feedbackBanner = $('.tablet--feedback .tablet__banner');

				_feedbackBanner.css({
					'height': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		if ($('#marginSubsection').length > 0) {
			noUiSlider.create($('#marginSubsection')[0], _rangeOption(0, 150, 60)).on('slide', function (values, handle, unencoded, tap, positions) {
				var _feedbackBanner = $('.tablet--menuItems .tablet__subtitle');

				_feedbackBanner.css({
					'margin-top': parseInt(unencoded[handle]).toFixed(0) + 'px',
					'margin-bottom': parseInt(unencoded[handle]).toFixed(0) + 'px'
				});
			});
		}

		var _colorFontNodes = $('.mds__fontSize-row a');

		var _loop4 = function _loop4(_el) {
			var _parentNode = $(_el).closest('.mds__fontSize-col');

			new Pickr({
				el: _el,
				default: '#fff',
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
				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}

				var _color = args[0].toHEXA().toString();

				_parentNode.css({
					'backgroundColor': _color
				});

				if ($('.tablet--menuItems').length > 0) {
					$('[' + _parentNode.data('name') + '-js]').css({
						'color': _color
					});
				}

				if ($('.tablet--itemDetails').length > 0) {
					$('[' + _parentNode.data('name') + '-js]').css({
						'color': _color
					});
				}

				if ($('.tablet--mainMenu').length > 0) {
					$('[' + _parentNode.data('name') + '-js]').css({
						'color': _color
					});
				}
			});
		};

		var _iteratorNormalCompletion6 = true;
		var _didIteratorError6 = false;
		var _iteratorError6 = undefined;

		try {
			for (var _iterator6 = _colorFontNodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
				var _el = _step6.value;

				_loop4(_el);
			}
		} catch (err) {
			_didIteratorError6 = true;
			_iteratorError6 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion6 && _iterator6.return) {
					_iterator6.return();
				}
			} finally {
				if (_didIteratorError6) {
					throw _iteratorError6;
				}
			}
		}
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

	var initTabletMainMenuBlock = function initTabletMainMenuBlock() {
		$('.tablet--mainMenu .tablet__block').on('click', function (ev) {
			$('.tablet--mainMenu .tablet__block').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');
		});
	};

	var initTabletPreview = function initTabletPreview() {
		$('.mds__wrapper-preview, .header__preview').on('click', function () {
			$('html, body').addClass('is-hideScroll');
			$('.mds__wrapper-right').addClass('is-show');
		});

		$('.mds__wrapper-close').on('click', function () {
			$('html, body').removeClass('is-hideScroll');
			$('.mds__wrapper-right').removeClass('is-show');
		});
	};

	var initTabletPreviewSelectFonts = function initTabletPreviewSelectFonts() {
		var generateFontsOpt = function generateFontsOpt(linkTagName, styleTagName, elemOpt, style, node) {
			if (linkTagName.length !== 0) {

				linkTagName.attr('href', elemOpt.data('google-api'));
				styleTagName.text(style);
			} else {

				var _link = document.createElement('link'),
				    _style = document.createElement('style');

				_link.href = elemOpt.data('google-api');

				_style.innerHTML = style;

				node[0].prepend(_link);
				node[0].prepend(_style);
			}
		};

		$('[select-font-js]').on('change', function (ev) {
			var _elem = $(ev.currentTarget),
			    _elemOption = _elem.find('option:selected');

			var _tabletNode = $('#tablet'),
			    _tabletLinkTag = _tabletNode.find('> link'),
			    _tabletStyleTag = _tabletNode.find('> style');

			var _styleStr = '#tablet { font-family: "' + _elemOption.val() + '", sans-serif; }';

			generateFontsOpt(_tabletLinkTag, _tabletStyleTag, _elemOption, _styleStr, _tabletNode);
		});

		$('[select-font-numeric-js]').on('change', function (ev) {
			var _elem = $(ev.currentTarget),
			    _elemOption = _elem.find('option:selected');

			var _tabletNode = $('[numeric-js]').parent(),
			    _tabletLinkTag = _tabletNode.find('> link'),
			    _tabletStyleTag = _tabletNode.find('> style');

			var _styleStr = 'span[numeric-js] { font-family: "' + _elemOption.val() + '", sans-serif !important; }';

			generateFontsOpt(_tabletLinkTag, _tabletStyleTag, _elemOption, _styleStr, _tabletNode);
		});
	};

	var initTabletPreviewSelectCurrency = function initTabletPreviewSelectCurrency() {
		$('[select-currency-js]').on('change', function (ev) {
			var _elem = $(ev.currentTarget),
			    _elemOption = _elem.find('option:selected');

			$('[currency-sign-js]').text(_elemOption.val());
		});

		$('[select-currencyFormat-js]').on('change', function (ev) {
			var _format = $(ev.currentTarget).find('option:selected').val();

			var _priceArr = [];

			$('[numeric-js]').map(function (idx, val) {
				_priceArr.push($(val).data('price'));
			});

			if (_format === '$0') {
				_priceArr.map(function (val, idx) {
					$('[numeric-js]')[idx].innerHTML = '<span currency-sign-js>$</span>' + parseInt(val).toFixed(0);
				});
			} else if (_format === '$0.00') {
				_priceArr.map(function (val, idx) {
					$('[numeric-js]')[idx].innerHTML = '<span currency-sign-js>$</span>' + val;
				});
			} else if (_format === '0$') {
				_priceArr.map(function (val, idx) {
					$('[numeric-js]')[idx].innerHTML = parseInt(val).toFixed(0) + '<span currency-sign-js>$</span>';
				});
			} else if (_format === '0.00$') {
				_priceArr.map(function (val, idx) {
					$('[numeric-js]')[idx].innerHTML = val + '<span currency-sign-js>$</span>';
				});
			}
		});
	};

	var initDropDownCollapse = function initDropDownCollapse() {
		$('.header__nav-drop--collapse-head').on('click', function (ev) {
			var _btn = $(ev.currentTarget),
			    _parent = _btn.closest('.header__nav-drop--collapse');

			_parent.toggleClass('is-open');
			_btn.siblings('.header__nav-drop--collapse-body').slideToggle(400);
		});
	};

	var initTPNavigationColorIcon = function initTPNavigationColorIcon() {
		$('[radioColorIcon-js]').on('change', function (ev) {
			var _el = $(ev.currentTarget),
			    _elVal = _el.val();

			$('[navIcon-js]').css({
				'color': _elVal
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
		initCustomSelect();
		initHamburger();
		initSwiper();
		// ==========================================

		// callback
		initBodyClick();
		initSidebarCollapse();
		initDropDown();
		initChooseColor();
		initChooseScreen();
		initMenuLayout();
		initRange();
		initDropDownCollapse();

		initTabletRange();
		initTabletBoxChoose();
		initTabletMainMenuBlock();
		initTabletPreview();
		initTabletPreviewSelectFonts();
		initTabletPreviewSelectCurrency();

		initTPChangeColor();
		initTPChangeImage();
		initTPNavigationColorIcon();
		// ==========================================
	};
	initJquery();
});