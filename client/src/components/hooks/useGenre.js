import Genres from "../Genres/Genres";

const useGenre = (selectedGenres) => {
    if(selectedGenres.length===0) return "";
    
    const GenreIds = selectedGenres.map((g)=>g.id);
    return GenreIds.join(',');
}

export default useGenre;