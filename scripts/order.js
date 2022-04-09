function addToCart(id) {
	// INSERT CODE HERE --> PRIPREMA

	if (!localStorage.getItem("shoppingCart")) {
		let products = [{productId: id, amount: 1}];
		localStorage.setItem("shoppingCart", JSON.stringify(products));
	} else {
		let products = JSON.parse(localStorage.getItem("shoppingCart"));
		let productIndex = products.findIndex(product => product.productId == id);
		if (productIndex == -1) {
			products.push({productId: id, amount: 1});
		} else {
			products[productIndex].amount++;
		}
		localStorage.setItem("shoppingCart", JSON.stringify(products));
	}

	// END INSERT --> PRIPREMA
	refreshCartItems();
}

let getData = async function () {
	let response = await fetch("data/lab2.json");
	let data = await response.json();
	addCategories(data);
}

let addCategories = async function (data) {
	let categories = data.categories;
	let main = document.querySelector('main');
	let categoryTemplate = document.querySelector('#category-template');

	for (let index = 0; index < categories.length; index++) {
		let category = categoryTemplate.content.cloneNode(true);
		let categoryTitleElement = category.querySelector('.decorated-title > span');
		categoryTitleElement.textContent = categories[index].name;
		
		let products = data.products.filter(p => p.categoryId ==  categories[index].id);

		// INSERT CODE HERE --> PRIPREMA

		let productTemplate = document.querySelector('#product-template');					//Get product template element
		for (i = 0; i < products.length; i++) {
			let product = productTemplate.content.cloneNode(true);							//Create new element by cloning the template

			let productIdElement = product.querySelector('.photo-box');						//Set product ID
			productIdElement.dataset.id = products[i].id;
			
			let productImageElement = product.querySelector('.photo-box-image');			//Set product Image
			productImageElement.setAttribute("src", products[i].imageUrl);

			let productNameElement = product.querySelector('.photo-box-title');				//Set product Name
			productNameElement.textContent = products[i].name;

			let productCartButtonElement = product.querySelector('.cart-btn');				//Set cart button onclick event
			productCartButtonElement.onclick = (btn) => {
				addToCart(btn.target.parentNode.dataset.id);
			}

			let categoryGallery = category.querySelector(".gallery");						//Append product to gallery
			categoryGallery.appendChild(product);
		}

		// END INSERT --> PRIPREMA

		main.appendChild(category);
	}
};
getData();