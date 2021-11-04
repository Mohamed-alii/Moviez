import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/HomePage";
import UserFavourites from "./pages/UserFavourites/UserFavourites";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryMoviesPage from "./pages/CategoryMoviesPage";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import MainNavigation from "./components/Navbar/MainNavigation";
import { logout } from "./store/authSlice";
import { useLocation, useHistory } from "react-router";
import { db } from "./firebase";
import { storeUserData, clearUserData } from "./store/userDataSlice";
import { intiateHomePageData } from "./store/moviesSlice";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import SearchPage from "./pages/Search/SearchPage";
import Footer from "./components/Footer/Footer";
import ScrollUp from "./components/ScrollUp/ScrollUp";

export let timer;

function App() {
  const dispatch = useDispatch();
  const browserHistory = useHistory();
  const location = useLocation();
  const userToken = useSelector((state) => state.auth.token);
  const userEmail = useSelector((state) => state.auth.email);
  const expirationRemainingTime = useSelector(
    (state) => state.auth.expirationRemainingTime
  );
  const isAuthentiactionPage =
    location.pathname === "/Authentication" ||
    location.pathname === "/authentication";

  useEffect(() => {
    //we get the user favourates data from fire base and store them in the store
    const ref = db.collection("users");
    ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === userEmail) {
          // here we only get the data of our exact username
          let userData;
          userData = doc.data();
          dispatch(storeUserData(userData));
        }
      });
    });

    if (
      userToken &&
      expirationRemainingTime &&
      expirationRemainingTime >= 60000
    ) {
      timer = setTimeout(() => {
        dispatch(logout());
        dispatch(clearUserData());
        browserHistory.push("/Authentication");
      }, expirationRemainingTime);
    }
    // this action will trigger many api requests via redux saga to get all the home page data we need
    // home page data = trending movies , popualr trending series etc...
    dispatch(intiateHomePageData());
  }, []);

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
        <Route path="/Search/:searchQuery" render={(props) => <SearchPage {...props} key={props.location.key} />} >
        </Route>
        <Route path="/tv/:id" exact render={(props) => <MovieDetails {...props} key={props.location.key} />} >
        </Route>
        <Route path="/movie/:id" exact render={(props) => <MovieDetails {...props} key={props.location.key} />} > 
        </Route>
        {/* profile protected */}
        {userToken && (
          <Route path="/Favourites">
            <UserFavourites />
          </Route>
        )}
        <Route path="/category/:category">
          <CategoryMoviesPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      {!isAuthentiactionPage && <Footer />}
      <ScrollUp />
    </Fragment>
  );
}

export default App;
