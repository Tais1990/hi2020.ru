import './js/common.js'
import './assets/scss/main.scss'
import React from 'react'
import ReactDOM from "react-dom";

import List from './components/List/List.jsx';
import Header from './components/Header/Header.jsx';
import HorizontalNavigationalBar from './components/HorizontalNavigationalBar/HorizontalNavigationalBar.jsx';
import Content from './components/Content/Content.jsx';

if (document.getElementById("type").value != null && document.getElementById("type").value != ''
	&& (document.getElementById("type").value === 'news' || document.getElementById("type").value === 'info'))
{
	//TO-DO Обработать несуществующий код
	let title = document.getElementById("type").value === 'news' ? 'Новости' : 'Орг. информация'
	ReactDOM.render(
		<div> 
			<Header/>   
			<HorizontalNavigationalBar/>
			<Content>
				<List title = {title} type = {document.getElementById("type").value}/>
			</Content>
		</div>,
		document.getElementById("root")
	);
}
else
{
	ReactDOM.render(
		<div>       
			К сожалению такой страницы не существует
		</div>,
		document.getElementById("root")
	);

}