import config from '@/config'
import store from '@/store'
export const userService = {
    login,
    logout
}

function login(username,password){
    const options = {
        method: 'POST',
        body: JSON.stringify({username: username,password: password})
    }
    return fetch(config.apiUrl + "/api/login",options)
            .then(handleResponse)
            .then(resp => {
                if(resp.access_token){
                    sessionStorage.setItem('auth',resp.access_token)
                    store.commit('login',resp.username)
                }
            })
    
}

function logout(){
    sessionStorage.removeItem('auth')
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                sessionStorage.removeItem('auth')
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}