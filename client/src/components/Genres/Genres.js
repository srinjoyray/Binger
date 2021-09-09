import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({selectedGenres,setSelectedGenres,genres,setGenres,setPage,type}) => {
    
    const handleAdd = (genre) =>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g)=>g.id!==genre.id));
        setPage(1);
    }

    const handleRemove = (genre) =>{
        setGenres([...genres,genre]);
        setSelectedGenres(selectedGenres.filter((g)=>g.id!==genre.id));

        setPage(1);
    }

    const fetchGenres = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setGenres(data.genres);
    }
    
    useEffect(()=>{
        fetchGenres();

         // eslint-disable-next-line
    },[])

    return (
        <div style={{padding: "6px 0"}}>
            {selectedGenres && selectedGenres.map((genre)=>(
                <Chip 
                    key={genre.id}
                    label={genre.name}
                    style={{margin:2}}
                    clickable
                    size="small"
                    color="primary"
                    onDelete={()=>handleRemove(genre)}
                />
            ))}
            {genres && genres.map((genre)=>(
                <Chip 
                    key={genre.id}
                    label={genre.name}
                    style={{margin:2}}
                    clickable
                    size="small"
                    onClick={()=> handleAdd(genre)}
                />
            ))}
        </div>
    )
}

export default Genres
