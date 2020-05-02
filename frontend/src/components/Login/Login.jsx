import React from 'react'
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';
import AuthStore from '../../stores/Auth.jsx';

import Input from '../Input/Input.jsx';

let fields =  [
        {
            name: 'login',
            type: 'text',
            label: 'Логин:',
            defaultNullValue: ''
        }, 
        {
            name: 'password',
            type: 'text',
            label: 'Пароль:',
            defaultNullValue: ''
        },    
    ];

@observer
class Login extends React.Component {
    constructor(props) {
        super(props);
        // величина, которая потом будет начальным состоянием
        let complexState = {

        }; 
        fields.map(({name, defaultNullValue}) => {
            complexState[name] = defaultNullValue;
        });
        this.state = complexState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }   
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event) {
        event && event.preventDefault();
        try {
            AuthStore.login(this.state["login"], this.state["password"]);
        } catch (error) {
            console.log(error);
        }
        return false;
    }
    render(props, state) {
        let message = "Начало";
        if (AuthStore.isAuthed)
        {
            message = "Добро пожаловать!";
        }        
        return <form onSubmit={this.handleSubmit}>              
            {
                fields.map(({name, label, type}) => {                    
                    return <Input key = {name} field={{ name, type, label, value: this.state[name] }} onChangeValue={this.handleChange}/>                
            })}         
            <div className = 'course-edit__field'>
                <input type="submit" value="Войти" />
            </div>         
            <div>{AuthStore.errorText}</div>
            <div>{AuthStore.isAuthed && message}</div>
            {AuthStore.isAuthed && <a href="/"> Перейти на главную страницу</a>}
        </form>
    }
}

export default Login;