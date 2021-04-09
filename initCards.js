const initCards = (recipes) => {
	const container = document.getElementById("recipesCards");
	let template = "";
	for (let recipe of recipes) {
		template += `<div class="col-4 p-0">
						<div class="card border-0 recipe">
							<img
								src="https://via.placeholder.com/380x178"
								alt=""
								class="card-img-top"
							/>
							<div class="card-body">
								<div class="row">
									<div class="col">
										<h2 class="recipe__name">${recipe.name}</h2>
									</div>
									<div class="col text-right">
										<span class="recipe__time">
											<i class="far fa-clock"></i> ${recipe.time}min</span
										>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<ul class="list-group recipe__ingredients-list">`;
		for (let ingredient of recipe.ingredients) {
			template += `<li class="list-group-item border-0 p-0 recipe__ingredient-item">
												<span class="recipe__ingredient-name">${ingredient.ingredient}: </span>`;
			if (ingredient.hasOwnProperty("quantity")) {
				template += `<span class="recipe__ingredient-quantity">${ingredient.quantity}`
				if (ingredient.hasOwnProperty("unit")) {
					template += ` ${ingredient.unit}`;
				}
				template +=`</span>`;
			}
			template += `</li>`;
		}

		template += `</ul>
									</div>
									<div class="col">
										<p class="recipe__description">
											${recipe.description}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>`;
	}
    container.innerHTML = template;
};
export default initCards;