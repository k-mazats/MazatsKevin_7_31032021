document.addEventListener("DOMContentLoaded", (event) => {
	const dropdowns = document.getElementsByClassName("search__filter-list");
	for (let dropdown of dropdowns) {
		let dropdownItemsCount = dropdown.childElementCount;
		console.log(dropdownItemsCount);
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
		console.log(dropdownColCount);
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
});
