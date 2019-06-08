

/**
 * @description Document DOM ready.
 */
$(document).ready((ev) => {
  /**
   *
   * @type {*|jQuery|HTMLElement}
   * @private
   */
  const _document = $(document),
    _window = $(window);


	/*
	* =============================================
	* CALLBACK :: start
	* ============================================= */
	const initBodyClick = () => {
		$('body').on('click', function (e) {
			const className = `
				.sidebar__nav-drop-link p, 
				.sidebar__nav-setting, 
				.header__dropdown,
				.mds__title-wrapper		
			`;

			if (!$(e.target).closest(className).length) {
				$('.sidebar__nav-drop-more').removeClass('is-show is-drag');

				$('.header__dropdown').removeClass('is-open');
				$('.header__dropdown-toggle').siblings('.header__dropdown-menu').slideUp(350);

				$('.mds__title-wrapper').removeClass('is-open');
				$('.mds__title').siblings('.mds__title-drop').slideUp(350);
			}

			if($(window).width() <= 1280) {
				const className = `		
					.header,
					.sidebar,
					.mds__wrapper-preview,
					.mds__wrapper-right
				`;

				if (!$(e.target).closest(className).length) {
					$('html, body').removeClass('is-hideScroll');
					$('[hamburger-js]').removeClass('is-active');
					$('[mobile-block-js]').removeClass('is-open');
				}
			}
		});
	};


	const initSidebarCollapse = () => {
		$('.sidebar__nav-btn--drop').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_parent = _btn.closest('.sidebar__nav-btn-node');

			_parent.toggleClass('is-open');
			_btn.siblings('.sidebar__nav-drop').slideToggle(350);
		});

		$('.sidebar__nav-drop-link p').on('click', (ev) => {
			const _menu = $(ev.currentTarget),
				_parent = _menu.closest('.sidebar__nav-drop-more');

			$('.sidebar__nav-drop-more').removeClass('is-show');
			_parent.addClass('is-show');
		});

		$('.sidebar__nav-setting--move').on('click', (ev) => {
			const _el = $(ev.currentTarget),
				_parent = _el.closest('.sidebar__nav-drop-more');

			$('.sidebar__nav-drop-more').removeClass('is-show is-drag');
			_parent.addClass('is-drag');
		});
	};


	const initHeaderDropDown = () => {
		$('.header__dropdown-toggle').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_parent = _btn.closest('.header__dropdown');

			_parent.toggleClass('is-open');
			_btn.siblings('.header__dropdown-menu').slideToggle(350);
		});
	};


	const initMDSTitleDropDown = () => {
		$('.mds__title').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_parent = _btn.closest('.mds__title-wrapper');

			_parent.toggleClass('is-open');
			_btn.siblings('.mds__title-drop').slideToggle(350);
		});
	};


	const initChooseColor = () => {
		const _colorArr = $('.mds__form-color-content > a');

		_colorArr.map((idx, val) => {

			const _parentNode = $(val).closest('.mds__form-color-content'),
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
			}).on('change', (...args) => {
				_inputNode.val(args[0].toHEXA().toString());
				_spanNode.css({
					'backgroundColor' : args[0].toHEXA().toString()
				});
			});
		});
	};


	const initChooseScreen = () => {
		$('.mds__screen').not('.mds__screen--nc').on('click', (ev) => {
			const _id = $(ev.currentTarget).data('name');

			$('.mds__screen').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');

			const _tabletWrapper = $('.tablet--intro .tablet__wrapper-' + _id);

			$('.tablet--intro .tablet__wrapper-content > div > div').hide();
			_tabletWrapper.css({'opacity':1, 'visibility':'visible' }).fadeIn(350);
		});
	};


	const initMenuLayout = () => {
		$('.mds__menu').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_btnId = _btn.data('name');

			$('.mds__menu').removeClass('is-active');
			_btn.addClass('is-active');

			$('.tablet--menuItems .tablet__view').hide();

			if(_btnId === 'list') {
				$('.tablet--menuItems .tablet__view-' + _btnId).fadeIn(350);
			} else {
				$('.tablet--menuItems .tablet__view-' + _btnId).fadeIn(350);
			}
		});
	};


	const initRange = () => {
		const _input = $('.mds__fontSize-input');

		_input.map((idx, val) => {
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


	const initTabletRange = () => {
		const _input = $('.tablet__range input');

		_input.map((idx, val) => {
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


	const initTabletBoxChoose = () => {
		$('.tablet__box').on('click', (ev) => {
			$('.tablet__box').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');
		});
	};


	const initTabletCollapse = () => {
		$('.tablet__collapse-header').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_parent = _btn.closest('.tablet__collapse');

			_parent.toggleClass('is-open');
			_parent.find('.tablet__collapse-body').slideToggle(400);
		});
	};


	const initTabletMenuItemsView = () => {
		$('.tablet--menuItems .tablet__btn').on('click', (ev) => {
			const _btn = $(ev.currentTarget);

			$('.tablet--menuItems .tablet__btn').removeClass('is-choose');
			_btn.addClass('is-choose');
		});

		$('.tablet--menuItems .tablet__block').on('click', (ev) => {
			const _btn = $(ev.currentTarget);

			$('.tablet--menuItems .tablet__block').removeClass('is-choose');
			_btn.addClass('is-choose');
		});
	};


	const initTabletMainMenuBlock = () => {
		$('.tablet--mainMenu .tablet__block').on('click', (ev) => {
			$('.tablet--mainMenu .tablet__block').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');
		});
	};


	const initTabletPreview = () => {
		$('.mds__wrapper-preview').on('click', () => {
			$('html, body').addClass('is-hideScroll');
			$('.mds__wrapper-right').addClass('is-show');
		});

		$('.mds__wrapper-close').on('click', () => {
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
  const initJquery = () => {
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

