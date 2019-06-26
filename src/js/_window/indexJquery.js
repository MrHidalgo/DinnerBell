

/**
 * @description Window on load.
 */
$(window).on("load", (ev) => {
	initHeaderFixed();
	initScalableBlock('#tablet');
});


/**
 * @description Window on resize.
 */
$(window).on("resize", (ev) => {
	initScalableBlock('#tablet');
});


/**
 * @description Window on scroll.
 */
$(window).on("scroll", (ev) => {
	initHeaderFixed();
});

