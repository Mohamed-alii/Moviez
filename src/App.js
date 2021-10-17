import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./components/Auth/Auth";
import HomePage from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { Fragment } from "react";
import MainNavigation from "./components/Navbar/MainNavigation";
import { logout } from './store/authSlice';
import { useLocation , useHistory } from 'react-router';

export let timer;

function App() {
  const dispatch = useDispatch();
  const browserHistory = useHistory();
  const location = useLocation();
  const userToken = useSelector((state) => state.auth.token);
  const expirationRemainingTime = useSelector((state) => state.auth.expirationRemainingTime);
  const isAuthentiactionPage = location.pathname === '/Authentication' || location.pathname === '/authentication';


  useEffect(() => {
    
    if(userToken && expirationRemainingTime && expirationRemainingTime >= 60000){
      timer = setTimeout(() => {
        dispatch(logout());
        browserHistory.push('/Authentication')
      }, expirationRemainingTime);
    }

  }, [])

  return (
    <Fragment>
      {!isAuthentiactionPage && <MainNavigation />}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/Home" />
        </Route>
        <Route path="/Authentication" exact>
          <Auth />
        </Route>
        <Route path="/Home">
          <HomePage />
        </Route>
        {/* profile protected */}
        {userToken && (
          <Route path="/Profile">
            <Profile />
          </Route>
        )}
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
