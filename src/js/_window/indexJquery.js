

/**
 * @description Window on load.
 */
$(window).on("load", (ev) => {
	initHeaderFixed();
	initScalableBlock('#tablet .tablet__wrapper');
});


/**
 * @description Window on resize.
 */
$(window).on("resize", (ev) => {
	initScalableBlock('#tablet .tablet__wrapper');
});


/**
 * @description Window on scroll.
 */
$(window).on("scroll", (ev) => {
	initHeaderFixed();
});

