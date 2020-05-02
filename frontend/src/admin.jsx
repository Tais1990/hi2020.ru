import './js/common.js'
import './assets/scss/main.scss'
import React from 'react'
import ReactDOM from "react-dom";
import Admin from './components/Admin/Admin.jsx';
//import AuthStore from './stores/Auth.jsx';


ReactDOM.render(
	<div>
		<Admin/>
	</div>,
	document.getElementById("root")
);