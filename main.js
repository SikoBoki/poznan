let currentProducts = products
let categories = new Set()
let basket = []
let addToBasketButtons
const productsSection = document.querySelector('.products')
const basketClearBtn = document.querySelector('.basket-clear-btn')
const basketAmountSpan = document.querySelector('.basket-amount')
const addToBasket = e => {
	console.log(e)
	const selectedId = parseInt(e.target.dataset.id)
	console.log(selectedId)
	const key = currentProducts.findIndex(products => {
		return products.id === selectedId
	})
	//basket.push(currentProducts.at(key).price)
	basket.push(currentProducts.at(key))
	const basketTotal = basket.reduce((suma, product) => {
		return product.saleAmount ? (suma += product.price - product.saleAmount) : (suma += product.price)
	}, 0)

	basketTotal > 0 ? basketClearBtn.classList.add('active') : basketClearBtn.classList.remove('active')

	basketAmountSpan.innerHTML = `${parseFloat(basketTotal).toFixed(2)} zł.`

	console.log(basketTotal)

	console.log(basket)
	//console.log(currentProducts.at(key))
	//const key = currentProducts.findIndex((product) => product.id === selectedId);
	//console.log(key )
	//console.log('klik' + selectedId)
}
const clearBasket = () => {
	basketAmountSpan.innerHTML = 'Koszyk'
	basket = []
	basketClearBtn.classList.remove('active')
}
basketClearBtn.addEventListener('click', clearBasket)
const renderProducts = items => {
	productsSection.innerHTML = ''
	for (let i = 0; i < items.length; i++) {
		const newProduct = document.createElement('div')
		newProduct.className = `product-item ${items[i].sale ? 'on-sale' : ''}`
		newProduct.innerHTML = `
	  <img src="${items[i].image}" alt="product-image" />
	  <p class="product-name">${items[i].name}</p>
	  <p class="product-description">
	 ${items[i].description}
	  </p>
	  <div class="product-price">
	  <span class="price">${items[i].price.toFixed(2)} zł</span>
	  <span class="price-sale">${(items[i].price - items[i].saleAmount).toFixed(2)} zł</span>
	  </div>
	  <button data-id="${items[i].id}" class="product-add-to-basket-btn">Dodaj do koszyka</button>
  <p class="product-item-sale-info">Promocja</p>`

		productsSection.appendChild(newProduct)
	}
	addToBasketButtons = document.querySelectorAll('.product-add-to-basket-btn')
	addToBasketButtons.forEach(btn => btn.addEventListener('click', addToBasket))
}

const renderCategories = items => {
	for (let i = 0; i < items.length; i++) {
		categories.add(items[i].category)
	}
	categories = ['Wszystkie', ...categories]
	console.log('moje kategorie : ' + categories)
	const categoriesItems = document.querySelector('.categories-items')
	categories.forEach((categoria, index) => {
		const newCategory = document.createElement('button')
		newCategory.innerHTML = categoria
		newCategory.dataset.category = categoria
		index === 0 ? newCategory.classList.add('active') : ''

		categoriesItems.appendChild(newCategory)
		console.log('test', newCategory)
	})

	console.log(categories)
	console.log(categories)
}

// const renderCategories = items => {
// 	for (let i = 0; i < items.length; i++) {
// 		categories.add(items[i].category)
// 		console.log(categories)
// 	}
// }

document.onload = renderProducts(currentProducts)
document.onload = renderCategories(currentProducts)

const categoriesButtons = document.querySelectorAll('.categories-items button')
categoriesButtons.forEach(btn => {
	btn.addEventListener('click', e => {
		console.log(e)
		const category = e.target.dataset.category
		categoriesButtons.forEach(btn => btn.classList.remove('active'))
		e.target.classList.add('active')

		currentProducts = products
		if (category === 'Wszystkie') {
			currentProducts = products
		} else {
			currentProducts = currentProducts.filter(item => {
				if (item.category === category) return item
			})
		}

		console.log(currentProducts)
		renderProducts(currentProducts)
		console.log('kliknieta kategoria ' + category)
	})
})

///*css*/
const searchBarInput = document.querySelector('.search-bar-input')

searchBarInput.addEventListener('input', e => {
	const search = e.target.value
	const foundProducts = currentProducts.filter(product => {
		if (product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
			return product
		}
	})

	const emptyState = document.querySelector('.empty-state')

	foundProducts.length === 0 ? emptyState.classList.add('active') : emptyState.classList.remove('active')
	console.log(foundProducts)
	renderProducts(foundProducts)
})
//
