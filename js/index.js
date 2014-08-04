$(document).ready(function () {
	view.updateBank(model.balance);
	//this updates the view based on the logic
	controller.lookupStock();
	controller.buyStock();
});

var view = {
		
		//updates yamount of cash in your bank
		updateBank: function(bankAmount){	
			var bankTotalEl = $('.totalInBank');
			bankTotalEl.html(bankAmount);
		},

		//this updates the stockname title
		updateStockName: function(stockName){
			var stockNameTitle = $('.leftSide h1');
			stockNameTitle.html(stockName);
		},
		//this updates the bid number
		updateBidNumber: function(bidNumber){
			var actualBidNumber = $('.bid > p');
			actualBidNumber.html(bidNumber);
		},
		//this updates the ask number
		updateAskNumber: function(askNumber){
			var actualAskNumber = $('.ask > p');
			actualAskNumber.html(askNumber);
		},
		//this updates the company name under portfolio
		updateCompany: function(companyPortfolio){
			var updateCompPort = $('.company > p');
			updateCompPort.html(companyPortfolio);
		},
		//this updates quantity of each stock
		updateQuantity: function(quantityPortfolio){
			var updateQuantityPort = $('.quantity > p');
			updateQuantityPort.html(quantityPortfolio);
		},
		//this updates the price paid for ech stock
		updatePrice: function(pricePortfolio){
			var updatePricePort = $('.pricePaid > p');
			updatePrice.html(pricePortfolio);
		}
	};

	var model = {

		//users balance
		balance: 150000,


		//click function for buying items

	};

	var controller = {

		//going to store the data from the ajax call
		jsonStorage: {},

		lookupStock: function(){
			var lookUpButton = $('button.lookup');
			var stockSearchValue = $('.search');
			lookUpButton.on('click', function(){
				var textbox = stockSearchValue.val();
				$.ajax({
					url: 'http://data.benzinga.com/stock/' + textbox,
					type: 'GET',
					dataType: 'jsonp',
					error: function(){
						alert('please enter a valid stock symbol!');
					},
					success: function(data){
						jsonStorage = data;
						console.dir(jsonStorage);
						view.updateStockName(jsonStorage.name);
						view.updateBidNumber(jsonStorage.bid);
						view.updateAskNumber(jsonStorage.ask);
					}
				});

			});
		},

		//buying stock functionality
		buyStock: function(){
			//the buy button
			var buyButton = $('.buy');
			//value of the text box next to the buy/sell button
			var quantityValue = $('.quantity');
			buyButton.on('click', function(){

				//gets value of the textbox
				var quantityToBuy = parseInt(quantityValue.text());
				//multiplies the textbox value by the ask number
				var pricePaid = quantityToBuy * view.updateAskNumber();
				//updates the quantity number on the right side with the amount
				//of shares you bought
				view.updateQuantity(quantityToBuy);
				//updates the price paid on the right based on when you bought the
				//stocks
				view.updatePrice(quantityToBuy);
				//updates the company name on the right side based on what company's
				//stocks you bought
				view.updateCompany(jsonStorage.name);

			}); //end of click function for the buy button
		}, //end of the buy stock functionality

		//sell stock functionality
		sellStock: function(){
			var sellButton = $('.sell');
		}
	}
