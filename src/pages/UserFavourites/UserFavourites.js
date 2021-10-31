import React from "react";
import { useSelector } from "react-redux";
import classes from './UserFavourites.module.css'
import Movie from "../../components/Movies/Movie/Movie";

const UserSavedItems = () => {
  const favourites = useSelector((state) => state.userData);
  const favouriteMoviesLength =
    favourites.favourateMovies && favourites.favourateMovies.length;
  const favouriteTvLength =
    favourites.favourateTv && favourites.favourateTv.length;

    const favouriteMovies =
    favourites.favourateMovies &&
    favourites.favourateMovies.map((movie) => (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
        <Movie
          title={movie.title }
          img={movie.image}
          type='movie'
          id={movie.id}
        />
      </div>
    ));

    const favouriteTv =
    favourites.favourateTv &&
    favourites.favourateTv.map((movie) => (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
        <Movie
          title={movie.title }
          img={movie.image}
          type='tv'
          id={movie.id}
        />
      </div>
    ));

    return (
    <>
      <section className={`${classes['header-container']} container mt-5 text-white pt-5`}>
        <div className="row text-center">
          <div className="col-6">
            <h3>Favourite movies</h3>
            <h4>{favouriteMoviesLength}</h4>
          </div>
          <div className={`${classes["border-left"]} col-6`}>
            <h3>Favourite series</h3>
            <h4>{favouriteTvLength}</h4>
          </div>
        </div>
        <div className="horizontal-line mb-5 mt-4" ></div>
      </section>

      <section>
        <section className={`${classes["movie-container"]} container mx-auto row `}>
          <header>
            <h2 className={`${classes.header} mb-3 pb-3`}>Favourite movies</h2>
          </header>
          {favouriteMovies.length === 0 ? <p className={classes.empty}>No movies added</p> : favouriteMovies}
        </section>
      <div className="horizontal-line"></div>
      </section>

      <section>
        <section className={`${classes["movie-container"]} container mx-auto row `}>
          <header>
            <h2 className={`${classes.header} mb-3 pb-3`}>Favourite series</h2>
          </header>
          {favouriteTv.length === 0 ? <p className={classes.empty}>No series added</p> : favouriteTv}
        </section>
      </section>

    </>
  );
};

export default UserSavedItems;
