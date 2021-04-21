export class Cards {
	static createCard(recipe) {
		let templateElem = document.createElement("div");
		templateElem.classList.add("col-4");
		templateElem.classList.add("p-0");

		let template = `<div class="card border-0 recipe">
							<img
								src="https://via.placeholder.com/380x178"
								alt=""
								class="card-img-top"
							/>
							<div class="card-body">
								<div class="row">
									<div class="col-8">
										<h2 class="recipe__name">${recipe.name}</h2>
									</div>
									<div class="col-4 text-right">
										<span class="recipe__time">
											<i class="far fa-clock"></i> ${recipe.time}min</span
										>
									</div>
								</div>
								<div class="row">
									<div class="col-6">
										<ul class="list-group recipe__ingredients-list">`;
		for (let ingredient of recipe.ingredients) {
			template += `<li class="list-group-item border-0 p-0 recipe__ingredient-item">
												<span class="recipe__ingredient-name">${ingredient.ingredient}: </span>`;
			if (ingredient.hasOwnProperty("quantity")) {
				template += `<span class="recipe__ingredient-quantity">${ingredient.quantity}`;
				if (ingredient.hasOwnProperty("unit")) {
					template += ` ${ingredient.unit}`;
				}
				template += `</span>`;
			}
			template += `</li>`;
		}

		template += `</ul>
									</div>
									<div class="col-6">
										<p class="recipe__description">
											${recipe.description}
										</p>
									</div>
								</div>
							</div>
						</div>
					`;
		template.trim();
		templateElem.innerHTML = template;
		return templateElem;
	}
	static createAllCards(recipes) {
		let container = document.getElementById("recipesCards");
		for (let recipe of recipes) {
			let recipeCard = this.createCard(recipe);
			container.appendChild(recipeCard);
		}
	}
}
