// import { movies } from "./getMovies";
import React, { Component } from "react";
import axios from 'axios';
import { movies } from "./getMovies";

export class Movies extends Component {
  constructor() {
    super();
    let temp = JSON.parse(localStorage.getItem("movies-stored"));
    let temp2 = 
    console.log(JSON.parse(window.localStorage.getItem('state')));
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      hover: '',
      parr: [1],
      currPage: 1,
      movies: [],
      favorites: []
    }
    // console.log(JSON.parse(window.localStorage.getItem('state')));

  }

  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
    console.log(state);
  }


  async componentDidMount() {
    // side effects
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=68d6e9d16ff57d114dbf9a0a605c3bab&language=en-US&page=${this.state.currPage}`);
    let data = res.data;
    // console.log(data);
    this.setState(
      {
        ...this.state,
        movies: [...data.results]
      }
    )
  }

  changePage = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=68d6e9d16ff57d114dbf9a0a605c3bab&language=en-US&page=${this.state.currPage}`);
    let data = res.data;
    // console.log(data);
    this.setState(
      {
        ...this.state,
        movies: [...data.results]
      }
    )
  }

  handleNext = () => {
    let tempArr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      tempArr.push(i);
    }

    console.log(tempArr);
    this.setState(
      {
        ...this.state,
        parr: [...tempArr],
        currPage: this.state.currPage + 1
      }, this.changePage
    )
    // console.log(this.state.parr);

    // Here we have not called change page like below because setState is an asynchronous method, so we add a callback
    // to the setState method. Notice that we have just passed the function definition to the callback, we have not
    // called the function changePage.

    // this.changePage();
  }

  handlePrev = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          ...this.state,
          currPage: this.state.currPage - 1
        }, this.changePage
      )
    }



    // Here we have not called change page like below because setState is an asynchronous method, so we add a callback
    // to the setState method. Notice that we have just passed the function definition to the callback, we have not
    // called the function changePage.

    // this.changePage();

  }

  handleClick = (value) => {
    if (value != this.state.currPage) {
      this.setState({
        ...this.state,
        currPage: value
      }, this.changePage)
      // This means that setState method is asking that when I change the currPage to value, then call changePage.
    }
  }

  handleFavorites = async (movieObj) => {
    let oldData = await JSON.parse(localStorage.getItem("movies-stored") || "[]")
    if (this.state.favorites.includes(movieObj.id)) {
      oldData = oldData.filter((m) => m.id != movieObj.id);
    }
    else {
      oldData.push(movieObj);
    }
    localStorage.setItem("movies-stored", JSON.stringify(oldData));
    console.log(oldData);
    this.handleFavoritesState();


  }

  handleFavoritesState = async () => {
    let oldData = await JSON.parse(localStorage.getItem("movies-stored")) || "[]";
    let temp = [];
    temp = oldData.map((movie) => movie.id);
    await this.setState(
      {
        ...this.state,
        favorites: [...temp]
      }
    )
    console.log(this.state.favorites);

  }

  render() {
    // localStorage.setItem("state", this.state);

    // let movie = movies.results;
    return this.state.movies.length == 0 ? (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    ) : (
      <div>
        <h3 className="text-center">
          <strong>Trending</strong>
        </h3>
        <div className="movies-list">
          {this.state.movies.map((movieObj) => (
            <div className="card movie-card" onMouseEnter={() => this.setState({ ...this.state, hover: movieObj.id })} onMouseLeave={() => this.setState({ ...this.state, hover: '' })}>
              <img
                src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{ width: "20vw" }}
                alt={movieObj.title}
                className="card-img-top movie-img"
              />
              {/* <div className="card-body"> */}
              <h1 className="card-title movie-title">{movieObj.original_title}</h1>
              {/* <p className="card-text banner-text">{movie.overview}</p> */}
              <div className="button" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                {
                  this.state.hover == movieObj.id &&
                  <a className="btn btn-primary movies-button" onClick={() => this.handleFavorites(movieObj)}>{this.state.favorites.includes(movieObj.id) ? "Remove from favorites" : "Add to favorites"}</a>
                }

              </div>
              {/* </div> */}
            </div>
          ))}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination" style={{ justifyContent: "center" }}>
            <li className="page-item"><a class="page-link" onClick={this.handlePrev}>Previous</a></li>
            {
              this.state.parr.map((value) => (
                <li className="page-item"><a class="page-link" onClick={() => this.handleClick(value)} >{value}</a></li>
              ))
            }
            <li className="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Movies;
