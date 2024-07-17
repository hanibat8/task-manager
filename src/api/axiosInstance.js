import axios from 'axios';
// import store from '../app/store';

const axioInstance=axios.create({
    baseURL:'https://task-manager.codionslab.com/api/',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

export const setAuthToken=(token)=>{
    if(token)
        axioInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else {
        delete axioInstance.defaults.headers.common['Authorization'];
    }
}

export default axioInstance;