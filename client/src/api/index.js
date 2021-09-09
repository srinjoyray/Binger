import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` ;
    }
    return req;
});

export const addFav = ({id,poster,title,date,media_type,vote_average}) => API.patch(`/user/addFav/${id}/${poster}/${title}/${date}/${media_type}/${vote_average}`);
export const getUser = () => API.get(`/users`);

export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);