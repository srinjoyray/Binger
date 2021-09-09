import "./App.css";
import Header from "./components/Header/Header";
import BottomNav from './components/BottomNav/BottomNav';
import { BrowserRouter,Switch,Route,Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";

import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Search from './pages/Search/Search';
import Auth from './components/Auth/Auth';
import { Watchlist } from "./pages/Watchlist/Watchlist";

function App() {
  const user =JSON.parse(JSON.stringify(localStorage.getItem('profile')));
  return (
    <BrowserRouter>
      <Header/>
      <div className="App">
        <Container>
          <Switch>
            <Route path="/" exact component={Trending}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/series" component={Series}/>
            <Route path="/search" component={Search}/>
            {/* <Route path="/auth" component={Auth}/> */}
            {/* <Route path="/watchlist" component={Watchlist}/> */}
            <Route path="/watchlist"  component={()=> (user ? <Watchlist/> : <Redirect to="/auth" /> )} />
            <Route path="/auth" component={()=> (!user ? <Auth/> : <Redirect to="/" />)} />
          </Switch>

        </Container>
      </div>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
