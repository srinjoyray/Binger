import axios from "axios";
import { useState,useEffect } from "react";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../components/hooks/useGenre";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Post from "../../components/Post/Post";
import './Series.css';


const Series = () => {

    const [posts,setPosts] = useState([]);
    const [page,setPage] = useState(1);
    const [numberOfPages,setNumberOfPages] = useState();
    const [selectedGenres,setSelectedGenres] = useState([]);
    const [genres,setGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

    const fetchMovies = async() =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
       
        setPosts(data.results);
        setNumberOfPages(data.total_pages);

    }
    
    useEffect(() => {
        fetchMovies();
        
         // eslint-disable-next-line
    }, [page,genreforURL]);

    return (
        <div>
            <span className="pageTitle">Series</span>
            <Genres 
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="series">
                {posts && posts.map((post)=>(
                    <Post 
                    key={post.id}
                    id={post.id}
                    poster={post.poster_path}
                    title={post.title || post.name}
                    date={post.first_air_date || post.release_date}
                    media_type="tv"
                    vote_average={post.vote_average}
                    />
                ))}
            </div>
            {numberOfPages>1 &&  <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
            }
        </div>
    )
}

export default Series
