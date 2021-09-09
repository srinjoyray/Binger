import { createTheme, ThemeProvider, TextField, Button , Tab,Tabs} from "@material-ui/core";
import { useEffect, useState } from "react";
import SearchIcon  from "@material-ui/icons/Search";
import './Search.css';
import axios from "axios";
import Post from "../../components/Post/Post";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Search = () => {
    const [type, setType] = useState(0);
    const [page,setPage] = useState(1);
    const [searchText,setSearchText] = useState("");
    const [posts,setPosts] = useState([]);
    const [numberOfPages,setNumberOfPages] = useState();
    const [currentSearch, setCurrentSearch] = useState();
    const darkTheme = createTheme({
        palette:{
            type:"dark",
            primary:{
                main:"#fff",
            },
        },
    });

    const fetchSearch = async() => {
        if(!searchText) return;
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
       
        setPosts(data.results);
        setNumberOfPages(data.total_pages);
        setCurrentSearch(searchText);
    }

    useEffect(() => {
        fetchSearch();
        window.scroll(0,0);
        
        
        // eslint-disable-next-line
    }, [type,page])

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div className="search-bar">
                    <TextField
                        style={{flex:1}}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e)=>setSearchText(e.target.value)}
                    />
                    <Button variant="contained" style={{marginLeft:10}} onClick={fetchSearch} > <SearchIcon/> </Button>
                </div>
                
                <Tabs 
                    value={type} 
                    indicatorColor="primary" 
                    textColor="primary"
                    onChange={(event,value)=>{
                        setType(value);
                        setPage(1);
                    }}
                >
                    <Tab style={{width:"50%"}} label="Search Movies" />
                    <Tab style={{width:"50%"}} label="Search TV Series" />
                </Tabs>

            </ThemeProvider>

            <div className="search">
                {posts && posts.map((post)=>(
                    <Post 
                        key={post.id}
                        id={post.id}
                        poster={post.poster_path}
                        title={post.title || post.name}
                        date={post.first_air_date || post.release_date}
                        media_type="movie"
                        vote_average={post.vote_average}
                    />
                ))}
            </div>
            {currentSearch && posts.length===0 && (type? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            {numberOfPages>1 &&  <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
            }
        </div>
    )
}

export default Search
