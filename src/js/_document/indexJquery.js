

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
		const _colorArr = $('.mds__form-color-content > a, [change-color-js] > a');

		for(let el of _colorArr) {
			const _parentNode = ($(el).closest('[change-color-js]').length === 0) ? $(el).closest('.mds__form-color-content') : $(el).closest('[change-color-js]');

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
			}).on('change', (...args) => {
				let _color = args[0].toHEXA().toString();

				_parentNode.find('input[type="text"]').val(_color);
				_parentNode.find('span').css({
					'backgroundColor' : _color
				});
				_parentNode.css({
					'backgroundColor' : _color
				});

				if($('.tablet--menuItems').length > 0) {
					$('[changeColor-' + _parentNode.data('name') + '-js]').css({
						'color' : _color
					});
				}

				if($('.tablet--feedback').length > 0) {
					$('[changeColor-' + _parentNode.data('name') + '-js]').css({
						'color' : _color
					});
					$('[changeBgColor-' + _parentNode.data('bg') + '-js]').css({
						'background-color' : _color
					});
				}

				if($('.tablet--myorder').length > 0) {
					$('[changeColor-' + _parentNode.data('name') + '-js]').css({
						'color' : _color
					});
					$('[changeBgColor-' + _parentNode.data('bg') + '-js]').css({
						'background-color' : _color
					});
				}

				if($('.tablet--logout').length > 0) {
					$('.tablet--logout .tablet__content').css({
						'background-color' : _color
					});
				}

				if($('.tablet--general').length > 0) {
					if(_parentNode.data('name') === 'alert') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
					}

					if(_parentNode.data('name') === 'confirmation') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
					}

					if(_parentNode.data('name') === 'confirm') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
					}

					if(_parentNode.data('name') === 'border') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'border-color' : _color
						});
					}

					if(_parentNode.data('name') === 'highlight') {
						$('.is-choose[change-' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
					}
				}
			});
		}
	};

	const _additionMethodsUploadFiles = () => {
		const _additionalOption = $('[upload-additional-js]'),
			_colorPallet = $('[change-bg-js]').closest('.mds__upload-left'),
			_uploadBtn = $('[change-img-js]').closest('.mds__upload-right'),
			_previewNode = $('[upload-preview-js]'),
			_fixedImageBtn = $('[upload-imgFixed-js]'),
			_repeatImageBtn = $('[upload-imgRepeat-js]');

		const _tabletBG = $('[tablet-bg-js]');

		const _defaultOption = {
			fixed: {
				'background-repeat' : 'no-repeat',
				'background-position' : 'center',
				'background-size' : 'cover',
			},
			repeat: {
				'background-repeat' : 'repeat',
				'background-position' : 'top left',
				'background-size' : 'unset',
			},
			default: {
				'background-image' : 'url("")',
				'background-size' : 'cover',
				'background-repeat' : 'no-repeat',
				'background-position' : 'center',
			}
		};

		return {
			showAdditionalUploadImageOption () {
				console.log(`showAdditionalUploadImageOption`);

				_additionalOption.slideDown(400).addClass('is-show');
			},
			hideAdditionalUploadImageOption () {
				console.log(`hideAdditionalUploadImageOption`);

				_additionalOption.hide().removeClass('is-show');
			},
			addImageOnPreview (file) {
				console.log(`showImageOnPreview`);

				_previewNode.css({
					'background-image' : 'url("' + file + '")'
				}).find("> *").hide();

				_tabletBG.css({
					'background-image' : 'url("' + file + '")'
				});
			},
			removeImageOnPreview () {
				console.log(`hideImageOnPreview`);

				_previewNode.css(
					_defaultOption.default
				).find("> *").show();

				_tabletBG.css(_defaultOption.default);
			},
			showColorPalletUploadBtn () {
				console.log(`showColorPalletUploadBtn`);

				[_colorPallet, _uploadBtn].map((val, idx) => {
					val.css({
						'opacity' : '1'
					});
				});
			},
			hideColorPalletUploadBtn () {
				console.log(`hideColorPalletUploadBtn`);

				[_colorPallet, _uploadBtn].map((val, idx) => {
					val.css({
						'opacity' : '0'
					});
				});
			},
			fixedBGOption () {
				console.log(`fixedBGOption`);

				_fixedImageBtn.on('change', (ev) => {
					[_previewNode, _tabletBG].map((el,idx) => {
						el.css(_defaultOption.fixed);
					});
				});
			},
			repeatBGOption () {
				console.log(`repeatBGOption`);

				_repeatImageBtn.on('change', (ev) => {
					[_previewNode, _tabletBG].map((el,idx) => {
						el.css(_defaultOption.repeat);
					});
				});
			},
			resetBGOption () {
				console.log('resetBGOption');

				if(_repeatImageBtn.is(':checked')) {
					_fixedImageBtn.prop('checked', true).change();
				}
			},
			removeImage () {
				console.log(`removeImage`);

				$('[upload-remove-js]').on('click', (ev) => {
					this.hideAdditionalUploadImageOption();
					this.showColorPalletUploadBtn();
					this.removeImageOnPreview();
					this.resetBGOption();

					ev.stopPropagation();
				});
			}
		}
	};


	const initTPChangeImage = () => {
		_additionMethodsUploadFiles().removeImage();
		_additionMethodsUploadFiles().fixedBGOption();
		_additionMethodsUploadFiles().repeatBGOption();

		$('[change-img-js] input[type="file"]').on('change', (ev) => {
			console.log(`change upload`);

			const _self = $(ev.currentTarget);

			_additionMethodsUploadFiles().hideColorPalletUploadBtn();

			if(_self[0].files.length !== 0) {
				const reader = new FileReader();

				reader.onload = () => {
					const _file = reader.result;

					_additionMethodsUploadFiles().addImageOnPreview(_file);
				};

				_additionMethodsUploadFiles().showAdditionalUploadImageOption();

				reader.readAsDataURL(_self[0].files[0]);
			}

			_self.val('');
		});
	};


	const initTPChangeColor = () => {
		const _colorNodes = $('[change-bg-js] > a');

		for(let _el of _colorNodes) {
			const _parentNode = $(_el).closest('[change-bg-js]');

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
			}).on('change', (...args) => {
				let _color = args[0].toHEXA().toString();

				const _colorNodeView = _parentNode.find('> span'),
					_tabletBG = $('[tablet-bg-js]');

				_colorNodeView.css({
					'backgroundColor' : _color
				});

				// BACKGROUND COLOR
				if(_tabletBG.length > 0) {
					_tabletBG.css({
						'backgroundColor' : _color
					});
				}
			});

		}
	};


	const initTabletPreviewChangeBackgroundImage = () => {
		const _logoutBGNode =  $('.tablet--logout .tablet__content');

		$('[upload-image-js] input[type="file"]').on('change', (ev) => {

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
					node.append(_previewTemplate(ev.currentTarget.files[_idx].name));
				}
			};

			const _hideDetails = (node) => {
				node.prev().fadeIn(350);
				node.hide();
			};

			if(ev.currentTarget.files.length !== 0) {
				const reader = new FileReader(),
					_previewStatic = $(ev.currentTarget).closest('.mds__change-bg').find('[upload-previewFiles-js]');

				reader.onload = () => {
					_logoutBGNode.css({
						'background-image' : 'url("' + reader.result + '")'
					});
				};

				_showDetails(_previewStatic, ev.currentTarget.files.length);

				$('[upload-previewFiles-js]').on('click', '[upload-remove-js]', (ev) => {
					_hideDetails(_previewStatic);

					_logoutBGNode.css({
						'background-image' : 'url("")'
					});
				});

				reader.readAsDataURL(ev.currentTarget.files[0]);
			}

			$(ev.currentTarget).val('');
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
						<div class="mds__fileName-row">
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
					console.log(`static`);
					console.log(input);
					console.log(input.files);

					const _previewStatic = $(input).closest('.mds__screen').find('[upload-previewFiles-js]');

					if(input.files.length !== 0) {
						console.log(`if`);
						const reader = new FileReader();

						reader.onload = () => {
							console.log(reader.result);

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

					console.log(input);
					console.log(input.files);

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
					console.log(ev.currentTarget);
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
		const _rangeOption = (min, max, start) => {
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

		if($('#myOrderFSHeader').length > 0) {
			noUiSlider.create($('#myOrderFSHeader')[0], _rangeOption(26,34,30))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--myorder .tablet__heading p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#myOrderFSItemTitle').length > 0) {
			noUiSlider.create($('#myOrderFSItemTitle')[0], _rangeOption(18,26,22))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--myorder .tablet__list p, .tablet--myorder .tablet__new-body p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#myOrderFSItemCategory').length > 0) {
			noUiSlider.create($('#myOrderFSItemCategory')[0], _rangeOption(10,18,14))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--myorder .tablet__list i, .tablet--myorder .tablet__new-body i').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#myOrderFSInProcess').length > 0) {
			noUiSlider.create($('#myOrderFSInProcess')[0], _rangeOption(10,18,14))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--myorder .tablet__list--inprogress span').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#myOrderFSPending').length > 0) {
			noUiSlider.create($('#myOrderFSPending')[0], _rangeOption(10,18,14))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--myorder .tablet__list--pending span').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#myOrderFSServed').length > 0) {
			noUiSlider.create($('#myOrderFSServed')[0], _rangeOption(10,18,14))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--myorder .tablet__list--served span').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#feedbackFSItemTitle').length > 0) {
			noUiSlider.create($('#feedbackFSItemTitle')[0], _rangeOption(18,26,22))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--feedback .tablet__rating-top p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#feedbackFSItemCategory').length > 0) {
			noUiSlider.create($('#feedbackFSItemCategory')[0], _rangeOption(10,18,14))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--feedback .tablet__rating-top i').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#feedbackFSItemAssessment').length > 0) {
			noUiSlider.create($('#feedbackFSItemAssessment')[0], _rangeOption(10,18,14))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--feedback .tablet__rating span').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#feedbackFontsize').length > 0) {
			noUiSlider.create($('#feedbackFontsize')[0], _rangeOption(0,8,4)).on('slide', function (values, handle, unencoded, tap, positions) {});
		}

		if($('#itemDetailsFSTitle').length > 0) {
			noUiSlider.create($('#itemDetailsFSTitle')[0], _rangeOption(26,34,30))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--itemDetails .tablet__heading p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#itemDetailsFSDesc').length > 0) {
			noUiSlider.create($('#itemDetailsFSDesc')[0], _rangeOption(14,22,18))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--itemDetails .tablet__heading span, .tablet--itemDetails .tablet__desc p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#itemDetailsFSModTitle').length > 0) {
			noUiSlider.create($('#itemDetailsFSModTitle')[0], _rangeOption(26,34,30))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--itemDetails .tablet__sibtitle').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#itemDetailsFSModText').length > 0) {
			noUiSlider.create($('#itemDetailsFSModText')[0], _rangeOption(18,26,22))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--itemDetails .tablet__radio-group p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#menuItemsFSSectionHeader').length > 0) {
			noUiSlider.create($('#menuItemsFSSectionHeader')[0], _rangeOption(24,32,28))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--menuItems .tablet__subheader p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#menuItemsFSSubsection').length > 0) {
			noUiSlider.create($('#menuItemsFSSubsection')[0], _rangeOption(32,40,36))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--menuItems .tablet__subtitle').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#menuItemsFSItemTitleMenu').length > 0) {
			noUiSlider.create($('#menuItemsFSItemTitleMenu')[0], _rangeOption(18,26,22))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--menuItems .tablet__btn p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#mainMenuFSList').length > 0) {
			noUiSlider.create($('#mainMenuFSList')[0], _rangeOption(22,30,26))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--mainMenu .tablet__block-wrapper--list').find('p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#mainMenuFSThumbnail').length > 0) {
			noUiSlider.create($('#mainMenuFSThumbnail')[0], _rangeOption(14,22,18))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--mainMenu .tablet__block-wrapper--thumbnail').find('p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#mainMenuFSInformation').length > 0) {
			noUiSlider.create($('#mainMenuFSInformation')[0], _rangeOption(20,28,24))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--mainMenu .tablet__info-link').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#marginFeedback').length > 0) {
			noUiSlider.create($('#marginFeedback')[0], _rangeOption(0,200,180))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					const _feedbackBanner = $('.tablet--feedback .tablet__banner');

					_feedbackBanner.css({
						'height' : parseInt(unencoded[handle]).toFixed(0) + 'px'
					});

					if(parseInt(unencoded[handle]).toFixed(0) === '0') {
						_feedbackBanner.css({
							'border' : 'none'
						})
					} else {
						_feedbackBanner.css({
							'border-bottom' : '1px solid #1f2161'
						})
					}
				});
		}

		const _colorFontNodes = $('.mds__fontSize-row a');

		for(let _el of _colorFontNodes) {
			const _parentNode = $(_el).closest('.mds__fontSize-col');

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
			}).on('change', (...args) => {
				let _color = args[0].toHEXA().toString();

				_parentNode.css({
					'backgroundColor' : _color
				});

				if($('.tablet--menuItems').length > 0) {
					$('[' + _parentNode.data('name') + '-js]').css({
						'color' : _color
					});
				}

				if($('.tablet--itemDetails').length > 0) {
					$('[' + _parentNode.data('name') + '-js]').css({
						'color' : _color
					});
				}

				if($('.tablet--mainMenu').length > 0) {
					$('[' + _parentNode.data('name') + '-js]').css({
						'color' : _color
					});
				}
			});

		}
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
		const generateFontsOpt = (linkTagName, styleTagName, elemOpt, style, node) => {
			if(linkTagName.length !== 0) {

				linkTagName.attr('href', elemOpt.data('google-api'));
				styleTagName.text(style);

			} else {

				const _link = document.createElement('link'),
					_style = document.createElement('style');

				_link.href = elemOpt.data('google-api');

				_style.innerHTML = style;

				node[0].prepend(_link);
				node[0].prepend(_style);
			}
		};

		$('[select-font-js]').on('change', (ev) => {
			const _elem = $(ev.currentTarget),
				_elemOption = _elem.find('option:selected');

			const _tabletNode = $('#tablet'),
				_tabletLinkTag = _tabletNode.find('> link'),
				_tabletStyleTag = _tabletNode.find('> style');

			const _styleStr = '#tablet { font-family: "' + _elemOption.val() + '", sans-serif; }';

			generateFontsOpt(_tabletLinkTag, _tabletStyleTag, _elemOption, _styleStr, _tabletNode);
		});

		$('[select-font-numeric-js]').on('change', (ev) => {
			const _elem = $(ev.currentTarget),
				_elemOption = _elem.find('option:selected');

			const _tabletNode = $('[numeric-js]').parent(),
				_tabletLinkTag = _tabletNode.find('> link'),
				_tabletStyleTag = _tabletNode.find('> style');

			const _styleStr = 'span[numeric-js] { font-family: "' + _elemOption.val() + '", sans-serif !important; }';

			generateFontsOpt(_tabletLinkTag, _tabletStyleTag, _elemOption, _styleStr, _tabletNode);
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
		initTabletMenuItemsView();
		initTabletMainMenuBlock();
		initTabletPreview();
		initTabletPreviewSelectFonts();
		initTabletPreviewSelectCurrency();
		initTabletPreviewChangeBackgroundImage();

		initTPChangeColor();
		initTPChangeImage();
		// ==========================================
  };
  initJquery();
});

