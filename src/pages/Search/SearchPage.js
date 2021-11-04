import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getSearchResultsRequest } from "../../api/moviesAPI";
import classes from "./SearchPage.module.css";
import Movie from "../../components/Movies/Movie/Movie";
import Loading from "../../components/UI/Loading";

const SearchPage = () => {
  const params = useParams();
  const [searchResults, setSearchResults] = useState([]); // if empty array this means there are no results for this search
  const [searchResultsError, setSearchResultsError] = useState(null);
  const [requestsFinished, setRequestsFinished] = useState(false);


  useEffect(() => {
    const getSearchReults = async (pageNumber) => {
      const searchResponseResult = await getSearchResultsRequest(
        params.searchQuery , pageNumber
      );

      if (
        searchResponseResult.data 
      ) {
        // reponse success
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
      if(pageNumber === 4){//after the last call we want to set requests finished to true 
        setRequestsFinished(true);
      }
    };
    getSearchReults(1); //20 results added every call
    getSearchReults(2);
    getSearchReults(3);
    getSearchReults(4);
  }, []);

  // search results list
  const searchResultsList =
    (searchResults.length > 0) &&
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

  if (!searchResultsList && !requestsFinished) {
    return <Loading />
  }

  return (
    <section className="position-relative container mx-auto mt-5 pt-5 d-flex flex-column">
      <header>
        {searchResults.length != 0 ? (
          <h2 className={`${classes.header} pb-3`}>
            Search results for{" "}
            <span className={classes.query}>{params.searchQuery}</span>
          </h2>
        ) : (
          <div className={classes.no_results}>
            <h2 className={`${classes.header} pb-3`}>
              No results for{" "}
              <span className={classes.query}>{params.searchQuery}</span>
            </h2>
          </div>
        )}
      </header>
      <div className="row">{searchResultsList}</div>
    </section>
  );
};

export default SearchPage;
