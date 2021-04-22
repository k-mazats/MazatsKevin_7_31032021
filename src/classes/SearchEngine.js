import { Dropdowns } from "./Dropdowns.js";
import { Cards } from "./Cards.js";
export class SearchEngine {
	constructor(recipes) {
		this.allRecipes = recipes;
		this.filteredRecipes = recipes;
		this.searches = [];
		this.newPass = true;
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
		console.log(searches);
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
			if (!results.length) {
				this.filteredRecipes = this.allRecipes;
				Cards.createAllCards([]);
				Dropdowns.generateOptions([]);
			} else if (
				results.length &&
				JSON.stringify(results) !== JSON.stringify(this.filteredRecipes)
			) {
				this.filteredRecipes = results;
				Cards.createAllCards(this.filteredRecipes);
				Dropdowns.generateOptions(this.filteredRecipes);
				this.newPass = false;
			}
		} else if (e.target.value.length === 2 && e.data === null) {
			Cards.createAllCards(this.allRecipes);
			Dropdowns.generateOptions(this.allRecipes);
		} else if (e.target.value.length === 0 && e.data === null) {
			this.filteredRecipes = this.allRecipes;
			this.searches = [];
			this.newPass = true;
			Cards.createAllCards(this.allRecipes);
			Dropdowns.generateOptions(this.allRecipes);
		}
	}
	dropdownSearch(e){
        console.log("input")
        let listItems = [];
				let category = "";
                let dropdown = e.currentTarget
				if (dropdown.classList.contains("bg-ingredient")) {
					category = "bg-ingredient";
				} else if (dropdown.classList.contains("bg-appliance")) {
					category = "bg-appliance";
				} else if (dropdown.classList.contains("bg-ustensil")) {
					category = "bg-ustensil";
				}
				listItems = document.querySelectorAll(
					`.${category}.search__filter-itm`
				);
				for (let item of listItems) {
					if (
						item.children[0].innerText
							.toLowerCase()
							.indexOf(e.target.value.toLowerCase()) === -1
					) {
						item.setAttribute("hidden",true);
					}else{
                        item.removeAttribute("hidden")
                    }
				}
                Dropdowns.dropdownsSize()
    }
}
