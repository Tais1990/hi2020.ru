import React from 'react'
import PropTypes from 'prop-types';
//import styles from './VerticalNavigationalBar.scss';
import InfoStore from '../../stores/Info.jsx';
//import CoursesStore from '../../stores/Courses.jsx';

import Info from '../Info/Info.jsx';

import { observer } from 'mobx-react';

// компонент, который показывает список записей, который сворачиваются, разворачиваются при клике
// копоненты - получаем из сторе
// TO-DO
// возможно рассы тоже стоило так реализовать
@observer
class List extends React.Component {
    constructor(props) {
        super(props);
    }
    render(props, state) {
        let {title, type} = this.props;
        let list = type === 'news' ? InfoStore.getNews : InfoStore.getInfo;
        return ( 
            <div>
                <div>{title}</div>
                <div>{list && list.map (record => 
                    <Info 
                        title = {record.name} 
                        text = {record.description} 
                        key = {record.code}
                        type = {type}/>
                ) }</div>
            </div>
        )
    }
}
List.propTypes = {   
    title: PropTypes.string,
    type: PropTypes.oneOf(['news', 'info'])
};
export default List;