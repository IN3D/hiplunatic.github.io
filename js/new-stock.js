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
            console.log('success');
        });
    }
},
controller = {
    lookupStocks: function() {
        $.ajax({
            url: 'http://data.benzinga.com/stock/' + $('.search').val(),
            type: 'GET',
            dataType: 'json',
            error: function() {
                alert('please enter a valid stock symbol!');
                $('.search').val("");
            },
            success: function(data) {
                // assign retrieved data to temp storage
                temp.ask    = data.ask;
                temp.bid    = data.bid;
                temp.name   = data.name;
                temp.symbol = data.symbol;

                // update view
                view.update('.leftSide h1', model.nameOfCompany);
                view.update('.bid > p', model.bidPrice);
                view.update('.ask > p', model.askPrice);
            }
        });
    },
    buyStock: function() {
        $('.buy').on('click', function() {
            var quantity = $('.purchase').val();
            var total = quantity * model.askPrice;

            if(total > model.balance) {
                alert("you don't have enough money!");
            } else {
               model.stocks.push(temp);
               console.dir(model.stocks);

               model.balance -= total;

               view.update('.totalInBank', model.balance);
               view.append('.quantity', quantity);
               view.append('.pricePaid', temp.bid);
               view.append('.company', temp.name);
               view.sellYourStocks();
            }
        });
    },
    sellStocks: function() {
        $(document.body).on('click', 'button.sellStocksButton', function() {
            console.log('I work now');
            if( $('.amountToSell').val() > $('.quantity').val()) {
                console.log("you can't sell more than you own");
            } else {
                console.log('this would be valid');
            }
        });
    }
};

$(document).ready(function() {
    view.update('.totalInBank', model.balance);
    controller.lookupStocks();
    controller.buyStock();
    controller.sellStocks();

    $('.purchase').keyup(function() {
        $(this).val($(this).val().replace(/[^\d]/,''));
    });
});
