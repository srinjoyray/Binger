import { AUTH,ADD_FAV } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData,history) => async(dispatch)=>{
    try{
        const {data} = await api.signIn(formData);

        dispatch({type:AUTH,data});

        history.push('/');
    } catch(error){
        console.log(error);
    }
}

export const signup = (formData,history) => async(dispatch)=>{
    try{
        const {data} = await api.signUp(formData);

        dispatch({type:AUTH,data});

        history.push('/');
    } catch(error){
        console.log(error);
    }
}

export const addFav = ({id,poster,title,date,media_type,vote_average}) => async (dispatch) => {
    // poster = poster.substring(1);
    id=String(id);
    vote_average=String(vote_average);
    title=encodeURIComponent(title);
    poster=encodeURIComponent(poster);
    // console.log({id,poster,title,date,media_type,vote_average});
    try {
      const { data } = await api.addFav({id,poster,title,date,media_type,vote_average});
      // console.log(data);

    let storage = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile'))));
    storage.result = data;
    // console.log(storage.result);
    localStorage.setItem('profile',JSON.stringify(storage));
    //   dispatch({ type: ADD_FAV, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const getUser = () => async (dispatch) => {
    try {
    //   dispatch({type : START_LOADING});
      const { data } = await api.getUser();
      
    //   dispatch({ type: FETCH_ALL, payload: data });
    //   dispatch({type : END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
};