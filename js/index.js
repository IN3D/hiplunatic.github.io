$(document).ready(function () {
	//this updates the view based on the logic
	var view = {
		//this updates the stockname title
		updateStockName: function(stockName){
			var stockNameTitle = $('.leftSide h1');
			stockNameTitle.append(stockName);
		},
		//this updates the bid number
		updateBidNumber: function(bidNumber){
			var actualBidNumber = $('.bid p');
			actualBidNumber.append(bidNumber);
		},
		//this updates the ask number
		updateAskNumber: function(askNumber){
			var actualAskNumber = $('.ask p');
			actualAskNumber.append(askNumber);
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
		var stockValue = $('.search').val();

	};

	view.updateStockName("test");

	
});