

/**
 * @description Window on load.
 */
$(window).on("load", (ev) => {
	initHeaderFixed();
	initScalableBlock('.mds__wrapper-right #tablet');
});


/**
 * @description Window on resize.
 */
$(window).on("resize", (ev) => {
	initScalableBlock('.mds__wrapper-right #tablet');
});


/**
 * @description Window on scroll.
 */
$(window).on("scroll", (ev) => {
	initHeaderFixed();
});

