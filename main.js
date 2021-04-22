import { Dropdowns } from "./src/classes/Dropdowns.js";
import { Cards } from "./src/classes/Cards.js";
import { SearchEngine } from "./src/classes/SearchEngine.js";
import recipes from "./src/datas/recipes.js";

document.addEventListener("DOMContentLoaded", () => {
	;
	Cards.createAllCards(recipes);
	const searchEngine = new SearchEngine(recipes);
	const dropdowns = new Dropdowns(searchEngine);
	searchEngine.dropdowns = dropdowns;
	dropdowns.watchDropdowns();
	dropdowns.generateOptions(recipes);
	searchEngine.watchSearches();
});
