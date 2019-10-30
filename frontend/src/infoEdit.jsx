import './js/common.js'
import './assets/scss/main.scss'
import React from 'react'
import ReactDOM from "react-dom";

import InfoEdit from './components/InfoEdit/InfoEdit.jsx';

var urlServer = MODE_NAME == "development" ? 'http://localhost:8080' : '';
// TO-DO рапустить сюда крутилку и сообщдение об ошибках
ReactDOM.render(
	<div>       
		Идёт загрузка		
	</div>,
	document.getElementById("root")
);
// проверка значений типов
if (!(document.getElementById("typeInfo").value != null && document.getElementById("typeInfo").value != '' &&
		(document.getElementById("typeInfo").value === 'location' 
			|| document.getElementById("typeInfo").value === 'news' 
			|| document.getElementById("typeInfo").value === 'info')))
{
	ReactDOM.render(
		<div>       
			К сожалению данной страницы не существует.		
		</div>,
		document.getElementById("root")
	);
}
else
{
	if (document.getElementById("infoCode").value != null && document.getElementById("infoCode").value != '')
	{
		// если это редактирование карточки
		// вычисляем, с каким типом работаем
		var type = document.getElementById("typeInfo").value === 'location' ? 'Location' : 'Info';

		// сделать так, чтобы была фильтрация по типам

		fetch(`${urlServer}/api/get${type}?code=${document.getElementById("infoCode").value}`, 
			{
				method: 'GET',
			})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				//console.log('Request successful', data);
				if (data != null && data.ErrorText)
				{
					throw new Error(data.ErrorText);
				}
				if (data != null)
				{
					ReactDOM.render(
						<div className = 'course-wrapper'>
							Редактирование записи
							<InfoEdit data = {data} type = {document.getElementById("typeInfo").value}/>
						</div>
						, document.getElementById("root")
					);
				}
			})
			.catch(function(error) {
				console.log('Request failed', error)
				ReactDOM.render(
					<div>       
						К сожалению, при загрузке курса произошла ошибка: <br/> {error.message}
					</div>,
					document.getElementById("root")
				)
			});
	}
	else
	{
		// если это загрузка новой карточки
		// для начала, запросим новый код из бека
		fetch(`${urlServer}/api/getNewCode/${document.getElementById("typeInfo").value}`, 
			{
				method: 'GET',
			})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				if (data.code)
				{
					ReactDOM.render(
						<div className = 'course-wrapper'>
							Создание записи
							<InfoEdit code = {data.code} type = {document.getElementById("typeInfo").value}/>
						</div>
						, document.getElementById("root")
					)
				}
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
	}
}