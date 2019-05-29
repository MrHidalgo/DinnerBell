

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
				.header__dropdown
			`;

			if (!$(e.target).closest(className).length) {
				$('.sidebar__nav-drop-more').removeClass('is-show');

				$('.header__dropdown').removeClass('is-open');
				$('.header__dropdown-toggle').siblings('.header__dropdown-menu').slideUp(350);
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

			_parent.addClass('is-show');
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


	const initChooseTheme = () => {
		$('.mds__theme').on('click', (ev) => {
			$('.mds__theme').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');
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
			$('.mds__screen').removeClass('is-choose');
			$(ev.currentTarget).addClass('is-choose');
		});
	};


	const initMenuLayout = () => {
		$('.mds__menu').on('click', (ev) => {
			$('.mds__menu').removeClass('is-active');
			$(ev.currentTarget).addClass('is-active');
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
		// ==========================================
		initCustomSelect();

    // callback
		// ==========================================
		initBodyClick();
		initSidebarCollapse();
		initHeaderDropDown();
		initChooseTheme();
		initChooseColor();
		initChooseScreen();
		initMenuLayout();
		initRange();
  };
  initJquery();
});

