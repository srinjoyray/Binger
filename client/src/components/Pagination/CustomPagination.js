import { createTheme,ThemeProvider } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import './CustomPagination.css';

const darkTheme = createTheme({
    palette : {
        type: "dark",
    },
})

const CustomPagination = ({setPage,numberOfPages = 10}) => {

    const handlePageChange = (page) => {
        console.log(page);
        setPage(page);
        window.scroll(0,0);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="pagination">
                <Pagination 
                count={numberOfPages} 
                onChange={(event,value)=>handlePageChange(value)} 
                color="primary"
                />
            </div>
        </ThemeProvider>
    )
}

export default CustomPagination
