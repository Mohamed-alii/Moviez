import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getSearchResultsRequest } from "../../api/moviesAPI";
import classes from "./SearchPage.module.css";
import Movie from "../../components/Movies/Movie/Movie";

const SearchPage = () => {
  const params = useParams();
  const [searchResults, setSearchResults] = useState([]); // if empty array this means there are no results for this search
  const [searchResultsError, setSearchResultsError] = useState(null);
  let requestPageNumber = -1; //this varible is made to to if we get the same results

  useEffect(() => {
    const getSearchReults = async () => {
      const searchResponseResult = await getSearchResultsRequest(
        params.searchQuery
      );

      if (
        searchResponseResult.data &&
        searchResponseResult.data.data.page != requestPageNumber
      ) {
        // reponse success
        requestPageNumber = searchResponseResult.data.data.page;
        const searchResultsData = searchResponseResult.data.data.results;
        const updatedSearchResultsData = searchResultsData.filter(
          (query) => query.media_type !== "person" && query.poster_path !== null
        ); // we remove people => we need just movies and series
        setSearchResults((prevState) =>
          prevState.concat(updatedSearchResultsData)
        );
      } else {
        // error
        setSearchResultsError(searchResponseResult.error);
      }
    };
    getSearchReults(); //20 results added every call
    getSearchReults();
    getSearchReults();
    getSearchReults();
  }, []);

  // search results list
  const searchResultsList =
    searchResults &&
    searchResults.map((movie) => (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
        <Movie
          title={movie.title || movie.name}
          img={movie.poster_path}
          type={movie.media_type}
          id={movie.id}
        />
      </div>
    ));

    return (
    <section className="position-relative container mx-auto mt-5 pt-5">
      <header>
        {searchResults.length != 0 ? (
          <h2 className={`${classes.header} pb-3`}>
            Search results for{" "}
            <span className={classes.query}>{params.searchQuery}</span>
          </h2>
        ) : (
          <h2 className={`${classes.header} pb-3`}>
            No results for{" "}
            <span className={classes.query}>{params.searchQuery}</span>
          </h2>
        )}
      </header>
      <div className="row">{searchResultsList}</div>
    </section>
  );
};

export default SearchPage;
