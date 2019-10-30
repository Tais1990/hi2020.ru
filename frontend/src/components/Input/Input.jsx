import React from 'react'
import PropTypes from 'prop-types';
import styles from './Input.scss';

class Input extends React.Component {
    constructor(props) {
        super(props);        
    } 
    changeHandler = (e) => {
        // пока делаем без обработки ошибок
        const { field } = this.props;
        const input = (e && e.target) || this.$input;
        field.value = input.value;
        this.props.onChangeValue && this.props.onChangeValue(e, input);        
    };   
    render() {
        let { name, label, type, value, selectContents } = this.props.field; 
        let inputElement;

        if (type === 'select' && selectContents) {
            inputElement = (<select ref={(node) => { this.$input = node; }}
                    name = {name} value={value} onChange={this.changeHandler}>
                    <option disabled value = {0} style = {{display: 'none'}}> -- select an option -- </option>
                    {selectContents.map(record => 
                        <option key = {record.id} value={record.id}>{record.name}</option>)
                    }                                     
                </select>)        
        } else {
            inputElement = (<input
                name={name}
                type={type}
                value={value || ''}
                onChange={this.changeHandler}                
                className=''//{className}
                ref={(node) => { this.$input = node; }}
            />);
        }
        return ( 
            <div className = ''>
                <label className='input__label'>
                    {label && <p className='input__label-text'>{label}</p>}
                    {inputElement}
                </label>
            </div> 
        )
    }
}
Input.propTypes = {
    onChangeValue: PropTypes.func,
    field: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        id: PropTypes.string,
        label: PropTypes.string,
        required: PropTypes.bool,
        value: PropTypes.any,
        error: PropTypes.string,
        selectContents: PropTypes.arrayOf(
                            PropTypes.shape({
                                id: PropTypes.number,
                                name: PropTypes.string
                            })
                        )
    }).isRequired
};
export default Input;