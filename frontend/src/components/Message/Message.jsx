import React from 'react'
import PropTypes from 'prop-types';

let messageProps = {
    notAuth : {
        message: 'К сожалению, Вы не авторизованы',
        linkLogin: true,
        linkHome: true
    },
    notAdmin : {
        message: 'К сожалению, Вы не админ',
        linkLogin: false,
        linkHome: true
    }
}
class Message extends React.Component {
    constructor(props) {
        super(props);       
    }   
    render(props, state) {
        let {type} = this.props; 
        let{message, linkLogin, linkHome} = messageProps[type];           
        return <div>
            <div>{message}</div>
            {linkLogin && <div><a href='/login'> Войти </a></div>}
            {linkHome && <div><a href='/'> На главную </a></div>}
        </div>
    }
}
Message.propTypes = {   
    type: PropTypes.oneOf(['notAuth', 'notAdmin']),
};
export default Message;