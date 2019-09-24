

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
	/**
	 * @name initBodyClick
	 */
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


	/**
	 * @name initHeaderDropDownCollapse
	 *
	 * @description
	 */
	const initHeaderDropDownCollapse = () => {
		$('.header__nav-drop--collapse-head').on('click', (ev) => {
			const _btn = $(ev.currentTarget),
				_parent = _btn.closest('.header__nav-drop--collapse');

			_parent.toggleClass('is-open');
			_btn.siblings('.header__nav-drop--collapse-body').slideToggle(400);
		});
	};


	/**
	 * @name initSidebarCollapse
	 *
	 * @description show/hide left menu
	 */
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


	/**
	 * @name initDropDown
	 */
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


	/**
	 * @name initTPChooseColor
	 *
	 * @description change color or background-color in tablet preview elements
	 */
	const initTPChooseColor = () => {
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
					if(_parentNode.data('name') === 'fontNumeric') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}
					if(_parentNode.data('name') === 'fontText') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}

					if(_parentNode.data('name') === 'navText') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}
					if(_parentNode.data('name') === 'navBg') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
					}
					if(_parentNode.data('name') === 'navBorder') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'border-color' : _color
						});
					}

					if(_parentNode.data('name') === 'alert') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
						$('[' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}
					if(_parentNode.data('name') === 'alertTxt') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}

					if(_parentNode.data('name') === 'confirmation') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
						$('[' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}
					if(_parentNode.data('name') === 'confirmationTxt') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}

					if(_parentNode.data('name') === 'confirm') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
						$('[' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}
					if(_parentNode.data('name') === 'confirmTxt') {
						$('[' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}

					if(_parentNode.data('name') === 'background') {
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

					if(_parentNode.data('name') === 'neutral') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
					}
					if(_parentNode.data('name') === 'neutral1') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'background-color' : _color
						});
					}
					if(_parentNode.data('name') === 'neutral2') {
						$('[change-' + _parentNode.data('name') + '-js]').css({
							'color' : _color
						});
					}
				}
			});
		}
	};


	function checkExtensionLogo() {
		let file = document.querySelector("#fUpload");
		if ( /\.(png)$/i.test(file.files[0].name) === false ) { alert("not an *.PNG!"); }
	}

	const checkExtensionBG = () => {
		let file = document.querySelector("#fUpload");
		if ( /\.(jpe?g)$/i.test(file.files[0].name) === false ) { alert("not an *.JPG!"); }
	};


	/**
	 * @name _additionMethodsUploadFiles
	 *
	 * @description additional methods for change background image on tablet preview.
	 *
	 * @param _prNode
	 * @returns {{removeImageOnPreview(*): void, repeatBGOption(): void, removeImage(): void, showColorPalletUploadBtn(*): void, addImageOnPreviewLogo(*=): void, resetBGOption(): void, showAdditionalUploadImageOption(*): void, addImageOnPreview(*): void, hideAdditionalUploadImageOption(*): void, hideColorPalletUploadBtn(*): void, fixedBGOption(): void}}
	 * @private
	 */
	const _additionMethodsUploadFiles = (_prNode) => {
		const
			_colorPallet = _prNode.find('[change-bg-js]').closest('.mds__upload-left'),
			_uploadBtn = _prNode.find('[change-img-js]').closest('.mds__upload-right'),
			_previewNode = _prNode.find('[upload-preview-js]'),
			_fixedImageBtn = _prNode.find('[upload-imgFixed-js]'),
			_repeatImageBtn = _prNode.find('[upload-imgRepeat-js]');

		const _tabletBG = $('[tablet-bg-js]'),
			_tabletLogo = $('[introScreen-logo-js]');

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
			showAdditionalUploadImageOption (parentNode) {
				parentNode.closest(_prNode).find('[upload-additional-js]').show();
			},
			hideAdditionalUploadImageOption (parentNode) {
				parentNode.closest(_prNode).find('[upload-additional-js]').hide();
			},
			addImageOnPreview (file) {
				_previewNode.css({
					'background-image' : 'url("' + file + '")'
				}).find("> *").hide();
				_tabletBG.css({
					'background-image' : 'url("' + file + '")'
				});
			},
			addImageOnPreviewLogo (file) {
				_previewNode.css({
					'background-image' : 'url("' + file + '")'
				}).find("> *").hide();
				_tabletLogo.attr('src', file);
			},
			removeImageOnPreview (parentNode) {
				parentNode.closest(_prNode).find('[upload-preview-js]').css(
					_defaultOption.default
				).find("> *").show();
				_tabletBG.css(_defaultOption.default);
				_tabletLogo.attr('src', '');
			},
			showColorPalletUploadBtn (parentNode) {
				[_colorPallet, _uploadBtn, parentNode.closest(_prNode).find('[upload-mainPallet-js]')].map((val, idx) => {
					val.css({
						'opacity' : '1',
						'visibility' : 'visible',
						'height' : 'auto'
					});
				});
			},
			hideColorPalletUploadBtn (parentNode) {
				[_colorPallet, _uploadBtn, parentNode.closest(_prNode).find('[upload-mainPallet-js]')].map((val, idx) => {
					val.css({
						'opacity' : '0',
						'visibility' : 'hidden',
						'height' : '0'
					});
				});
			},
			fixedBGOption () {
				_fixedImageBtn.on('change', (ev) => {
					[_previewNode, _tabletBG].map((el,idx) => {
						el.css(_defaultOption.fixed);
					});
				});
			},
			repeatBGOption () {
				_repeatImageBtn.on('change', (ev) => {
					[_previewNode, _tabletBG].map((el,idx) => {
						el.css(_defaultOption.repeat);
					});
				});
			},
			resetBGOption () {
				if(_repeatImageBtn.is(':checked')) {
					_fixedImageBtn.prop('checked', true).change();
				}
			},
			removeImage () {
				$(document).on('click', '[upload-remove-js]', (ev) => {
					const _el = $(ev.currentTarget);

					this.hideAdditionalUploadImageOption(_el);
					this.showColorPalletUploadBtn(_el);
					this.removeImageOnPreview(_el);
					this.resetBGOption();

					ev.stopPropagation();
					ev.preventDefault();
				});
			}
		}
	};


	/**
	 * @name initTPChangeImage
	 *
	 * @description change background image for pablet preview.
	 */
	const initTPChangeImage = () => {
		$('[change-img-js] input[type="file"]').on('change', (ev) => {
			const _self = $(ev.currentTarget),
				_fileExt = (/[.]/.exec(_self[0].value)) ? /[^.]+$/.exec(_self[0].value)[0] : undefined,
				_btnOpt = _self.data('opt'),
				_parentNode = _self.closest('[upload-file-js]');

			_additionMethodsUploadFiles(_parentNode).removeImage();
			_additionMethodsUploadFiles(_parentNode).fixedBGOption();
			_additionMethodsUploadFiles(_parentNode).repeatBGOption();

			if(_self[0].files.length !== 0) {

				const reader = new FileReader();

				reader.onload = () => {
					const _file = reader.result;

					if(_btnOpt === 'logo') {
						if(_fileExt.toLowerCase().trim() !== "png") {
							alert("not an *.PNG!");
						} else {
							_additionMethodsUploadFiles(_parentNode).addImageOnPreviewLogo(_file);
							_additionMethodsUploadFiles(_parentNode).hideColorPalletUploadBtn(_self);
							_additionMethodsUploadFiles(_parentNode).showAdditionalUploadImageOption(_self);
						}
					} else {

						switch (_fileExt.toLowerCase().trim()) {
							case "jpg":
							case "jpeg":

								_additionMethodsUploadFiles(_parentNode).addImageOnPreview(_file);
								_additionMethodsUploadFiles(_parentNode).hideColorPalletUploadBtn(_self);
								_additionMethodsUploadFiles(_parentNode).showAdditionalUploadImageOption(_self);

								break;
							default:
								alert("not an *.JPG or *.JPEG!");
								break;
						}
					}
				};

				reader.readAsDataURL(_self[0].files[0]);
			}

			_self.val('');
		});
	};


	/**
	 * @name initTPChangeColor
	 *
	 * @description change backgrond color for tablet preview.
	 */
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


	/**
	 * @name initTPVideoPreview
	 *
	 * @description choose video file for tablet intro screen.
	 */
	const initTPVideoPreviewChooseMode = () => {
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

			const videoContainer = $('[introScreen-video-js]');

			const selectionScreenForPreview = (fadeDuration) => {
				$('[choose-screen-btn-js]').removeClass('is-error is-choose');
				$(ev.currentTarget).addClass('is-choose');

				$('[tablet-introScreen-js] [introScreen-container-js]').hide();
				_tabletContainer.css({
					'opacity':1,
					'visibility':'visible'
				}).fadeIn(fadeDuration);
			};

			const readFileURL = (input) => {
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
					node.find('> *').remove();
				};

				const _parentNode = $(input).closest('.mds__screen'),
					_previewVideo = _parentNode.find('[upload-previewFiles-js]');

				if (input.files.length !== 0) {
					const reader = new FileReader(),
						_vd = $(videoContainer).find('video');

					reader.onload = () => {
						$(_vd).map((idx, val) => {
							$(val).find('source').attr('src', reader.result);
							val.load();
						});
					};

					_showDetails(_previewVideo, input.files.length);

					$('[upload-preview-video-js]').on('click', '[upload-remove-js]', (ev) => {
						_hideDetails(_previewVideo);

						$(_vd).map((idx, val) => {
							$(val).find('source').attr('src', '');
							val.load();
						});
					});

					reader.readAsDataURL(input.files[0]);
				}
			};


			if($(ev.target).closest('.mds__upload-row-wrapper').length !== 0) {
				// REMOVE BUTTON
				return false;
			}
			else if($(ev.target).closest('[upload-video-js]').length !== 0) {
				// VIDEO PREVIEW
				$('[upload-video-js] input[type="file"]').on('change', (ev) => {
					readFileURL(ev.currentTarget);
					$(ev.currentTarget).val('');
				});

				selectionScreenForPreview(0);
			}
			else {
				// SCREEN SELECTION FOR PREVIEW CHANGES
				selectionScreenForPreview(0);
			}
		});
	};


	/**
	 * @name initTPSlideshow
	 *
	 * @description upload images for tablet preview slideshow.
	 */
	const initTPSlideshow = () => {
		const _previewSlideSmall = $('.mds__wrapper-preview .swiper-slide'),
			_previewSlideLarge = $('.mds__wrapper-right .swiper-slide');

		$('[upload-slideshow-js]').on('click', (ev) => {
			$('.mds__screen--slideshow').slideToggle(350);
		});

		$('[upload-smallPreviewClear-js]').on('click', (ev) => {
			const _el = $(ev.currentTarget),
				_parentNode = _el.parent(),
				_elID = _parentNode.data('id');

			_parentNode.css({
				'background-image' : 'url("")'
			});
			$(_previewSlideSmall[_elID]).css({
				'background-image' : 'url("")'
			});
			$(_previewSlideLarge[_elID]).css({
				'background-image' : 'url("")'
			});

			_parentNode.removeClass('is-add');
			_parentNode.find('input[type="file"]').show();
		});

		$('[upload-smallPreviewAdd-js] input[type="file"]').on('change', (ev) => {
			const _self = $(ev.currentTarget),
				_fileExt = (/[.]/.exec(_self[0].value)) ? /[^.]+$/.exec(_self[0].value)[0] : undefined,
				_parentNode = _self.parent(),
				_elID = _parentNode.data('id');

			if(_self[0].files.length !== 0) {
				const reader = new FileReader();

				reader.onload = () => {
					switch (_fileExt.toLowerCase().trim()) {
						case "jpg":
						case "jpeg":

							_parentNode.css({
								'background-image' : 'url("' + reader.result + '")'
							});
							$(_previewSlideSmall[_elID]).css({
								'background-image' : 'url("' + reader.result + '")'
							});
							$(_previewSlideLarge[_elID]).css({
								'background-image' : 'url("' + reader.result + '")'
							});

							_parentNode.addClass('is-add');
							_self.hide();

							break;
						default:
							alert("not an *.JPG or *.JPEG!");
							break;
					}
				};

				reader.readAsDataURL(_self[0].files[0]);
			}

			_self.val('');
		});
	};


	/**
	 * @name initTPMenuLayout
	 *
	 * @description change view for blocks, from list to thumb
	 */
	const initTPMenuLayout = () => {
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


	/**
	 * @name initTPRangeChangeSize
	 *
	 * @description change font size, indent and color for font-size
	 */
	const initTPRangeChangeSize = () => {
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

		if($('#menuItemsFSPrice').length > 0) {
			noUiSlider.create($('#menuItemsFSPrice')[0], _rangeOption(18,26,22))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--menuItems .tablet__btn span').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
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

		if($('#menuItemsFSItemTitleMenuThb').length > 0) {
			noUiSlider.create($('#menuItemsFSItemTitleMenuThb')[0], _rangeOption(14,22,18))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--menuItems .tablet__block p').css({
						'font-size' : (parseInt(unencoded[handle]).toFixed(0)) + 'px'
					});
				});
		}

		if($('#menuItemsFSPriceThb').length > 0) {
			noUiSlider.create($('#menuItemsFSPriceThb')[0], _rangeOption(14,22,18))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					$('.tablet--menuItems .tablet__block p i').css({
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
			noUiSlider.create($('#marginFeedback')[0], _rangeOption(0,200,0))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					const _feedbackBanner = $('.tablet--feedback .tablet__banner');

					_feedbackBanner.css({
						'height' : parseInt(unencoded[handle]).toFixed(0) + 'px'
					});
				});
		}

		if($('#marginSubsection').length > 0) {
			noUiSlider.create($('#marginSubsection')[0], _rangeOption(0,150,60))
				.on('slide', function (values, handle, unencoded, tap, positions) {
					const _feedbackBanner = $('.tablet--menuItems .tablet__subtitle');

					_feedbackBanner.css({
						'margin-top' : parseInt(unencoded[handle]).toFixed(0) + 'px',
						'margin-bottom' : parseInt(unencoded[handle]).toFixed(0) + 'px'
					});
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


	/**
	 * @name initTPTabletRange
	 *
	 * @description init item details range
	 */
	const initTPTabletRange = () => {
		const _input = $('.tablet--itemDetails .tablet__range input');

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


	/**
	 * @name initTP
	 *
	 * @description show tablet preview for small resolution
	 */
	const initTP = () => {
		$('.mds__wrapper-preview a, .header__preview').on('click', () => {
			$('html, body').addClass('is-hideScroll');
			$('.mds__wrapper-right').addClass('is-show');
		});

		$('.mds__wrapper-close').on('click', () => {
			$('html, body').removeClass('is-hideScroll');
			$('.mds__wrapper-right').removeClass('is-show');
		});
	};


	/**
	 * @name initTPSelectFontFamily
	 *
	 * @description change font-family for main text and numeric
	 */
	const initTPSelectFontFamily = () => {
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


	/**
	 * @name initTPSelectPage
	 *
	 * @description change tablet preview page.
	 */
	const initTPSelectPage = () => {
		$('[select-tp-page-js]').on('change', (ev) => {
			window.location.href = '/' + $(ev.currentTarget).find('option:selected').val();
		});
	};

	/**
	 * @name initTPSelectCurrency
	 *
	 * @description select currency.
	 */
	const initTPSelectCurrency = () => {
		$('[select-currency-js]').on('change', (ev) => {
			$('[currency-sign-js]').text($(ev.currentTarget).find('option:selected').val());
		});
	};


	/**
	 * @name initTPSelectPriceFormat
	 *
	 * @description select price format.
	 */
	const initTPSelectPriceFormat = () => {
		$('[select-currencyFormat-js]').on('change', (ev) => {
			const _format = $(ev.currentTarget).find('option:selected').val();

			let _priceArr = [];

			$('[numeric-js]').map((idx, val) => {
				_priceArr.push($(val).data('price'));
			});

			if(_format === '$0') {
				_priceArr.map((val, idx) => {
					const _num = $('[numeric-js]')[idx];

					_num.innerHTML = '<span currency-sign-js>' + $(_num).parent().find('[currency-sign-js]').text() + '</span>' + parseInt(val).toFixed(0);
				});
			}
			else if(_format === '$0.00') {
				_priceArr.map((val, idx) => {
					const _num = $('[numeric-js]')[idx];

					_num.innerHTML = '<span currency-sign-js>' + $(_num).parent().find('[currency-sign-js]').text() + '</span>' + val;
				});
			}
			else if(_format === '0$') {
				_priceArr.map((val, idx) => {
					const _num = $('[numeric-js]')[idx];

					_num.innerHTML = parseInt(val).toFixed(0) + '<span currency-sign-js>' + $(_num).parent().find('[currency-sign-js]').text() + '</span>';
				});
			}
			else if(_format === '0.00$') {
				_priceArr.map((val, idx) => {
					const _num = $('[numeric-js]')[idx];

					_num.innerHTML = val + '<span currency-sign-js>' + $(_num).parent().find('[currency-sign-js]').text() + '</span>';
				});
			}
		});
	};


	/**
	 * @name initTPNavigationColorIcon
	 *
	 * @description change navigation icon color - only two mode: whide & black
	 */
	const initTPNavigationColorIcon = () => {
		$('[radioColorIcon-js]').on('change', (ev) => {
			const _el = $(ev.currentTarget),
				_elVal = _el.val();

			$('[navIcon-js]').css({
				'color' : _elVal
			});
		});
	};


	const initCompanyEditInfo = () => {
		$('.company__edit').on('click', (ev) => {
			const _parentNode = $(ev.currentTarget).closest('.company__row');

			$(ev.currentTarget).closest('.company__header').addClass('is-update');

			_parentNode.find('.c-form__field--input.is-disabled, .c-form__field-cover.is-disabled').removeClass('is-disabled');
			$.each(_parentNode.find('input[type="text"]'), (idx, val) => {
				$(val).attr('data-val', $(val).val());
			});
			_parentNode.find('input[type="text"]').removeAttr('disabled');
		});
		$('.company__cancel').on('click', (ev) => {
			const _parentNode = $(ev.currentTarget).closest('.company__row');

			$(ev.currentTarget).closest('.company__header').removeClass('is-update');

			_parentNode.find('.c-form__field--input, .c-form__field-cover').addClass('is-disabled');
			$.each(_parentNode.find('input[type="text"]'), (idx, val) => {
				$(val).val($(val).data('val'));
			});
			_parentNode.find('input[type="text"]').attr('disabled','disabled');
			_parentNode.find('select').prop('selectedIndex', 0);
		});
		$('.company__save').on('click', (ev) => {
			const _parentNode = $(ev.currentTarget).closest('.company__row');

			$(ev.currentTarget).closest('.company__header').removeClass('is-update');

			_parentNode.find('.c-form__field--input, .c-form__field-cover').addClass('is-disabled');
			_parentNode.find('input[type="text"]').attr('disabled','disabled');
		});
	};


	const initItemListCollapse = () => {
		$('.itemList__box-head').on('click', (ev) => {
			const _parent = $(ev.currentTarget).closest('.itemList__box'),
				_collapseBody = _parent.find('.itemList__box-body');

			_parent.toggleClass('is-collapse');
			_collapseBody.slideToggle(250);
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
		initInputFocus();
		// ==========================================

		// callback
		initDropDown();
		initBodyClick();
		initSidebarCollapse();
		initHeaderDropDownCollapse();

		initTP();
		initTPSlideshow();
		initTPMenuLayout();
		initTPSelectPage();
		initTPChooseColor();
		initTPTabletRange();
		initTPChangeColor();
		initTPChangeImage();
		initTPSelectCurrency();
		initTPRangeChangeSize();
		initTPSelectFontFamily();
		initTPSelectPriceFormat();
		initTPNavigationColorIcon();
		initTPVideoPreviewChooseMode();

		initCompanyEditInfo();
		initItemListCollapse();
		// ==========================================
  };
  initJquery();
});

