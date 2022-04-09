function refreshCartItems(){
	// INSERT CODE HERE --> PRIPREMA

	let cartItemsElement = document.querySelector('#cart-items');
	let numberOfItems = 0;

	if (localStorage.getItem("shoppingCart")) {
		products = JSON.parse(localStorage.getItem("shoppingCart"));
		products.forEach(product => {
			numberOfItems = numberOfItems + product.amount;
		});
	}

	cartItemsElement.textContent = numberOfItems;

	// END INSERT --> PRIPREMA
}

refreshCartItems();