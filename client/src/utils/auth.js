import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from './storage';
const user = 'user';
const pass = 'password';


export const Authorization = (WrappedComponent) => {
    class WithAuthorization extends Component {
        isLOgined() {
            return api.localStor.get(user) && api.localStor.get(pass);
        }

        render() {
            if (this.isLOgined()) {
                console.log(WrappedComponent);
                return <WrappedComponent {...this.props} />;
            }
            return <Redirect to="/" />;
        }
    }

    return WithAuthorization;
}