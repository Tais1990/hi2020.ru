import React from 'react'
import PropTypes from 'prop-types';
import styles from './HorizontalNavigationalBar.scss';
var menu = [
    {
        text: "Форум",
        link: "/"
    }, {
        text: "JOIN",
        link: "/"
    }, {
        text: "Орг. информсация",
        link: "/info"
    }, 
]

class HorizontalNavigationalBar extends React.Component {
    constructor() {
        super();
    }
    render(props, state) {
        
        return ( 
            <div className = 'horizontal-navigational-bar'>               
                { menu.map(elem => <a key = {elem.text} href = {elem.link}>{elem.text}</a>)}
            </div>
        )
    }
}
HorizontalNavigationalBar.propTypes = {

};
export default HorizontalNavigationalBar;