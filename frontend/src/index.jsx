import './js/common.js'
import './assets/scss/main.scss'
import React from 'react'
import ReactDOM from "react-dom";
import Header from './components/Header/Header.jsx';
import Content from './components/Content/Content.jsx';
import HorizontalNavigationalBar from './components/HorizontalNavigationalBar/HorizontalNavigationalBar.jsx';
import VerticalNavigationalBar from './components/VerticalNavigationalBar/VerticalNavigationalBar.jsx';
import NewsBlock from './components/NewsBlock/NewsBlock.jsx';

ReactDOM.render(
	<div>    
        <Header/>  
		<HorizontalNavigationalBar/>
        <Content>
        	<h1>Тут будет находится статический текст, который мне нужен
        	</h1>
        </Content>
        
	</div>,
	document.getElementById("root")
);