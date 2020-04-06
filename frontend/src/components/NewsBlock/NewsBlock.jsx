import React from 'react'
import PropTypes from 'prop-types';
import InfoStore from '../../stores/Info.jsx';
import VerticalInfoBlock from '../VerticalInfoBlock/VerticalInfoBlock.jsx';

import { observer } from 'mobx-react';

var urlServer = MODE_NAME == "development" ? 'http://localhost:8080' : '';
@observer
class NewsBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render(props, state) {
        var news = InfoStore.news;
        var isLoad = InfoStore.isLoadNews;
        var records = [];
        news.forEach(item => 
            records.push({
                "title" : item.name, 
                "link": ''})
        )
        return ( 
            <VerticalInfoBlock title = 'Новости' link = {`${urlServer}/news`} records = {records}/>
        )
    }
}
NewsBlock.propTypes = {   
    
};
export default NewsBlock;