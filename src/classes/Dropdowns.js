import { SearchTags } from "./SearchTags.js";

export class Dropdowns {
	constructor(searchEngine) {
		this.searchEngine = searchEngine;
	}
	watchDropdowns() {
		const openTriggers = [
			document.querySelector(".btn-ingredient.search__category-btn"),
			document.querySelector(".btn-ustensil.search__category-btn"),
			document.querySelector(".btn-appliance.search__category-btn"),
		];
		for (let trigger of openTriggers) {
			trigger.addEventListener("click", (e) => {
				this.closeAllDropdowns();
				let target = e.currentTarget;
				target.parentElement.style.display = "none";
				target.parentElement.nextElementSibling.style.display = "block";
			});
			trigger.parentElement.nextElementSibling.children[0].children[0].children[1].addEventListener(
				"click",
				(event) => {
					event.currentTarget.parentElement.parentElement.parentElement.style.display =
						"none";
					event.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.style.display =
						"block";
					("block");
				}
			);
		}
	}
	closeAllDropdowns() {
		let dropdownsClosed = document.querySelectorAll(
			".search__category-wrapper:not(.search__category-wrapper--open)"
		);
		for (let dropdown of dropdownsClosed) {
			dropdown.style.display = "block";
		}
		let dropdownsOpen = document.getElementsByClassName(
			"search__category-wrapper--open"
		);
		for (let dropdown of dropdownsOpen) {
			dropdown.style.display = "none";
		}
	}
	generateOptions(recipes) {
		const dropdownTriggers = [
			document.querySelector(".btn-ingredient.search__category-btn"),
			document.querySelector(".btn-ustensil.search__category-btn"),
			document.querySelector(".btn-appliance.search__category-btn"),
		];
		const ingredientsUl = document.getElementById("ingredientsDropdown");
		const appliancesUl = document.getElementById("appliancesDropdown");
		const ustensilsUl = document.getElementById("ustensilsDropdown");
		while (ingredientsUl.firstChild) {
			ingredientsUl.removeChild(ingredientsUl.lastChild);
		}
		while (appliancesUl.firstChild) {
			appliancesUl.removeChild(appliancesUl.lastChild);
		}
		while (ustensilsUl.firstChild) {
			ustensilsUl.removeChild(ustensilsUl.lastChild);
		}
		if (recipes.length) {
			for (let trigger of dropdownTriggers) {
				trigger.removeAttribute("disabled");
			}
			let ingredients = [];
			let appliances = [];
			let ustensils = [];
			for (let recipe of recipes) {
				for (let ingredient of recipe.ingredients) {
					ingredients.push(ingredient.ingredient);
				}
				appliances.push(recipe.appliance);
				for (let ustensil of recipe.ustensils) {
					ustensils.push(ustensil);
				}
			}
			const ingredientsUnique = [...new Set(ingredients)];
			const appliancesUnique = [...new Set(appliances)];
			const ustensilsUnique = [...new Set(ustensils)];
			for (let ingredient of ingredientsUnique) {
				let templateElem = document.createElement("template");
				let templateIngredients = `<li
									class="list-group-item border-0 bg-ingredient search__filter-itm"
								>
									<a href="" data-type="ingredients" class="search__filter-link">${ingredient}</a>
								</li>`;
				templateElem.innerHTML = templateIngredients;
				let option = ingredientsUl.appendChild(templateElem.content.firstChild);
				option.children[0].addEventListener(
					"click",
					this.selectOption.bind(this)
				);
			}
			for (let ustensil of ustensilsUnique) {
				let templateElem = document.createElement("template");
				let templateUstensils = `<li
									class="list-group-item border-0 bg-ustensil search__filter-itm"
								>
									<a href="" data-type="ustensil" class="search__filter-link">${ustensil}</a>
								</li>`;
				templateElem.innerHTML = templateUstensils;
				let option = ustensilsUl.appendChild(templateElem.content.firstChild);
				option.children[0].addEventListener("click", this.selectOption.bind(this));
			}
			for (let appliance of appliancesUnique) {
				let templateElem = document.createElement("template");
				let templateAppliances = `<li
									class="list-group-item border-0 bg-appliance search__filter-itm"
								>
									<a href="" data-type="appliance" class="search__filter-link">${appliance}</a>
								</li>`;
				templateElem.innerHTML = templateAppliances;
				let option = appliancesUl.appendChild(templateElem.content.firstChild);
				option.children[0].addEventListener(
					"click",
					this.selectOption.bind(this)
				);
			}
			this.dropdownsSize();
		} else {
			for (let trigger of dropdownTriggers) {
				trigger.setAttribute("disabled", true);
			}
		}
	}
	selectOption(e) {
		e.preventDefault();
		const tag = new SearchTags(this.searchEngine)
		tag.createTag([
			e.target.getAttribute("data-type"),
			e.target.innerText,
		]);
		const search = [e.currentTarget.getAttribute("data-type"),e.currentTarget.innerText]
		this.searchEngine.pushTag(search);
		this.closeAllDropdowns();
	}
	dropdownsSize() {
		const dropdowns = document.getElementsByClassName("search__filter-list");

		for (let dropdown of dropdowns) {
			let dropdownItemsCount = [...dropdown.children].filter(
				(item) => !item.hasAttribute("hidden")
			).length;
			let dropdownColCount;
			if (dropdownItemsCount <= 30) {
				if (dropdownItemsCount === 0) {
					dropdownColCount = 1;
				} else if (dropdownItemsCount % 10 === 0) {
					dropdownColCount = dropdownItemsCount / 10;
				} else if (dropdownItemsCount < 10) {
					dropdownColCount = 1;
				} else {
					dropdownColCount = Math.ceil(dropdownItemsCount / 10);
				}
			} else {
				dropdownColCount = 3;
			}
			let dropdownWidth = dropdownColCount * 13.938;
			dropdown.parentElement.parentElement.parentElement.style.maxWidth = `${dropdownWidth}rem`;
			if (dropdownItemsCount > 30) {
				let dropdownRowCount = Math.ceil(dropdownItemsCount / 3);
				dropdown.style.height = `${dropdownRowCount * 3}rem`;
			} else if (dropdownItemsCount >= 10) {
				dropdown.style.height = "30rem";
			} else {
				dropdown.style.height = `${dropdownItemsCount * 3}rem`;
			}
		}
	}
}
