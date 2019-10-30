import React from 'react'
import PropTypes from 'prop-types';
import styles from './Info.scss';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.changeState = this.changeState.bind(this);
    }
    changeState() {
        this.setState({isOpen: !this.state.isOpen})
    }
    render() {
        let {title, text} = this.props;        
        return ( 
            <div className = 'info'>               
                <div className = 'info info__title' onClick={this.changeState}>{title}</div>
                <div className = {`info info__text${this.state.isOpen ? '' : '__concealed'}` } dangerouslySetInnerHTML={{__html: text}}/>
            </div>
        )
    }
}
Info.propTypes = {   
    title: PropTypes.string,
    text: PropTypes.string
};
export default Info;