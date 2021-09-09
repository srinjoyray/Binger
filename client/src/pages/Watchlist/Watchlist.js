import { useEffect,useState } from "react";
import axios from "axios"

import Post from "../../components/Post/Post";
import './Watchlist.css';

export const Watchlist = () => {

    const [user, setUser] = useState(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile')))));

    const watchlist = user?.result?.watchlist;

    // console.log(watchlist);

    return (
        <div>
            <span className="pageTitle">Watchlist</span>
            <div className="watchlist">
                {watchlist && watchlist.map((post)=>(
                    <Post 
                    key={post.id}
                    id={post.id}
                    // poster={`/${post.poster}`}
                    poster={post.poster}
                    title={post.title}
                    date={post.date}
                    media_type={post.media_type}
                    vote_average={post.vote_average}
                    />
                ))}
            </div>
        </div>
    )
}
