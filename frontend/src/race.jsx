import './js/common.js'
import './assets/scss/main.scss'
import React from 'react'
import ReactDOM from "react-dom";

import RaceInfo from './components/RaceInfo/RaceInfo.jsx';
import Header from './components/Header/Header.jsx';

if (document.getElementById("raceCode").value != null && document.getElementById("raceCode").value != '')
{
	//TO-DO Обработать несуществующий код
	ReactDOM.render(
		<div> 
			<Header/>   
			<RaceInfo code = {document.getElementById("raceCode").value}/>
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