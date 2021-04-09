import recipes from "./recipes.js";
import initDropdowns from "./initDropdowns.js";
import initCards from "./initCards.js";

document.addEventListener("DOMContentLoaded", () => {
    const allRecipes = recipes;
    let filteredRecipes = [...allRecipes];
	initDropdowns();
	initCards(filteredRecipes);
});
