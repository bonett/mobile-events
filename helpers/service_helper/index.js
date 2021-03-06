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
    newEventPayload: function (title, description, storagePicture, userId, region) {
        const payload = {
            title: title,
            description: description,
            picture: storagePicture,
            id_user: userId,
            latitude: region.latitude,
            longitude: region.longitude,
            latitude_delta: region.latitudeDelta,
            longitude_delta: region.longitudeDelta
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
    saveImageOnStorage: async function (image) {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'dhk2sbwpg')
        data.append("cloud_name", "dhk2sbwpg")

        const response = await fetch(settings.storageUrl, {
            method: "POST",
            body: data
        }),

            res = await response.json();

        return res;
    },
    getUrlCreateEvent: function (status) {
        if (status === null) {
            return { url: `${settings.urlApi}events`, method: 'POST' };
        } else {
            return { url: `${settings.urlApi}events/${status.id_event}`, method: 'PUT' }
        }
    }
}

export default serviceHelper;