import React from 'react'
import PropTypes from 'prop-types';
//import styles from './Info.scss';

import RaceStore from '../../stores/Race.jsx';
import { observer } from 'mobx-react';


import SummernoteEditor from '../SummernoteEditor/SummernoteEditor.jsx';
import Input from '../Input/Input.jsx';

var urlServer = MODE_NAME == "development" ? 'http://localhost:8080' : '';

let fields =  {
    location : [
        {
            name: 'raceID',
            type: 'select',
            label: 'Расса:',
            defaultNullValue: 0,
            selectContents: null
        },
        {
            name: 'name',
            type: 'text',
            label: 'Название:',
            defaultNullValue: ''
        }, 
        {
            name: 'order',
            type: 'number',
            label: 'Порядок:',
            defaultNullValue: 0
        },
        {
            name: 'description',
            type: 'summernote',
            label: 'Описание:',
            defaultNullValue: ''
        },    
    ],
    news : [
        {
            name: 'name',
            type: 'text',
            label: 'Название:',
            defaultNullValue: ''
        }, 
        {
            name: 'order',
            type: 'number',
            label: 'Порядок:',
            defaultNullValue: 0
        },
        {
            name: 'description',
            type: 'summernote',
            label: 'Описание:',
            defaultNullValue: ''
        }
    ],
    info : [
        {
            name: 'name',
            type: 'text',
            label: 'Название:',
            defaultNullValue: ''
        }, 
        {
            name: 'order',
            type: 'number',
            label: 'Порядок:',
            defaultNullValue: 0
        },
        {
            name: 'description',
            type: 'summernote',
            label: 'Описание:',
            defaultNullValue: ''
        }
    ]
};
const nameType = {
    location: 'Локация',
    news: 'Новость',
    info: 'Орг. информация'
}

@observer
class InfoEdit extends React.Component {
   
    constructor(props) {
        super(props);
        // величина, которая потом будет начальным состоянием
        let complexState = props.data ? 
        {
            code: props.data.code,          
            textError: '',
            type: 'edit',
            typeInfo: props.type
        } : {
            code: props.code,         
            textError: '',
            type: 'create',
            typeInfo: props.type
        }; 
        if (props.data) {
            fields[this.props.type].map(({name}) => {
                complexState[name] = this.props.data[name];
            })  
        } else {
            fields[this.props.type].map(({name, defaultNullValue}) => {
                complexState[name] = defaultNullValue;
            }) 
        }
        console.log(this.props.type);
        this.state = complexState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.complexChange = this.complexChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    complexChange(content, nameField) {
        this.setState({[nameField]: content});
    }

    handleSubmit(event) {
        event.preventDefault();
        // заполнем результат, который отправим на сервер
        let result = {
            code : this.state.code,
            type: this.state.type,
            typeInfo: this.props.type
        }
        console.log(this.props.type)
        fields[this.props.type].forEach((item) => {
            result[item.name] = this.state[item.name];
        })
        const type = this.props.type === 'location' ? 'Location' : 'Info';
        fetch(`${urlServer}/api/edit${type}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify( result )
        })
        // подключить обработку ошибки из базы
        .then(res => {
            if (typeof window !== 'undefined')
            {
                //window.location.href = "/courseAll";
            }})
        .catch(err => {
            console.log('ERROE');
            console.log(err);
        });
    }

    
    render(props, state) {
        // Заполнемя выпадашки
        const correspondence = [
            {
                fieldName: 'raceID',
                store: RaceStore.races
            }
        ]
        correspondence.forEach((item) => {
            if (fields[this.props.type].find(field => field.type === 'select' && field.name === item.fieldName))
            {
                fields[this.props.type].find(field => field.type === 'select' && field.name === item.fieldName)['selectContents'] = item.store;
            }
        });
        return <form className = 'course-edit' onSubmit={this.handleSubmit}>
            <div>{nameType[this.props.type]}</div>
            {
                fields[this.props.type].map(({name, label, type, selectContents}) => {                    
                    if (type === 'summernote')
                    {
                        return <SummernoteEditor key = {name} data = {this.state[name]} onChange = {(content) => {this.complexChange(content, name);}}/> 
                    } else {
                        return <Input key = {name} field={{ name, type, label, value: this.state[name], selectContents: selectContents }} onChangeValue={this.handleChange}/>
                    }
                }
            )}            
            <div className = 'course-edit__field'>
                <input type="submit" value="Отправить" />
            </div>         
            <div>{this.state.textError}</div>
        </form>
    }
}
InfoEdit.propTypes = {   
    data: PropTypes.any,
    code: PropTypes.string,
    type: PropTypes.oneOf(['location', 'news', 'info'])
};
export default InfoEdit;