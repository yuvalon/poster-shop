new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { title: 'item 1', id: 1, price: 28 },
            { title: 'item 2', id: 2, price: 30 },
            { title: 'item 3', id: 3, price: 2 }
        ],
        cart: []
    },
    methods: {
        addItem: function (index) {
            this.total += this.items[index].price ;
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
            this.cart.push({ title: this.items[index].title, qty: 1, id: this.items[index].id, price: this.items[index].price });
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

            alert("moshe");
        }
    },
    filters: {
        currency: function (price) {
            return '$'.concat(price.toFixed(2));
        }
    }
})