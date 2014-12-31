var model = {
    balance : 150000,
    stocks  : []
},
temp = {
    ask    : 0,
    bid    : 0,
    name   : '',
    symbol : ''
},
view = {
    update: function(selector, val) {
        $(selector).html(val);
    },
    append: function(selector, val) {
        $(selector).append('<p>' + val + '</p>');
    },
    sellStocks: function() {
        var target = $('.sellStocks');
        target.append('<input type="text" class="amountToSell">');
        target.append('<button class="sellStocksButton" data-symbol="' + model.symbol + '">sell it!</button>');

        $('.amountToSell').keyup(function() {
            $(this).val($(this).val().replace(/[^\d]/,''));
        });

        $('.sellStocksButton').on('click', function() {
            console.log('clicked');
        });
    }
},
controller = {
    lookupStocks: function() {
        $('button.lookup').on('click', function() {
            $.ajax({
				url: 'http://data.benzinga.com/stock/' + $('.search').val(),
                type: 'GET',
                dataType: 'json',
                error: function() {
                    alert('ERROR: http request failed.');
                },
                success: function(data) {
                    //debug
                    console.dir(data);
                    if (data.status !== 'error') {
                        // assign retrieved data to temp storage
                        temp.ask    = data.ask;
                        temp.bid    = data.bid;
                        temp.name   = data.name;
                        temp.symbol = data.symbol;
                        //debug

                        // update view
                        view.update('.leftSide h1', temp.name);
                        view.update('.bid > p', temp.bid);
                        view.update('.ask > p', temp.ask);
                    } else {
                        alert('please enter a valid stock symbol!');
                        $('.search').val("");
                    }
                }
            });
        });
    },
    buyStock: function() {
        $('.buy').on('click', function() {
            var quantity = $('.purchase').val();
            var total = quantity * temp.ask;

            if(total > model.balance) {
                alert("you don't have enough money!");
            } else {
               model.stocks.push({name: temp.name, bid: temp.bid, ask: temp.ask});
               console.dir(model.stocks);

               model.balance -= total;

               view.update('.totalInBank', model.balance);
               view.append('.quantity', quantity);
               view.append('.pricePaid', temp.bid);
               view.append('.company', temp.name);
               view.sellStocks();
            }
        });
    },
    sellStocks: function() {
        $(document.body).on('click', 'button.sellStocksButton', function() {
            if( $('.amountToSell').val() < $('.quantity').val()) {
                alert("You can't sell more than you own!");
            } else {
                var current = $('.quantity > p').text(),
                    price = $('.pricePaid > p').text(),
                    amount = $('.amountToSell').val(),
                    total = price * amount;

                model.balance += total;
                view.update('.totalInBank', model.balance);

                view.update('.quantity', (current - amount));
            }
        });
    },
    init: function() {
        this.lookupStocks();
        this.buyStock();
        this.sellStocks();
    }
};

$(document).ready(function() {
    view.update('.totalInBank', model.balance);
    controller.init();

    $('.purchase').keyup(function() {
        $(this).val($(this).val().replace(/[^\d]/,''));
    });
});

