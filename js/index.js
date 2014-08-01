$(document).ready(function () {
	//this updates the view based on the logic
	var view = {
		//this updates the stockname title
		updateStockName: function(stockName){
			var stockNameTitle = $('.leftSide h1');
			stockNameTitle.html(stockName);
		},
		//this updates the bid number
		updateBidNumber: function(bidNumber){
			var actualBidNumber = $('.bid p');
			actualBidNumber.html(bidNumber);
		},
		//this updates the ask number
		updateAskNumber: function(askNumber){
			var actualAskNumber = $('.ask p');
			actualAskNumber.html(askNumber);
		},
		//this updates the company name under portfolio
		updateCompany: function(companyPortfolio){
			var updateCompPort = $('.company p');
			updateCompPort.append('<p>' + this.updateStockName + '</p>');
		},
		//this updates quantity of each stock
		updateQuantity: function(quantityPortfolio){
			var updateQuantityPort = $('.quantity p');
			updateQuantityPort.append(quantityPortfolio);
		},
		//this updates the price paid for ech stock
		updatePrice: function(pricePortfolio){
			var updatePricePort = $('.pricePaid p');
			updatePrice.append(pricePortfolio);
		}
	};

	var model = {
		stockSearchValue: $('.search')
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
						view.updateAskNumber(jsonStorage.ask)
					}
				});

			});
		}

	}

	controller.lookupStock();

});