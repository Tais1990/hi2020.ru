import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import styles from './MenuRecord.scss';

import RaceStore from '../../stores/Race.jsx';


class MenuRecord extends React.Component {
    constructor(props) {
        super(props);
        var isOpen_ = props.defaultStateOpen ? true : false;
        this.state = {isOpen : isOpen_}
        this.changeState = this.changeState.bind(this);
    }
    changeState() {
        this.setState({isOpen: !this.state.isOpen})
    }
    handleTitleClick(e, link) {
        e.preventDefault();
        this.changeState();
        if (typeof window !== 'undefined')
        {
            window.location.href = `${link}`;
        }
    }

    handleClick(e, link, code) {
        e.preventDefault();
        if (typeof window !== 'undefined')
        {
            window.location.href = `${link}`;
            RaceStore.addLocationsToOpen(code)
        }
    }
    render(props, state) {
        let {name, link, records} = this.props;
        return (
            <div className = 'menu-record'>
                <div className = 'menu-record__title' onClick = {(e) => {this.handleTitleClick(e, link)}} >{name}<span className = 'caret'/></div>
                <div className = {`menu-record__records${this.state.isOpen ? '' : '__concealed'}`}>
                    {records.map(record => 
                        <div key = {record.name} className = 'menu-record__record'>
                            <a href = {record.link} onClick={(e) => {this.handleClick(e, record.link, record.code)}}>{record.name}</a>
                        </div>
                    )}
                </div>
        	</div>
        )
    }
}

MenuRecord.propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    records: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            link: PropTypes.string
        })
    ),
    defaultStateOpen: PropTypes.bool
};

export default MenuRecord;
