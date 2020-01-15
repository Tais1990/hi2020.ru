import React from 'react'
import PropTypes from 'prop-types';
import styles from './Info.scss';

import RaceStore from '../../stores/Race.jsx';
import { observer } from 'mobx-react';

@observer
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.changeState = this.changeState.bind(this);
    }
    changeState(openLocation) {
        this.setState({isOpen: !this.state.isOpen})
        // сообщаем сторе, что данная локация изменила видимость
        RaceStore.changeLocationsToOpen(this.props.code)
    }
    // перевычисление видимости и состояний в зависимости от данных сторе
    // фактически используется только для того, чтобы открыть при переходе по якорю
    forceOpenInfo(openLocation)
    {
        if (openLocation.includes(this.props.code) && !this.state.isOpen)
        {
            this.setState({isOpen: true});
        }
    }
    render() {
        let {title, text, code} = this.props; 
        // список открытых записей
        let openLocation = RaceStore.locationsOpen;  
        // используется для того, чтобы срабатывало, при изменении данных сторе
        let flag = RaceStore.locationsOpenCount;  
        this.forceOpenInfo(openLocation)  
        return ( 
            <div className = 'info'>
                <p><a  name = {code}/></p>               
                <div className = 'info info__title' onClick={() => {this.changeState(openLocation)}}>{title}</div>
                <div className = {`info info__text${this.state.isOpen ? '' : '__concealed'}` } dangerouslySetInnerHTML={{__html: text}}/>
            </div>
        )
    }
}
Info.propTypes = {   
    title: PropTypes.string,
    text: PropTypes.string,
    code: PropTypes.string
};
export default Info;