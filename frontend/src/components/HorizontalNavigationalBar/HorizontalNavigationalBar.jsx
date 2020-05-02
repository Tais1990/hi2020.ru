import React from 'react'
import PropTypes from 'prop-types';
import styles from './HorizontalNavigationalBar.scss';
//import AuthStore from '../../stores/Auth.jsx';
import AuthMenu from '../AuthMenu/AuthMenu.jsx';
var menu = [
    /*{
        text: "Форум",
        link: "/"
    }, {
        text: "JOIN",
        link: "/"
    },*/ {
        text: "Орг. информсация",
        link: "/info"
    }, 
]

class HorizontalNavigationalBar extends React.Component {
    constructor() {
        super();
    }
    render(props, state) {
        //AuthStore.authMe();
        //console.log(AuthStore.isAuthed) ;       
        return ( 
            <div className = 'horizontal-navigational-bar'>        
                <div>
                    { menu.map(elem => <a key = {elem.text} href = {elem.link}>{elem.text}</a>)}
                </div>
                <AuthMenu/>
            </div>
        )
    }
}
HorizontalNavigationalBar.propTypes = {

};
export default HorizontalNavigationalBar;