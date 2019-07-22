import React from 'react';
import { Redirect } from 'react-router-dom';
import api from './../../utils/storage';
import server from './../../utils/server-communication';

const user = 'user';
const pass = 'password';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    async login() {
        const itemList = await server.getItemLIst(this.state.user, this.state.password);
        if (itemList.error || !(itemList instanceof Array)) {
            return alert('Login failled');
        }

        api.localStor.set(user, this.state.user);
        api.localStor.set(pass, this.state.password);
        this.setState({});
    }

    logout() {
        api.localStor.removeItem(user);
        api.localStor.removeItem(pass);
    } 

    render() {
        if (api.localStor.get(user) && api.localStor.get(pass)) {
            return <Redirect to="/list" />;
        }

        return (
            <div>
                <header className="App-header">
                    <input type="text" onChange={this.handleInputChange.bind(this)} value={this.state.user} name="user" placeholder="user"/>
                    <input type="password" onChange={this.handleInputChange.bind(this)} name="password" placeholder="password"/>
                    <button onClick={() => this.login()} className="login-btn">Login.</button>
                </header>
            </div>
        )
    }
}