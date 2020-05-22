import { settings } from '../../constants/settings';

const serviceHelper = {

    signInPayload: function (email, password) {
        const payload = {
            email: email,
            password: password
        }

        return payload;
    },
    signUpPayload: function (username, email, password) {
        const payload = {
            username: username,
            email: email,
            password: password
        }

        return payload;
    },
    getUrlBase: function (path, method, body) {

        const urlBase = {
            urlApi: `${settings.urlApi}${path}`,
            headers: {
                method: method,
                body: JSON.stringify(body),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        }
        return urlBase
    },
}

export default serviceHelper;