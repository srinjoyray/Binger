import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';

import './Post.css';
import {img_300, unavailable} from '../../config/config'
import { Badge, Button } from '@material-ui/core';
import PostModal from '../PostModal/PostModal';
import { addFav,getUser } from '../../actions/auth';
import { useEffect, useState } from 'react';

const Post = ({id,poster,title,date,media_type,vote_average}) => {
    
    
    
    const dispatch = useDispatch();
    // console.log(id,poster,title,date,media_type,vote_average);
    const [user, setUser] = useState(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile')))));
    if(typeof(user)===typeof('String')){
        setUser(JSON.parse(user));
        // console.log(user);
    }

    const checkFav = () => {
        if(!user){
            return false;
        }
        const watchlist = user?.result?.watchlist;
        const filtered =  watchlist.filter((item)=> String(item.id)===String(id));
        // console.log(watchlist);
        // console.log(id,filtered);
        if(filtered.length>0){
            return true;
        }
        return false;
    }
    const [Fav,setFav] = useState(checkFav());
    
    const userId = user?.result?._id;    
    // console.log(user?.result?.watchlist);

    // setIsFav(user?.result?.watchlist?.find((item)=> item.id === id ));
    // const currentUser = dispatch(getUser());
    // console.log(currentUser);  
    

    const handleFav = async() => {
        // console.log(id,title);
        await dispatch(addFav({id,poster,title,date,media_type,vote_average}));
        setUser(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile')))));
        setFav(checkFav());
        
    }

    
    return (
        <div className="media">
            <PostModal media_type={media_type} id={id}>
            
                <Badge badgeContent={vote_average} color={vote_average>=7 ? 'primary' : 'secondary'} />
                <img
                className="poster" 
                src={poster ? `${img_300}/${poster}` : unavailable} 
                alt={title} 
                />
                
            </PostModal>
            <b className="title">{title}</b>
            <span className="subTitle">
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{date}</span>
            </span>
            <Button size="small" color="secondary" disabled={!user?.result} onClick={handleFav}>
                {checkFav() ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
            </Button>
        </div>
    )
}

export default Post
