import { observable, action, computed } from 'mobx';
var urlServer = MODE_NAME == "development" ? 'http://localhost:8080' : '';

class Race {
	@observable races = [];	
	@observable isLoadRaces = false;
	@observable locations = [];	
	@observable isLoadLocation = false;

	constructor() {
		this.fetchAction(this);
	}	
	fetchAction(comp) {
		/*TO_DO проверить, что сюда лишний раз не заходим*/
		fetch(`${urlServer}/api/getRaceAll`, 
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
			    	comp.races = data;
			    	comp.isLoadRaces = true;
				}
			})
			.catch(function(error) {
				console.log('Request failed', error);
			});
		
		fetch(`${urlServer}/api/getLocationAll`, 
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
			    	comp.locations = data;
			    	comp.isLoadLocation = true;
				}
			})
			.catch(function(error) {
				console.log('Request failed', error);
			});
			
	}

	@action getRaceByCode(code)
	{
		if (this.isLoadRaces)
		{
			var race = this.races.filter(race => race.code == code)[0];
			if (race)
			{
				return {"name": race.name, "description": race.description, "id": race.id};
			}
		}
		return null;
	}

	@action getLocationsByRace(codeRace)
	{
		var result = [];
		if (this.isLoadLocation)
		{	
			var race = this.getRaceByCode(codeRace);
			if (race)
			{				
				
				this.locations.filter(location => location.raceID == race.id)
					.forEach(location => 
						result.push({"name" : location.name, "description" : location.description, "code": location.code})
					) 
					
				return result;	
			}		
		}
		return result;
	}
}

export default new Race();