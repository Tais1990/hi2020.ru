import { observable, action, computed } from 'mobx';
var urlServer = MODE_NAME == "development" ? 'http://localhost:8080' : '';
// сторес, занимающийся авторизацией
class Auth {
	@observable isAuthed = null;
	@observable inProgress = false;
	@observable inProgressLogout = false;
	//@observable isSuccessful = false;
	@observable errorText = '';

	@observable values = {
		email: null,
		password: null,
		login: null,
		userID: null,
		isAdmin: false,
		name: null
	};
	constructor() {
		this.authMe(this);
	}	
// функция авторизации 
	@action login(login, password) {
		var curentStore = this;
		curentStore.inProgress = true;	
		curentStore.isAuthed = false;	
		
		fetch(`${urlServer}/api/login`, 
			{
				method: 'POST',
				headers: {
                	'Accept': 'application/json'
            	},
				body: JSON.stringify(
					{
						login: login, 
						password: password
					}
				)
			})
			.then(function(response) {
				if (response) {
					if (response.ok) {	
						console.log('авторизация прошла успешно')					
						curentStore.isAuthed = true;
						curentStore.errorText = '';
					}
					else
					{
						if (response.status == 401)
						{
							curentStore.errorText = 'Неверный логин и пароль'
						}
						else
						{
							curentStore.errorText = 'Неопазнаная ошибка'
						}
						curentStore.isAuthed = false;
					}
				}
				//return response;
			})			
			.catch(function(error) {
				curentStore.isAuthed = false;
				curentStore.errorText = error;
				console.log('Request failed', error);
			})
			.finally(action(() => {
				curentStore.inProgress = false;
			}));
	}
	// функция проверки, авторизованы мы или нет
	authMe(comp) {
		comp.inProgress = true;	
		comp.isAuthed = false;	
		
		fetch(`${urlServer}/api/auth/me`, 
			{
				method: 'GET',
			})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				//console.log('Request successful', data);
				if (data.resultCode == 0)
				{
					comp.values.email = null;
					comp.values.login = null;
					comp.values.userID = null;
					comp.values.isAdmin = null;
					comp.values.name = null;
					comp.isAuthed = false;
				}
				else
				{
					comp.isAuthed = true;
					comp.values.email = data.data.email;
					comp.values.login = data.data.login;
					comp.values.userID = data.data.userID;
					comp.values.isAdmin = data.data.isAdmin;
					comp.values.name = data.data.name;
				}
			})
			.catch(function(error) {
				comp.isAuthed = false;
				console.log('Request failed', error);
			})
			.finally(action(() => {
				comp.inProgress = false;
			}));
	}
	@action logout() {
		var curentStore = this;
		fetch(`${urlServer}/api/logout`, 
			{
				method: 'GET',
			})
			.then(function(response) {
				if (response) {
					if (response.ok) {
						curentStore.isAuthed = false;
						curentStore.values.email = null;
						curentStore.values.login = null;
						curentStore.values.userID = null;
						curentStore.values.isAdmin = null;
						curentStore.values.name = null;
					}
					else
					{
						curentStore.errorText = 'Неопазнаная ошибка'
					}
				}
			})	
			.catch(function(error) {
				curentStore.isAuthed = null;
				console.log('Request failed', error);
			})
			.finally(action(() => {
				//curentStore.inProgress = false;
			}));
	}	
}
export default new Auth();