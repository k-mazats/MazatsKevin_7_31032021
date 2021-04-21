import recipes from "./recipes.js";
import initDropdowns from "./initDropdowns.js";
import fillData from "./fillData.js";
import multiSearch from "./search.js";
let newPass = true;
const allRecipes = [...recipes];
let filteredRecipes = [...allRecipes];
const mainInput = document.getElementById("mainSearch");
const dropDownsInputs = documents.getElementsByClassName(
	"search__filter-input"
);
let searches = [];
mainInput.addEventListener("input", () => {
	newPass = true;
	searches = [];
	filteredRecipes = [...allRecipes];
	let mainSearch = ["main", mainInput.value];
	searches.push(mainSearch);
	let results = multiSearch(filteredRecipes, [mainSearch], newPass);
	if (results.length) {
		filteredRecipes = results;
		fillData(filteredRecipes);
		initDropdowns();
	} else {
		//print no result
	}
});
dropDownsInputs.addEventListener("input", (e) => {
	if (!searches.length) {
		newPass = true;
		filteredRecipes = [...allRecipes];
	} else {
		newpass = false;
	}

	
	let dropdownSearch = [e.currentTarget.getAttribute("data-type"), mainInput.value];
	searches.push(mainSearch);
	let results = multiSearch(filteredRecipes, [mainSearch], newPass);
	if (results.length) {
		filteredRecipes = results;
		fillData(filteredRecipes);
		initDropdowns();
	} else {
		//print no result
	}
});

document.addEventListener("DOMContentLoaded", () => {
	fillData(filteredRecipes);
	initDropdowns();
});
