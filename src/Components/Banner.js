import { movies } from "./getMovies";

import React, { Component } from "react";

export class Banner extends Component {
  render() {
    let movie = movies.results[0];
    // console.log(movies);
    return (movie = "" ? (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    ) : (
        <div className="card banner-card">
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}   alt={movie.title} className="card-img-top banner-img"/>
        {/* <div className="card-body"> */}
            <h1 className="card-title banner-title">{movie.original_title}</h1>
            <p className="card-text banner-text">{movie.overview}</p>
            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        {/* </div> */}
        </div>
    ));
  }
}

export default Banner;
