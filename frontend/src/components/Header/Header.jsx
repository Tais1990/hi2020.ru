import React from 'react'
import PropTypes from 'prop-types';
import styles from './Header.scss';

class Header extends React.Component {
    constructor() {
        super();
    }
    render(props, state) {
        let logo = PARH_RESOURCE + 'img/webucator.png';
        return <div>
            <header>
                <div  className = 'header'>                    
                    Хеадер
                </div>
            </header>
            <div className='header-expansion'/>
        </div> 
    }
}
export default Header;