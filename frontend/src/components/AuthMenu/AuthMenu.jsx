import React from 'react'
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styles from './AuthMenu.scss';
import AuthStore from '../../stores/Auth.jsx';

@observer
class AuthMenu extends React.Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }
    logout() {
        AuthStore.logout();
    }
    render(props, state) {
        return <div className='auth-menu'>
            {AuthStore.isAuthed && <div className = 'auth-menu__elem'> {AuthStore.values.name} </div>}
            {AuthStore.values.isAdmin && <a className = 'auth-menu__elem' href='/admin'>Панель администратора</a>}
            {!AuthStore.isAuthed && <a className = 'auth-menu__elem' href='/login'> Login</a>}
            {AuthStore.isAuthed && <div  className = 'auth-menu__elem' onClick = {this.logout}>Logout</div>}
        </div> 
    }
}
export default AuthMenu;