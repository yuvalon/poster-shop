new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: 'anime',
        lastSearch: '',
        loading: false,
        price : 9.99
    },
    methods: {
        onSubmit: function () {

            this.items = [];
            this.loading = true;
            this.$http
                .get('search/'.concat(this.newSearch))
                .then(function (res) {
                    this.lastSearch = this.newSearch;
                    this.items = res.data;
                    this.loading = false;
                })
        },
        addItem: function (index) {
            this.total += this.price
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
            this.cart.push({ title: this.items[index].title, qty: 1, id: this.items[index].id, price: this.price });
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

    mounted :function() {
        this.onSubmit();
    }
})