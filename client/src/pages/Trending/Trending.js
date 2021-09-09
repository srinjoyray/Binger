import { useEffect,useState } from "react";
import axios from "axios"

import Post from "../../components/Post/Post";
import './Trending.css';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Trending = () => {
    
    const [posts,setPosts] = useState([]);
    const [page,setPage] = useState(1);

    const fetchTrending = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        
        // console.log(data.results);
        setPosts(data.results);   
    }
    
    useEffect(() => {
        fetchTrending();

         // eslint-disable-next-line
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {posts && posts.map((post)=>(
                    <Post 
                    key={post.id}
                    id={post.id}
                    poster={post.poster_path}
                    title={post.title || post.name}
                    date={post.first_air_date || post.release_date}
                    media_type={post.media_type}
                    vote_average={post.vote_average}
                    />
                ))}
            </div>
            <CustomPagination setPage={setPage} />
        </div>
        
    )
}

export default Trending
