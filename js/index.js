$(document).ready(function () {
	view.updateBank(model.balance);
	// this updates the view based on the logic
	controller.lookupStock();
	controller.buyStock();
	//controller.sellStock();

    $('.purchase').keyup(function() {
        $(this).val($(this).val().replace(/[^\d]/,''));
    });

    //how to sell stocks
    $('.sellStocksButton').on('click', '.sellStocksButton', function() {
		console.log("yes");
		// saving the textbox to a var
		// var sellValue = $('.amountToSell').val();
		// // checking to see if a user is selling too many shares
		// if(sellValue > view.updateQuantity()) {
		// 	alert("you can't sell more then you own!")
		// } else {
		// // adding the sale of shares to the balance
		// model.balance = sellTotal * model.bidPrice;
		// // updating the shares section based on how many shares are sold
		// view.updateQuantity -= sellTotal;
		// // removing the stock from the portfolio if the new quantity is 0
		// if(view.updateQuantity === 0) {
		// 	view.updateCompany.remove();
		// 	view.updateQuantity.remove();
		// 	view.updatePrice.remove();
		// 	view.sellYourStocks.remove();
		// 	}
		// }

	});

});

var view = {
		
		// updates amount of cash in your bank
		updateBank: function(bankAmount) {	
			var bankTotalEl = $('.totalInBank');
			bankTotalEl.html(bankAmount);
		},

		// this updates the stockname title
		updateStockName: function(stockName) {
			var stockNameTitle = $('.leftSide h1');
			stockNameTitle.html(stockName);
		},
		// this updates the bid number
		updateBidNumber: function(bidNumber) {
			var actualBidNumber = $('.bid > p');
			actualBidNumber.html(bidNumber);
		},
		// this updates the ask number
		updateAskNumber: function(askNumber) {
			var actualAskNumber = $('.ask > p');
			actualAskNumber.html(askNumber);
		},
		// this updates the company name under portfolio
		updateCompany: function(companyPortfolio) {
			var updateCompPort = $('.company');
			updateCompPort.append('<p>' + companyPortfolio + '</p>');
		},
		// this updates quantity of each stock
		updateQuantity: function(quantityPortfolio) {
			var updateQuantityPort = $('.quantity');
			updateQuantityPort.append('<p>' + quantityPortfolio + '</p>');
		},
		// this updates the price paid for ech stock
		updatePrice: function(pricePortfolio) {
			var updatePriceEl = $('.pricePaid');
			updatePriceEl.append('<p>' + pricePortfolio + '</p>');
		},
		sellYourStocks: function() {
			var stockSellEl = $('.sellStocks');
			stockSellEl.append('<input type="text" class="amountToSell">');			
			stockSellEl.append('<button class="sellStocksButton">sell it!</button>');
			$('.amountToSell').keyup(function() {
       			 $(this).val($(this).val().replace(/[^\d]/,''));
    		});
		}
	};

	var model = {

		// users balance
		balance: 150000,
		askPrice: 0,
		bidPrice: 0,
		nameOfCompany: "",
		stock:{}
	};

	var controller = {

		// going to store the data from the ajax call
		jsonStorage: {},

		lookupStock: function() {
			var lookUpButton = $('button.lookup');
			var stockSearchValue = $('.search');
			lookUpButton.on('click', function() {
				var textbox = stockSearchValue.val();
				$.ajax({
					url: 'http://data.benzinga.com/stock/' + textbox,
					type: 'GET',
					dataType: 'jsonp',
					error: function() {
						alert('please enter a valid stock symbol!');
					},
					success: function(data) {
						jsonStorage = data;
						console.dir(jsonStorage);
						model.askPrice = jsonStorage.ask;
						model.bidPrice = jsonStorage.bid;
						model.nameOfCompany = jsonStorage.name;
						view.updateStockName(model.nameOfCompany);
						view.updateBidNumber(model.bidPrice);
						view.updateAskNumber(model.askPrice);
					}
				});

			});
		},

		// buying stock functionality
		buyStock: function() {
			// the buy button
			var buyButton = $('.buy');
			// value of the text box next to the buy/sell button

			buyButton.on('click', function() {
				var quantityValue = $('.purchase');
				// gets value of the textbox
				var quantityToBuy = quantityValue.val();
				// multiplies the textbox value by the ask number
				var pricePaid = quantityToBuy * model.askPrice;
				// deducts amount from your balance
				if(pricePaid > model.balance) {
					alert("you don't have enough to buy this!");
					model.balance = 0;
				} else {
					model.balance = model.balance - pricePaid;
					view.updateBank(model.balance);
					// updates the quantity number on the right side with the amount
					// of shares you bought
					view.updateQuantity(quantityToBuy);
					// updates the price paid on the right based on when you bought the
					// stocks
					view.updatePrice(jsonStorage.bid);
					// updates the company name on the right side based on what company's
					// stocks you bought
					view.updateCompany(model.nameOfCompany);
					// adds a sell your stock button
					view.sellYourStocks();
				}	
				

			}); // end of click function for the buy button
		}, // end of the buy stock functionality

		// sell stock functionality
		sellStock: function() {
			// $('.sellStocksButton').on('click', 'button.sellStocksButton', function() {
			// 	console.log("yes");
			// 	// saving the textbox to a var
			// 	var sellValue = $('.amountToSell').val();
			// 	// checking to see if a user is selling too many shares
			// 	if(sellValue > view.updateQuantity()) {
			// 		alert("you can't sell more then you own!")
			// 	} else {
			// 		// adding the sale of shares to the balance
			// 		model.balance = sellTotal * model.bidPrice;
			// 		// updating the shares section based on how many shares are sold
			// 		view.updateQuantity -= sellTotal;
			// 		// removing the stock from the portfolio if the new quantity is 0
			// 		if(view.updateQuantity === 0) {
			// 			view.updateCompany.remove();
			// 			view.updateQuantity.remove();
			// 			view.updatePrice.remove();
			// 			view.sellYourStocks.remove();
			// 		}
			// 	}

			// });
		}
	};
