import { observable, action, computed } from 'mobx';
var urlServer = MODE_NAME == "development" ? 'http://localhost:8080' : '';

class Info {
	@observable news = [];	
	@observable isLoadNews = false;
	@observable info = [];	
	@observable isLoadInfo = false;

	constructor() {
		this.fetchAction(this);
	}	
	fetchAction(comp) {
		fetch(`${urlServer}/api/getInfoAll?type=news`, 
			{
				method: 'GET',
			})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				//console.log('Request successful', data);
				if (data != null)
				{				
			    	comp.news = data;
			    	comp.isLoadNews = true;
				}
			})
			.catch(function(error) {
				console.log('Request failed', error);
			});
		
		fetch(`${urlServer}/api/getInfoAll?type=info`, 
			{
				method: 'GET',
			})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				//console.log('Request successful', data);
				if (data != null)
				{				
			    	comp.info = data;
			    	comp.isLoadInfo = true;
				}
			})
			.catch(function(error) {
				console.log('Request failed', error);
			});			
	}

	@computed get getNews()
	{
		var result = [];
		if (this.isLoadNews)
		{			
			this.news.forEach(function (record) {
				var records = [];				
	   			result.push({"name" : record.name, "description" : record.description, "code": record.code})
			})
		}
		return result;
	}
	@computed get getInfo()
	{
		var result = [];
		if (this.isLoadInfo)
		{			
			this.info.forEach(function (record) {
				var records = [];				
	   			result.push({"name" : record.name, "description" : record.description, "code": record.code})
			})
		}
		return result;
	}

}

export default new Info();
