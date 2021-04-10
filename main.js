import recipes from "./recipes.js";
import initDropdowns from "./initDropdowns.js";
import fillData from "./fillData.js";

document.addEventListener("DOMContentLoaded", () => {
    const allRecipes = recipes;
    let filteredRecipes = [...allRecipes];
    fillData(filteredRecipes);
	initDropdowns();
	
});
