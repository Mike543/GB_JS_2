const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'


new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    cart: [],
    isVisibleCart: false
  },
  methods: {
    loadGoods(){
      fetch(`${API_URL}catalogData.json`)
        .then((request) => request.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    search () {
      const regexp = new RegExp(this.searchLine, 'i')
      this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name))
    },
    loadCart(){
      fetch(`${API_URL}getBasket.json`)
        .then((request) => request.json())
        .then((data) => {
          this.cart = data.contents;
        })
    },
    addToCart(good){
      fetch(`${API_URL}addToBasket.json`)
        .then(() => {
          this.cart.push(good)
        })
    },
    deleteFromCart(good){
      fetch(`${API_URL}deleteFromBasket.json`)
        .then(() => {
          const index = this.cart.findIndex((item) => item.id_product !== good.id_product)
          this.cart.splice(index, 1)
        })
    },
    toCart() {
      this.isVisibleCart = !this.isVisibleCart
    }
  },
  mounted() {
    this.loadGoods();
    this.loadCart();
  },

})