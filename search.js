const searchRecipes = (type, inputValue, array) => {
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
};

const multiSearch = (array, searches, newPass) => {
	let multiResults = [];
	if (newPass == true) {
		for (let search in searches) {
			if (search == 0) {
				multiResults = searchRecipes(
					searches[search][0],
					searches[search][1],
					array
				);
			} else {
				multiResults = searchRecipes(
					searches[search][0],
					searches[search][1],
					multiResults
				);
			}
		}
	} else {
		multiResults = searchRecipes(
			searches[searches.length - 1][0],
			searches[searches.length - 1][1],
			tempArray
		);
	}
	return multiResults;
};

export default multiSearch;
