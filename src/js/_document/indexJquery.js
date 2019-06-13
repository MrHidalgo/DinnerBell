

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
				[dropdown-js]		
			`;

			if (!$(e.target).closest(className).length) {
				$('.sidebar__nav-drop-more').removeClass('is-show is-drag');

				$('[dropdown-js]').removeClass('is-open');
				$('[dropdown-menu-js]').slideUp(350);
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


	const initDropDown = () => {
		$('[dropdown-btn-js]').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_parent = _btn.closest('[dropdown-js]');

			if(!_btn.closest('[dropdown-js]').hasClass('is-open')) {
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


	const initChooseColor = () => {
		const _colorArr = $('.mds__form-color-content > a');

		_colorArr.map((idx, val) => {

			const _parentNode = $(val).closest('.mds__form-color-content'),
				_nodeName = _parentNode.data('name'),
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

				if($('.tablet--menuItems').length > 0) {
					$('[changeColor-' + _nodeName + '-js]').css({
						'color' : args[0].toHEXA().toString()
					});
				}
			});
		});
	};


	const initChooseScreen = () => {
		const removeUploadDetails = () => {
			$('[upload-previewFiles-js]').on('click', '[upload-remove-js]', (ev) => {
				console.log(`remove`);
				$(ev.currentTarget).closest('.mds__upload-row').remove();
			});
		};
		removeUploadDetails();

		$('[choose-screen-btn-js]').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_btnIDName = _btn.data('name'),
				_tabletContainer = $('[introScreen-container-js][data-intro-name="' + _btnIDName + '"]');

			const _bgImgContainer = $('[introScreen-bg-js]'),
				slideImgContainer = $('[introScreen-slideshow-js]'),
				videoContainer = $('[introScreen-video-js]');


			const selectionScreenForPreview = (fadeDuration) => {
				$('[choose-screen-btn-js]').removeClass('is-error is-choose');
				$(ev.currentTarget).addClass('is-choose');

				$('[tablet-introScreen-js] [introScreen-container-js]').hide();
				_tabletContainer.css({
					'opacity':1,
					'visibility':'visible'
				}).fadeIn(fadeDuration);
			};


			const readFileURL = (input, mode) => {

				const _previewTemplate = (fileName) => {
					return  `
						<div class="mds__upload-row">
							<div>
								<p>${fileName}</p>
								<a href="#" title="" upload-remove-js>
									<i class="icon-font icon-bin"></i>
								</a>
							</div>    				
						</div>								
					`
				};

				const _showDetails = (node, filesArr) => {
					node.prev().hide();
					node.fadeIn(350).css({'display':'flex'});

					for(let _idx = 0; _idx < filesArr; _idx++) {
						node.append(_previewTemplate(input.files[_idx].name));
					}
				};

				const _hideDetails = (node) => {
					node.prev().fadeIn(350);
					node.hide();
				};

				if(mode === 'static') {
					const _previewStatic = $(input).closest('.mds__screen').find('[upload-previewFiles-js]');

					if(input.files.length !== 0) {
						const reader = new FileReader();

						reader.onload = () => {
							_bgImgContainer.css({
								'background-image' : 'url("' + reader.result + '")'
							});
						};

						_showDetails(_previewStatic, input.files.length);

						$('[upload-preview-image-js]').on('click', '[upload-remove-js]', (ev) => {
							_hideDetails(_previewStatic);

							_bgImgContainer.css({
								'background-image' : 'url("")'
							});
						});

						reader.readAsDataURL(input.files[0]);
					}

				} else if(mode === 'slideshow') {
					let _count = 0;

					const _parentNode = $(input).closest('.mds__screen'),
						_previewSlideShow = _parentNode.find('[upload-previewFiles-js]');

					if(input.files.length > 3) {
						_parentNode.addClass('is-error');
						return false;
					} else {
						_parentNode.removeClass('is-error');

						for(let _idx = 0; _idx < input.files.length; _idx++) {
							if (input.files[_idx]) {
								const reader = new FileReader();

								reader.onload = () => {
									const _slide = slideImgContainer.find('.swiper-slide')[_idx];

									$(_slide).css({
										'background-image' : 'url("' + reader.result + '")'
									});
								};

								// _previewSlideShow.fadeIn(350).css({'display':'flex'});
								//
								// _previewSlideShow.append(_previewTemplate(input.files[_idx].name));
								//
								// reader.readAsDataURL(input.files[_idx]);
							}
						}
					}

				} else if (mode === 'video') {
					const _parentNode = $(input).closest('.mds__screen'),
						_previewVideo = _parentNode.find('[upload-previewFiles-js]');

					if (input.files.length !== 0) {
						const reader = new FileReader(),
							_vd = $(videoContainer).find('video')[0];

						reader.onload = () => {
							$(_vd)
								.find('source')
								.attr('src', reader.result);

							_vd.load();
						};

						_showDetails(_previewVideo, input.files.length);

						$('[upload-preview-video-js]').on('click', '[upload-remove-js]', (ev) => {
							_hideDetails(_previewVideo);

							$(_vd)
								.find('source')
								.attr('src', '');

							_vd.load();
						});

						reader.readAsDataURL(input.files[0]);
					}
				}
			};

			// REMOVE BUTTON
			if($(ev.target).closest('.mds__upload-row-wrapper').length !== 0) {
				return false;
			}
			// STATIC IMAGE
			else if($(ev.target).closest('[upload-image-js]').length !== 0) {
				console.log(`STATIC IMAGE`);

				$('[upload-image-js] input[type="file"]').on('change', (ev) => {
					readFileURL(ev.currentTarget, 'static');
					$(ev.currentTarget).val('');
				});

				selectionScreenForPreview(0);
			}
			// SLIDE SHOW
			else if($(ev.target).closest('[upload-slideshow-js]').length !== 0) {
				console.log(`if slideshow`);

				$('[upload-slideshow-js] input[type="file"]').on('change', (ev) => {
					readFileURL(ev.currentTarget, 'slideshow');
					$(ev.currentTarget).val('');
				});

				selectionScreenForPreview(0);
			}
			// VIDEO PREVIEW
			else if($(ev.target).closest('[upload-video-js]').length !== 0) {
				console.log(`VIDEO PREVIEW`);

				$('[upload-video-js] input[type="file"]').on('change', (ev) => {
					readFileURL(ev.currentTarget, 'video');
					$(ev.currentTarget).val('');
				});

				selectionScreenForPreview(0);
			}
			// SCREEN SELECTION FOR PREVIEW CHANGES
			else {
				selectionScreenForPreview(400);
			}
		});
	};


	const initMenuLayout = () => {
		$('.mds__menu').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_btnId = _btn.data('name');

			$('.mds__menu').removeClass('is-active');
			_btn.addClass('is-active');

			if (_btn.closest('.mds__menu-wrapper--menuItems')) {
				$('.tablet--menuItems .tablet__view').hide();

				if(_btnId === 'list') {
					$('.tablet--menuItems .tablet__view-' + _btnId).fadeIn(350);
				} else {
					$('.tablet--menuItems .tablet__view-' + _btnId).fadeIn(350);
				}
			}

			if (_btn.closest('.mds__menu-wrapper--mainMenu')) {
				const _nodeTablet = $('.tablet.tablet--mainMenu'),
					_nodeTabletList = _nodeTablet.find('.tablet__block-wrapper--list'),
					_nodeTabletThumbnail = _nodeTablet.find('.tablet__block-wrapper--thumbnail');

				if(_btnId === 'list') {
					_nodeTabletList.fadeIn(400);
					_nodeTabletThumbnail.hide();
				} else {
					_nodeTabletThumbnail.fadeIn(400);
					_nodeTabletList.hide();
				}
			}
		});
	};


	const initRange = () => {
		const _input = $('.mds__fontSize-input');

		$('[changeFont-list-js]').ionRangeSlider({
			min: 24,
			max: 28,
			from: 26,
			step: 1,
			grid: true,
			hide_min_max: true,
			hide_from_to: true,
			skin: "round",
			onChange: function (scope) {
				$('.tablet__block-wrapper--list').find('p').css({
					'font-size' : (scope.from)
				});
			}
		});

		$('[changeFont-thumbnail-js]').ionRangeSlider({
			min: 16,
			max: 20,
			from: 18,
			step: 1,
			grid: true,
			hide_min_max: true,
			hide_from_to: true,
			skin: "round",
			onChange: function (scope) {
				$('.tablet__block-wrapper--thumbnail').find('p').css({
					'font-size' : (scope.from)
				});
			}
		});

		$('[changeFont-information-js]').ionRangeSlider({
			min: 22,
			max: 26,
			from: 24,
			step: 1,
			grid: true,
			hide_min_max: true,
			hide_from_to: true,
			skin: "round",
			onChange: function (scope) {
				$('.tablet__info-link').css({
					'font-size' : (scope.from)
				});
			}
		});

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


	const initTabletPreviewSelectFonts = () => {
		$('[select-font-js]').on('change', (ev) => {
			const _elem = $(ev.currentTarget),
				_elemOption = _elem.find('option:selected');

			const _tabletNode = $('#tablet'),
				_tabletLinkTag = _tabletNode.find('link'),
				_tabletStyleTag = _tabletNode.find('style');

			const _styleStr = '#tablet { font-family: "' + _elemOption.val() + '", sans-serif; }';

			if(_tabletLinkTag.length !== 0) {

				_tabletLinkTag.attr('href', _elemOption.data('google-api'));
				_tabletStyleTag.text(_styleStr);

			} else {

				const _link = document.createElement('link'),
					_style = document.createElement('style');

				_link.href = _elemOption.data('google-api');

				_style.innerHTML = _styleStr;

				_tabletNode[0].prepend(_link);
				_tabletNode[0].prepend(_style);
			}
		});
	};


	const initTabletPreviewSelectCurrency = () => {
		$('[select-currency-js]').on('change', (ev) => {
			$('[currency-sign-js]').text($(ev.currentTarget).find('option:selected').val());
		});
	};


	const initDropDownCollapse = () => {
		$('.header__nav-drop--collapse-head').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_parent = _btn.closest('.header__nav-drop--collapse');

			_parent.toggleClass('is-open');
			_btn.siblings('.header__nav-drop--collapse-body').slideToggle(400);
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
		initDropDown();
		initChooseColor();
		initChooseScreen();
		initMenuLayout();
		initRange();
		initDropDownCollapse();

		initTabletRange();
		initTabletBoxChoose();
		initTabletCollapse();
		initTabletMenuItemsView();
		initTabletMainMenuBlock();
		initTabletPreview();
		initTabletPreviewSelectFonts();
		initTabletPreviewSelectCurrency();
		// ==========================================
  };
  initJquery();
});

