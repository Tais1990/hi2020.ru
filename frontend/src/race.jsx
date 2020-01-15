import './js/common.js'
import './assets/scss/main.scss'
import React from 'react'
import ReactDOM from "react-dom";

import RaceInfo from './components/RaceInfo/RaceInfo.jsx';
import Header from './components/Header/Header.jsx';
import HorizontalNavigationalBar from './components/HorizontalNavigationalBar/HorizontalNavigationalBar.jsx';
import VerticalNavigationalBar from './components/VerticalNavigationalBar/VerticalNavigationalBar.jsx';

if (document.getElementById("raceCode").value != null && document.getElementById("raceCode").value != '')
{
	//TO-DO Обработать несуществующий код
	ReactDOM.render(
		<div> 
			<Header/>   
			<HorizontalNavigationalBar/>
			<VerticalNavigationalBar raceCurrentCode = {document.getElementById("raceCode").value}/>
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