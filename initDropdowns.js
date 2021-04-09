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
const watchDropdowns = () => {
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
};
const dropdownsSize = () => {
	const dropdowns = document.getElementsByClassName("search__filter-list");
	for (let dropdown of dropdowns) {
		let dropdownItemsCount = dropdown.childElementCount;
		let dropdownColCount;
		if (dropdownItemsCount <= 30) {
			if (dropdownItemsCount % 10 === 0) {
				dropdownColCount = dropdownItemsCount / 10;
			} else if (dropdownItemsCount < 10) {
				dropdownColCount = 1;
			} else {
				dropdownColCount = Math.ceil(dropdownItemsCount / 10);
			}
		} else {
			dropdownColCount = 3;
		}
		let dropdownWidth = dropdownColCount * 13.938;
		dropdown.parentElement.parentElement.parentElement.style.maxWidth = `${dropdownWidth}rem`;
		if (dropdownItemsCount > 30) {
			let dropdownRowCount = Math.ceil(dropdownItemsCount / 3);
			console.log(dropdownRowCount);
			dropdown.style.height = `${dropdownRowCount * 3}rem`;
		} else if (dropdownItemsCount >= 10) {
			dropdown.style.height = "30rem";
		} else {
			dropdown.style.height = `${dropdownItemsCount * 3}rem`;
		}
	}
};
const initDropdowns = () => {
	dropdownsSize();
	watchDropdowns();
};
export default initDropdowns;