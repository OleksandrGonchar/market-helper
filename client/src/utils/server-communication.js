import api from './storage';

export default {
    getItemLIst: async (user = api.localStor.get('user'), password = api.localStor.get('password'), ) => {
        const body = {
            user: user,
            key: password
        };
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    
        const responce = await fetch('http://market-store-helper.herokuapp.com/api/database', {
            body: JSON.stringify(body),
            headers,
            mode: 'cors',
            method: 'POST'
        }).catch(fail => console.log('Fail responce:', fail));

        if (!responce || (responce && !responce.ok)) {
            return Promise.reject();
        }
        return await responce.json();
    },
}