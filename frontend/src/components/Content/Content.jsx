import React from 'react'
import PropTypes from 'prop-types';
import styles from './Content.scss';
import VerticalNavigationalBar from '../VerticalNavigationalBar/VerticalNavigationalBar.jsx';
import NewsBlock from '../NewsBlock/NewsBlock.jsx';

class Content extends React.Component {
    constructor() {
        super();
    }
    render(props, state) {
        let {children, raceCurrentCode} = this.props;
        return <div className = 'content__container'>
            <div className = 'content__container__menu'>{raceCurrentCode 
                ? <VerticalNavigationalBar raceCurrentCode = {raceCurrentCode}/> 
                : <VerticalNavigationalBar/>}
            </div> 
            <div className = 'content__container__content'>{children}</div>
            <div className = 'content__container__menu'><NewsBlock/> </div>         
        </div> 
    }
}
Content.propTypes = {
    children: PropTypes.any,
    raceCurrentCode: PropTypes.string
};
export default Content;