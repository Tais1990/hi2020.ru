import React from 'react'
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styles from './Admin.scss';
import AuthStore from '../../stores/Auth.jsx';
import Message from '../Message/Message.jsx';

@observer
class Admin extends React.Component {
    render(props, state) {
        return <div>
            {AuthStore.isAuthed && AuthStore.values.isAdmin && <div>
                Тут типо будет нормальная админка
            </div>}
            {AuthStore.isAuthed && !AuthStore.values.isAdmin && <Message type = 'notAdmin'/>}
            {!AuthStore.isAuthed && <Message type = 'notAuth'/>}    
        </div> 
    }
}
export default Admin;