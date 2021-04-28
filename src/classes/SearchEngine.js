import { Dropdowns } from "./Dropdowns.js";
import { Cards } from "./Cards.js";
export class SearchEngine {
    constructor(recipes) {
        this.allRecipes = recipes;
        this.filteredRecipes = [];
        this.filteredRecipesID = [];
        this.searches = [];
        this.newPass = true;
        console.time();
        this.createDictionnary(recipes);
        console.timeEnd();
        console.log(this.dictionnary);
    }
    createDictionnary(recipes) {
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
            let recipeMain = recipes[recipe].name + " " + recipes[recipe].description + " " + recipeIngredientsArray.join(" ");
            let recipeMainArray = recipeMain.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");

            for (let keyword of recipeMainArray) {
                let keywordVariations = [];
                for (let i = 0; i <= keyword.length; i++) {
                    for (let j = 0; j <= keyword.length; j++) {
                        keywordVariations.push(keyword.substring(i, j));
                    }
                }

                for (let keywordVariation of keywordVariations) {
                    if (keywordVariation !== "") {
                        if (!recipesDict.recipesMain.hasOwnProperty(keywordVariation.toLowerCase())) {
                            recipesDict.recipesMain[keywordVariation.toLowerCase()] = [];
                        }
                        if (!recipesDict.recipesMain[keywordVariation.toLowerCase()].includes(parseInt(recipe))) {
                            recipesDict.recipesMain[keywordVariation.toLowerCase()].push(parseInt(recipe));
                        }
                    }
                }
            }
            for (let keyword of recipeUstensilsArray) {
                if (!recipesDict.recipesUstensils.hasOwnProperty(keyword.toLowerCase())) {
                    recipesDict.recipesUstensils[keyword.toLowerCase()] = [];
                }
                if (!recipesDict.recipesUstensils[keyword.toLowerCase()].includes(parseInt(recipe))) {
                    recipesDict.recipesUstensils[keyword.toLowerCase()].push(parseInt(recipe));
                }
            }

            if (!recipesDict.recipesAppliances.hasOwnProperty(recipes[recipe].appliance.toLowerCase())) {
                recipesDict.recipesAppliances[recipes[recipe].appliance.toLowerCase()] = [];
            }
            if (!recipesDict.recipesAppliances[recipes[recipe].appliance.toLowerCase()].includes(parseInt(recipe))) {
                recipesDict.recipesAppliances[recipes[recipe].appliance.toLowerCase()].push(parseInt(recipe));
            }

            for (let keyword of recipeIngredientsArray) {
                if (!recipesDict.recipesIngredients.hasOwnProperty(keyword.toLowerCase())) {
                    recipesDict.recipesIngredients[keyword.toLowerCase()] = [];
                }
                if (!recipesDict.recipesIngredients[keyword.toLowerCase()].includes(parseInt(recipe))) {
                    recipesDict.recipesIngredients[keyword.toLowerCase()].push(parseInt(recipe));
                }
            }
        }
        this.dictionnary = recipesDict;
    }
    searchRecipes(type, inputValue) {
        let target;
        switch (type) {
            case "appliance":
                target = this.dictionnary.recipesAppliances;
                break;
            case "ingredients":
                target = this.dictionnary.recipesIngredients;
                break;
            case "ustensil":
                target = this.dictionnary.recipesUstensils;
                break;
            case "main":
                target = this.dictionnary.recipesMain;
                break;
        }

        let results = [];
        if (target.hasOwnProperty(inputValue.toLowerCase())) {
            results = target[inputValue.toLowerCase()];
        }
        return results;
    }
    multiSearch(searches, newPass) {
        let resultsId = [];
        let results = [];
        let merge = [];
        if (newPass == true) {
            for (let search in searches) {
                if (search == 0) {
                    resultsId = this.searchRecipes(searches[search][0], searches[search][1]);
                    this.filteredRecipesID = resultsId;
                } else {
                    resultsId = this.searchRecipes(searches[search][0], searches[search][1]);
                    merge = resultsId.filter((v) => this.filteredRecipesID.indexOf(v) > -1);
                    this.filteredRecipesID = merge;
                    merge = [];
                }
            }
        } else {
            resultsId = this.searchRecipes(searches[searches.length - 1][0], searches[searches.length - 1][1]);
            merge = resultsId.filter((v) => this.filteredRecipesID.indexOf(v) > -1);
            this.filteredRecipesID = merge;
        }

        for (let result of this.filteredRecipesID) {
            results.push(this.allRecipes[result]);
        }

        return results;
    }
    watchSearches() {
        this.watchMainSearch();
        this.watchDropdownSearch();
    }
    watchDropdownSearch() {
        const dropdownsInputs = document.getElementsByClassName("search__filter-input");
        for (let dropdown of dropdownsInputs) {
            dropdown.addEventListener("input", this.dropdownSearch.bind(this));
        }
    }
    watchMainSearch() {
        document.getElementById("mainSearch").addEventListener("input", this.mainSearch.bind(this));
    }
    mainSearch(e) {
        if (e.target.value.length >= 3 && e.data !== " ") {
            let search;
            this.searches = [];
            if (e.target.value.indexOf(" ") === -1) {
                search = ["main", e.target.value];
                this.searches.push(search);
            } else {
                let keywords = e.target.value.split(" ");
                for (let keyword of keywords) {
                    if (keyword.length > 1) {
                        search = ["main", keyword.trim()];
                        this.searches.push(search);
                    }
                }
            }
            let results = [];
            if (e.data == null) {
                this.newPass = true;
            }
            results = this.multiSearch(this.searches, this.newPass);
            this.newPass = false;
            if (!results.length) {
                this.filteredRecipes = this.allRecipes;
                Cards.createAllCards([]);
                this.dropdowns.generateOptions([]);
            } else if (results.length && JSON.stringify(results) !== JSON.stringify(this.filteredRecipes)) {
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
            if (item.children[0].innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1) {
                item.setAttribute("hidden", true);
            } else {
                item.removeAttribute("hidden");
            }
        }
        this.dropdowns.dropdownsSize();
    }
    removeTag(search) {
        const searchIndex = this.searches.findIndex((element) => element.toString().toLowerCase() === search.toString().toLowerCase());
        this.searches.splice(searchIndex, 1);
        this.newPass = true;
        console.log(this.searches);
        if (this.searches.length > 0) {
            this.filteredRecipes = this.allRecipes;
            let results = this.multiSearch(this.searches, this.newPass);

            if (!results.length) {
                Cards.createAllCards([]);
                this.dropdowns.generateOptions([]);
            } else if (results.length && JSON.stringify(results) !== JSON.stringify(this.filteredRecipes)) {
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
        let results = this.multiSearch(this.searches, this.newPass);
        this.newPass = false;
        if (!results.length) {
            this.filteredRecipes = this.allRecipes;
            Cards.createAllCards([]);
            this.dropdowns.generateOptions([]);
        } else if (results.length && JSON.stringify(results) !== JSON.stringify(this.filteredRecipes)) {
            this.filteredRecipes = results;
            Cards.createAllCards(this.filteredRecipes);
            this.dropdowns.generateOptions(this.filteredRecipes);
        }
    }
}
