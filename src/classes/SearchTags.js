export class SearchTags {
	constructor(searchEngine) {
		this.searchEngine = searchEngine;
	}
	createTag(tag) {
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
				for (let className of classList) {
					elem.classList.add(className);
				}
				elem.setAttribute("type", "button");
				elem.setAttribute("data-type", "ingredients");
				elem.innerHTML = `<span class="search__tag-name">${tag[1]}</span>`;

				break;
			case "ustensil":
				classList = ["btn", "btn-ustensil", "text-white", "search__tag-button"];
				for (let className of classList) {
					elem.classList.add(className);
				}
				elem.setAttribute("type", "button");
				elem.setAttribute("data-type", "ustensil");
				elem.innerHTML = `<span class="search__tag-name" data-type="appliance">${tag[1]}</span>`;
				break;
			case "appliance":
				classList = [
					"btn",
					"btn-appliance",
					"text-white",
					"search__tag-button",
				];
				for (let className of classList) {
					elem.classList.add(className);
				}
				elem.setAttribute("type", "button");
				elem.setAttribute("data-type","appliance");
				elem.innerHTML = `<span class="search__tag-name">${tag[1]}</span>`;
				break;
		}
		container.appendChild(elem);
		elem.addEventListener("click", this.removeTag.bind(this));
	}
	removeTag(e) {
		let search = [e.currentTarget.getAttribute("data-type"),e.currentTarget.firstChild.innerText]
		e.currentTarget.remove()
		this.searchEngine.removeTag(search);
	}
}
