import { Dropdowns } from "./src/classes/Dropdowns.js";
import { Cards } from "./src/classes/Cards.js";
import { SearchEngine } from "./src/classes/SearchEngine.js";
import recipes from "./src/datas/recipes.js";

document.addEventListener("DOMContentLoaded", () => {
	Dropdowns.watchDropdowns();
	Cards.createAllCards(recipes);
    Dropdowns.generateOptions(recipes);
	const searchEngine = new SearchEngine(recipes);
	searchEngine.watchSearches();
});
