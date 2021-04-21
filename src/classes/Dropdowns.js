export class Dropdowns {
	constructor() {}
	static watchDropdowns() {
		const openTriggers = [
			document.querySelector(".btn-ingredient.search__category-btn"),
			document.querySelector(".btn-ustensil.search__category-btn"),
			document.querySelector(".btn-appliance.search__category-btn"),
		];
		for (let trigger of openTriggers) {
			trigger.addEventListener("click", (e) => {
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
	static generateOptions(recipes) {
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

		const ingredientsUl = document.getElementById("ingredientsDropdown");
		const appliancesUl = document.getElementById("appliancesDropdown");
		const ustensilsUl = document.getElementById("ustensilsDropdown");
		for (let ingredient of ingredientsUnique) {
			let templateElem = document.createElement("template");
			let templateIngredients = `<li
									class="list-group-item border-0 bg-ingredient search__filter-itm"
								>
									<a href="" data-type="ingredients" class="search__filter-link">${ingredient}</a>
								</li>`;
			templateElem.innerHTML = templateIngredients;
			let option = ingredientsUl.appendChild(templateElem.content.firstChild);
		}
		for (let ustensil of ustensilsUnique) {
			let templateElem = document.createElement("template");
			let templateUstensils = `<li
									class="list-group-item border-0 bg-ustensil search__filter-itm"
								>
									<a href="" data-type="ustensils" class="search__filter-link">${ustensil}</a>
								</li>`;
			templateElem.innerHTML = templateUstensils;
			let option = ustensilsUl.appendChild(templateElem.content.firstChild);
		}
		for (let appliance of appliancesUnique) {
			let templateElem = document.createElement("template");
			let templateAppliances = `<li
									class="list-group-item border-0 bg-appliance search__filter-itm"
								>
									<a href="" data-type="appliances" class="search__filter-link">${appliance}</a>
								</li>`;
			templateElem.innerHTML = templateAppliances;
			let option = appliancesUl.appendChild(templateElem.content.firstChild);
		}
		this.dropdownsSize()
	}
	static dropdownsSize(){
		const dropdowns = document.getElementsByClassName("search__filter-list");
		for (let dropdown of dropdowns) {
			let dropdownItemsCount = dropdown.childElementCount;
			let dropdownColCount;
			if (dropdownItemsCount <= 30) {
				if (dropdownItemsCount % 10 === 0) {
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
	};
}
