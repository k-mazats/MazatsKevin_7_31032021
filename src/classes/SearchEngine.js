import { Dropdowns } from "./Dropdowns.js";
import { Cards } from "./Cards.js";
export class SearchEngine {
	constructor(recipes) {
		this.allRecipes = recipes;
		this.filteredRecipes = recipes;
		this.searches = [];
		this.newPass = true;
		console.time("dico")
		this.createDictionnary(recipes)
		console.timeEnd("dico")
		console.log(this.dictionnary)
	}
	createDictionnary(recipes){
		const recipesDict = {
			recipesMain: {},
			recipesIngredients: {},
			recipesUstensils: {},
			recipesAppliances: {},
		};
		for (let recipe in recipes) {
			let recipeIngredientsArray = [];
			let recipeUstensilsArray = [];
			for (let ingredient of recipes[recipe].ingredients) {
				recipeIngredientsArray.push(ingredient.ingredient);
			}
			for (let ustensil of recipes[recipe].ustensils) {
				recipeUstensilsArray.push(ustensil);
			}
			let recipeMain =
				recipes[recipe].name +
				" " +
				recipes[recipe].description +
				" " +
				recipeIngredientsArray.join(" ");
			let recipeMainArray = recipeMain
				.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
				.split(" ");
			let recipeMainFilteredArray = recipeMainArray.filter(
				(word) => word.length >= 3
			);
			for (let keyword of recipeMainFilteredArray) {
				let keywordVariations = [];
				for (let i = 0; i <= keyword.length; i++) {
					for (let j = 3; j <= keyword.length; j++) {
						keywordVariations.push(keyword.substring(i, j));
					}
				}
				let finalKeywordVariations = keywordVariations.filter(
					(word) => word.length >= 3
				);
				for (let keywordVariation of finalKeywordVariations) {
					if (
						!recipesDict.recipesMain.hasOwnProperty(
							keywordVariation.toLowerCase()
						)
					) {
						recipesDict.recipesMain[keywordVariation.toLowerCase()] = [];
					}
					if (
						!recipesDict.recipesMain[keywordVariation.toLowerCase()].includes(
							parseInt(recipe)
						)
					) {
						recipesDict.recipesMain[keywordVariation.toLowerCase()].push(
							parseInt(recipe)
						);
					}
				}
			}
			for (let keyword of recipeUstensilsArray) {
				if (
					!recipesDict.recipesUstensils.hasOwnProperty(keyword.toLowerCase())
				) {
					recipesDict.recipesUstensils[keyword.toLowerCase()] = [];
				}
				if (
					!recipesDict.recipesUstensils[keyword.toLowerCase()].includes(
						parseInt(recipe)
					)
				) {
					recipesDict.recipesUstensils[keyword.toLowerCase()].push(
						parseInt(recipe)
					);
				}
			}

			if (
				!recipesDict.recipesAppliances.hasOwnProperty(
					recipes[recipe].appliance.toLowerCase()
				)
			) {
				recipesDict.recipesAppliances[
					recipes[recipe].appliance.toLowerCase()
				] = [];
			}
			if (
				!recipesDict.recipesAppliances[
					recipes[recipe].appliance.toLowerCase()
				].includes(parseInt(recipe))
			) {
				recipesDict.recipesAppliances[
					recipes[recipe].appliance.toLowerCase()
				].push(parseInt(recipe));
			}

			for (let keyword of recipeIngredientsArray) {
				if (
					!recipesDict.recipesIngredients.hasOwnProperty(keyword.toLowerCase())
				) {
					recipesDict.recipesIngredients[keyword.toLowerCase()] = [];
				}
				if (
					!recipesDict.recipesIngredients[keyword.toLowerCase()].includes(
						parseInt(recipe)
					)
				) {
					recipesDict.recipesIngredients[keyword.toLowerCase()].push(
						parseInt(recipe)
					);
				}
			}
		}
		this.dictionnary = recipesDict;
	}
	searchRecipes(type, inputValue, array) {
		let targetProps = [];
		type === "main"
			? (targetProps = ["name", "ingredients", "description"])
			: (targetProps = [type]);
		let input = inputValue.toLowerCase();
		const results = array.filter((data) => {
			for (let prop of targetProps) {
				let validRecipe = false;
				if (prop === "ingredients") {
					data.ingredients.some((elem) => {
						return elem.ingredient.toLowerCase().indexOf(input) !== -1;
					})
						? (validRecipe = true)
						: (validRecipe = false);
				} else if (prop === "ustensil") {
					data.ustensils.some((elem) => {
						return elem.toLowerCase().indexOf(input) !== -1;
					})
						? (validRecipe = true)
						: (validRecipe = false);
				} else {
					data[prop].toLowerCase().indexOf(input) !== -1
						? (validRecipe = true)
						: (validRecipe = false);
				}
				if (validRecipe) {
					return true;
				}
			}
		});
		return results;
	}
	multiSearch(array, searches, newPass) {
		let multiResults = [];
		if (newPass == true) {
			for (let search in searches) {
				if (search == 0) {
					multiResults = this.searchRecipes(
						searches[search][0],
						searches[search][1],
						array
					);
				} else {
					multiResults = this.searchRecipes(
						searches[search][0],
						searches[search][1],
						multiResults
					);
				}
			}
		} else {
			multiResults = this.searchRecipes(
				searches[searches.length - 1][0],
				searches[searches.length - 1][1],
				array
			);
		}
		return multiResults;
	}
	watchSearches() {
		this.watchMainSearch();
		this.watchDropdownSearch();
	}
	watchDropdownSearch() {
		const dropdownsInputs = document.getElementsByClassName(
			"search__filter-input"
		);
		for (let dropdown of dropdownsInputs) {
			dropdown.addEventListener("input", this.dropdownSearch.bind(this));
		}
	}
	watchMainSearch() {
		document
			.getElementById("mainSearch")
			.addEventListener("input", this.mainSearch.bind(this));
	}
	mainSearch(e) {
		console.table(this.filteredRecipes);
		console.table(this.searches);
		console.table(this.newPass);
		if (e.target.value.length >= 3) {
			let search = ["main", e.target.value];
			this.searches = [];
			this.searches.push(search);
			let results = [];
			if (e.data !== null) {
				results = this.multiSearch(
					this.filteredRecipes,
					this.searches,
					this.newPass
				);
			} else {
				results = this.multiSearch(
					this.allRecipes,
					this.searches,
					this.newPass
				);
			}
			this.newPass = false;
			if (!results.length) {
				this.filteredRecipes = this.allRecipes;
				Cards.createAllCards([]);
				this.dropdowns.generateOptions([]);
			} else if (
				results.length &&
				JSON.stringify(results) !== JSON.stringify(this.filteredRecipes)
			) {
				this.filteredRecipes = results;
				Cards.createAllCards(this.filteredRecipes);
				this.dropdowns.generateOptions(this.filteredRecipes);
			}
		} else if (e.target.value.length === 2 && e.data === null) {
			Cards.createAllCards(this.allRecipes);
			this.dropdowns.generateOptions(this.allRecipes);
		} else if (e.target.value.length === 0 && e.data === null) {
			this.filteredRecipes = this.allRecipes;
			this.searches = [];
			this.newPass = true;
			Cards.createAllCards(this.allRecipes);
			this.dropdowns.generateOptions(this.allRecipes);
		}
	}
	dropdownSearch(e) {
		console.log("input");
		let listItems = [];
		let category = "";
		let dropdown = e.currentTarget;
		if (dropdown.classList.contains("bg-ingredient")) {
			category = "bg-ingredient";
		} else if (dropdown.classList.contains("bg-appliance")) {
			category = "bg-appliance";
		} else if (dropdown.classList.contains("bg-ustensil")) {
			category = "bg-ustensil";
		}
		listItems = document.querySelectorAll(`.${category}.search__filter-itm`);
		for (let item of listItems) {
			if (
				item.children[0].innerText
					.toLowerCase()
					.indexOf(e.target.value.toLowerCase()) === -1
			) {
				item.setAttribute("hidden", true);
			} else {
				item.removeAttribute("hidden");
			}
		}
		Dropdowns.dropdownsSize();
	}
	removeTag(search) {
		const searchIndex = this.searches.findIndex(
			(element) =>
				element.toString().toLowerCase() === search.toString().toLowerCase()
		);
		this.searches.splice(searchIndex, 1);
		this.newPass = true;
		console.log(this.searches);
		if (this.searches.length > 0) {
			this.filteredRecipes = this.allRecipes;
			let results = this.multiSearch(
				this.filteredRecipes,
				this.searches,
				this.newPass
			);
			this.newPass = false;
			if (!results.length) {
				Cards.createAllCards([]);
				this.dropdowns.generateOptions([]);
			} else if (
				results.length &&
				JSON.stringify(results) !== JSON.stringify(this.filteredRecipes)
			) {
				this.filteredRecipes = results;
				Cards.createAllCards(this.filteredRecipes);
				this.dropdowns.generateOptions(this.filteredRecipes);
			}
		} else {
			this.filteredRecipes = this.allRecipes;
			Cards.createAllCards(this.filteredRecipes);
			this.dropdowns.generateOptions(this.filteredRecipes);
		}
	}
	pushTag(search) {
		this.searches.push(search);
		let results = this.multiSearch(
			this.filteredRecipes,
			this.searches,
			this.newPass
		);
		this.newPass = false;
		if (!results.length) {
			this.filteredRecipes = this.allRecipes;
			Cards.createAllCards([]);
			this.dropdowns.generateOptions([]);
		} else if (
			results.length &&
			JSON.stringify(results) !== JSON.stringify(this.filteredRecipes)
		) {
			this.filteredRecipes = results;
			Cards.createAllCards(this.filteredRecipes);
			this.dropdowns.generateOptions(this.filteredRecipes);
		}
	}
}