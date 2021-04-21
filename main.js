import { Dropdowns } from "./src/classes/Dropdowns.js";
import { Cards } from "./src/classes/Cards.js";
import recipes from "./src/datas/recipes.js";

document.addEventListener("DOMContentLoaded", () => {
	Dropdowns.watchDropdowns();
	Cards.createAllCards(recipes);
    Dropdowns.generateOptions(recipes);
});
