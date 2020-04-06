import React from 'react'
import PropTypes from 'prop-types';

class VerticalInfoBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render(props, state) {
        let {title, link, records} = this.props;        
        return ( 
            <div>
                <a href = {link}>{title}</a>
                <div>{records && records.map (record => <div key = {record.title}>{record.title}</div>) }</div>
            </div>
        )
    }
}
VerticalInfoBlock.propTypes = {   
    title: PropTypes.string,
    link: PropTypes.string,
    records: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            link: PropTypes.string
        })
    ),
};
export default VerticalInfoBlock;