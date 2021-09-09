import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';

const Header = () => {
    const classes = useStyles();
    
    const [user, setUser] = useState(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile')))));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // if(typeof(user)===typeof('String')){
    //     setUser(JSON.parse(user));
    //     // console.log(user);
    // }

    
    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile')))));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div  className={classes.heading}>        
                BINGER 🍿
            </div>
            <Toolbar>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name?.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" className={classes.login} >Signin</Button>
                )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header
 