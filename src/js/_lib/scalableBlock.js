

/**
 * @name initScalableBlock
 *
 * @description
 */
const initScalableBlock = (element) => {
	if($(window).width() < 768) {
		if (element && $(element).length){
			const $el = $(element),
				$wrapper = $el.parent();

			const starterData = {
				size: {
					width: $wrapper.width(),
					height: $wrapper.height()
				}
			};

			let scale = Math.min(
				starterData.size.width / $el.outerWidth()
			);

			if (scale > 1){
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
