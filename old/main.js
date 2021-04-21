import recipes from "./recipes.js";
import initDropdowns from "./initDropdowns.js";
import { fillData, fillDropdowns, fillCards } from "./fillData.js";
import { createTag } from "./searchTags.js";

import multiSearch from "./search.js";

let newPass = true;
const allRecipes = [...recipes];
let filteredRecipes = [...allRecipes];
const mainInput = document.getElementById("mainSearch");

let searches = [];

document.addEventListener("DOMContentLoaded", () => {
	fillData(filteredRecipes);
	initDropdowns();
	mainInput.addEventListener("input", () => {
		newPass = true;
		searches = [];
		filteredRecipes = [...allRecipes];
		let mainSearch = ["main", mainInput.value];
		searches.push(mainSearch);
		let results = multiSearch(filteredRecipes, searches, newPass);
		if (results.length) {
			filteredRecipes = results;
			fillData(filteredRecipes);
			watchDropdownsClick();
			initDropdowns();
		} else {
			//print no result
		}
	});
	watchDropdownsClick();
	watchDropdownsInput();
});
const clickHandler = (e) => {
	e.preventDefault();
	let results = [];
	if (!searches.length) {
		newPass = true;
		filteredRecipes = [...allRecipes];
	} else {
		newPass = false;
	}

	let dropdownSearch = [e.target.getAttribute("data-type"), e.target.innerText];
	searches.push(dropdownSearch);
	results = multiSearch(filteredRecipes, searches, newPass);

	if (results.length) {
		filteredRecipes = results;
		fillData(filteredRecipes);
		initDropdowns();
		createTag(dropdownSearch);
		watchDropdownsClick();
		watchDropdownsInput();
	} else {
		//print no result
	}
};
const watchDropdownsClick = () => {
	const dropDownsValues = document.getElementsByClassName(
		"search__filter-link"
	);
	for (let dropDown of dropDownsValues) {
		dropDown.removeEventListener("click", clickHandler);
		dropDown.addEventListener("click", clickHandler);
	}
};
const watchDropdownsInput = () => {
	const dropDownsInputs = document.getElementsByClassName(
		"search__filter-input"
	);
	for (let dropDown of dropDownsInputs) {
		dropDown.addEventListener("input", (e) => {
			let listItems = [];
			let category = "";
			if (dropDown.classList.contains("bg-ingredient")) {
				category = "bg-ingredient";
			} else if (dropDown.classList.contains("bg-appliance")) {
				category = "bg-appliance";
			} else if (dropDown.classList.contains("bg-ustensil")) {
				category = "bg-ustensil";
			}
			listItems = document.querySelectorAll(`.${category}.search__filter-itm`);
			for(let item of listItems) {
				if (
					item.children[0].innerText.toLowerCase().indexOf(
						e.target.value.toLowerCase()
					) === -1
				) {
					item.remove();
				}
			}
		});
	}
};
