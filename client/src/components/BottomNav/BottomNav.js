import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom';

import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position : 'fixed',
    bottom: '0',
    backgroundColor:'#5bd9ff',
    zIndex: 100,
    
    
    
  }, 
 
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(()=>{
    if(value===0) history.push('/');
    else if(value===1) history.push('/movies');
    else if(value===2) history.push('/series');
    else if(value===3) history.push('/search');
    else if(value==4) history.push('/watchlist');
  },[value,history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      
      <BottomNavigationAction label="Trending" style={{color:'#0a1326',fontFamily:'Urbanist',}} icon={<WhatshotIcon />} />
      
      <BottomNavigationAction label="Movies"  style={{color:'#0a1326',fontFamily:'Urbanist',}} icon={<MovieIcon />} />
      

      <BottomNavigationAction label="TV Series"  style={{color:'#0a1326',fontFamily:'Urbanist',}} icon={<TvIcon />} />

      <BottomNavigationAction label="Search"  style={{color:'#0a1326',fontFamily:'Urbanist',}} icon={<SearchIcon />} />

      <BottomNavigationAction label="Watchlist"  style={{color:'#0a1326',fontFamily:'Urbanist',}} icon={<WatchLaterIcon />} />

    </BottomNavigation>
  );
}