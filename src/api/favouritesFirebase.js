import { db } from "../firebase";

const addToFavourites = (type , userEmail, favourateMovies, favourateTv , currentMovie) => {
    if (type === "movie") {
        // first we check if the movie is already added before to favourates or not
        db.collection("users")
          .doc(userEmail)
          .set({
            favourateMovies: [...favourateMovies, currentMovie],
            favourateTv: [...favourateTv],
          });
      }else{
        // tv series
        db.collection("users")
          .doc(userEmail)
          .set({
            favourateMovies: [...favourateMovies],
            favourateTv: [...favourateTv, currentMovie],
          });
      }
}

const removeFromFavourites = (type , userEmail, favourateMovies, favourateTv , id) => {

    if (type === "movie") {
        const updatedFavouriteMovies = favourateMovies.filter(
          (movie) => movie.id !== id
        );
        db.collection("users")
          .doc(userEmail)
          .set({
            favourateMovies: [...updatedFavouriteMovies],
            favourateTv: [...favourateTv],
          });
      } else {
        const updatedFavouriteTv = favourateTv.filter(
          (tvSeries) => tvSeries.id !== id
        );
        db.collection("users")
          .doc(userEmail)
          .set({
            favourateMovies: [...favourateMovies],
            favourateTv: [...updatedFavouriteTv],
          });
      }
}

export { addToFavourites, removeFromFavourites };