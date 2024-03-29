

/**
 * @name initInputFocus
 *
 * @description
 */
const initInputFocus = () => {
	const inputElem = $("[input-js], [textarea-js]");

	$.each(inputElem, (idx, val) => {
		let curElem = $(val),
			curElemVal = $(val).val().trim();

		if(curElemVal !== "") {
			curElem.closest(".c-form__field").addClass("is-focus");
		}
	});

	/**
	 * @description
	 */
	inputElem.on("focus", (e) => {
		let curElem = $(e.target);

		curElem.closest(".c-form__field").addClass("is-focus");
	});

	/**
	 * @description
	 */
	inputElem.on("blur", (e) => {
		let curElem = $(e.target),
			curElemVal = curElem.val().trim();

		if(curElemVal === "") {
			curElem.closest(".c-form__field").removeClass("is-focus");
		}
	});
};
