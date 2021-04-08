const closeAllDropdowns = () => {
	let dropdownsClosed = document.querySelectorAll(
		".search__category-wrapper:not(.search__category-wrapper--open)"
	);
	for (let dropdown of dropdownsClosed) {
		dropdown.style.display = "block";
	}
	let dropdownsOpen = document.getElementsByClassName(
		"search__category-wrapper--open"
	);
	for (let dropdown of dropdownsOpen) {
		dropdown.style.display = "none";
	}
};
document.addEventListener("DOMContentLoaded", (event) => {
	const dropdowns = document.getElementsByClassName("search__category-btn");
	for (let dropdown of dropdowns) {
		dropdown.addEventListener("click", (event) => {
			closeAllDropdowns();
			event.currentTarget.parentElement.style.display = "none";
			event.currentTarget.parentElement.nextElementSibling.style.display =
				"block";
		});

		dropdown.parentElement.nextElementSibling.children[0].children[0].children[1].addEventListener(
			"click",
			(event) => {
				event.currentTarget.parentElement.parentElement.parentElement.style.display =
					"none";
				event.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.style.display =
					"block";
				("block");
			}
		);
	}
});
