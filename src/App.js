import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./components/Auth/Auth";
import HomePage from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
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
import MovieDetails from "./components/Movies/MovieDetails/MovieDetails";

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
        <Route path="/tv/:id" exact>
          <MovieDetails />
        </Route>
        <Route path="/movie/:id" exact>
          <MovieDetails />
        </Route>
        {/* profile protected */}
        {userToken && (
          <Route path="/Profile">
            <Profile />
          </Route>
        )}
        <Route path="/:category">
          <CategoryMoviesPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
