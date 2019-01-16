const PRICE = 9.99;
const LIMIT = 10;
new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: 'anime',
        lastSearch: '',
        loading: false,
        price: PRICE,
        results : []
    },
    computed:{

        noMoreValues:function(){
            return (this.items.length === this.results.length) && (this.items.length > 0);
        }

    },
    methods: {

        appendItems: function () {
            if (this.items.length < this.results.length){
            console.log('append items');

                let newItems = this.results.slice(this.items.length, this.items.length + LIMIT);
                this.items = this.items.concat(newItems);
            }
        },
        onSubmit: function () {

            this.items = [];
            this.loading = true;
            this.$http
                .get('search/'.concat(this.newSearch))
                .then(function (res) {
                    this.lastSearch = this.newSearch;
                    this.results = res.data;
                    this.appendItems();
                    this.loading = false;
                })
        },
        addItem: function (index) {
            this.total += PRICE
            let found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === this.items[index].id) {
                    found = true;
                    this.cart[i].qty++;
                    break;
                }
            }
            if (found) {
                return;
            }
            this.cart.push({ title: this.items[index].title, qty: 1, id: this.items[index].id, price: PRICE });
        },
        inc: function (item) {
            item.qty++;
            this.total += item.price;
        },
        dec: function (item) {
            item.qty--;
            this.total -= item.price;

            if (item.qty === 0) {
                this.cart.forEach((currentCartItem, index) => {
                    if (currentCartItem.id === item.id) {
                        this.cart.splice(index, 1);
                        return;
                    }
                })
            }

        }
    },
    filters: {
        currency: function (price) {
            return '$'.concat(price.toFixed(2));
        }
    },

    mounted: function () {
        this.onSubmit();
        let vueInstance = this;
        let elem = document.getElementById('product-list-bottom');
        let watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function () {
            vueInstance.appendItems();
        });
    }
})


