export const createTag = (tag) => {
	const container = document.getElementById("searchTags");
	let elem = document.createElement("button");
    let classList = [];
	switch (tag[0]) {
		case "ingredients":
			classList = [
				"btn",
				"btn-ingredient",
				"text-white",
				"search__tag-button",
			];
            for(let className of classList) {
                elem.classList.add(className)
            }
			elem.setAttribute("type", "button");
			elem.innerHTML = `<span class="search__tag-name">${tag[1]}</span>`;

			break;
		case "ustensil":
			classList = ["btn", "btn-ustensil", "text-white", "search__tag-button"];
			for (let className of classList) {
				elem.classList.add(className);
			}
			elem.setAttribute("type", "button");
			elem.innerHTML = `<span class="search__tag-name">${tag[1]}</span>`;
			break;
		case "appliance":
			classList = [
				"btn",
				"btn-appliance",
				"text-white",
				"search__tag-button",
			];
            for(let className of classList) {
                elem.classList.add(className)
            }
			elem.setAttribute("type", "button");
			elem.innerHTML = `<span class="search__tag-name">${tag[1]}</span>`;
	}
	container.appendChild(elem);
};
