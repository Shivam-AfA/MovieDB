import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currGenre: "All genres",
      movies: [],
      currGenre: "All genres",
      currSearchText: "",
      titlesPerPage: 5,
      currPage: 1
    }
  }

  // componentDidMount avoids our page from appearing laggy.
  componentDidMount() {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let data = JSON.parse(localStorage.getItem("movies-stored") || "[]")

    let temp = [];
    data.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]]))
        temp.push(genreids[movieObj.genre_ids[0]]);
    })
    temp.unshift("All genres");
    this.setState({
      genres: [...temp],
      movies: [...data]
    })
  }

  handleGenreClick = (genre) => {
    this.setState(
      {
        currGenre: genre
      }
    )
  }


  sortPopularityAsc = () => {
    let temp = this.state.movies;
    temp.sort((a, b) => {
      return a.popularity - b.popularity;
    })
    this.setState({
      movies: [...temp]
    })
  }


  sortPopularityDesc = () => {
    let temp = this.state.movies;
    temp.sort((a, b) => {
      return b.popularity - a.popularity;
    })
    this.setState({
      movies: [...temp]
    })
  }

  sortRatingAsc = () => {
    let temp = this.state.movies;
    temp.sort((a, b) => {
      return a.vote_average - b.vote_average;
    })
    this.setState({
      movies: [...temp]
    })
  }


  sortRatingDesc = () => {
    let temp = this.state.movies;
    temp.sort((a, b) => {
      return b.vote_average - a.vote_average;
    })
    this.setState({
      movies: [...temp]
    })
  }

  handlePageChange = (page) => {
    this.setState({
      currPage: page
    })
  }

  handleDelete = (id) => {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let newarr = [];
    newarr = this.state.movies.filter((m) => m.id != id)
    this.setState({
      movies: [...newarr]
    })

    localStorage.setItem("movies-stored",JSON.stringify(newarr));

    let temp = newarr.map((m) => m.id);

    let temp2 = JSON.parse(localStorage.getItem("state"));

    temp2.favorites = [...temp];

    localStorage.setItem("state",JSON.stringify(temp2));
  }
  render() {
    // const movie = movies.results;
    // console.log(movie);
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    // console.log(this.state.genres);
    let filterarr = [];

    if (this.state.currSearchText == "")
      filterarr = this.state.movies;

    else
      filterarr = this.state.movies.filter((movieObj) => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currSearchText.toLowerCase())
      })
    // if (this.state.currGenre == "All genres")
    //   filterarr = this.state.movies;

    if (this.state.currGenre != "All genres")
      filterarr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currGenre)

    let pages = Math.ceil(filterarr.length / this.state.titlesPerPage);
    let pagesarr = [];
    for (let i = 1; i <= pages; i++) {
      pagesarr.push(i);
    }

    let si = (this.state.currPage - 1) * this.state.titlesPerPage;
    let ei = si + this.state.titlesPerPage;

    filterarr = filterarr.slice(si, ei);


    return (
      <div>
        <>
          <div className='main'>
            <div className='row'>
              <div className='col-3'>
                <ul class="list-group favorites-genre">
                  {
                    this.state.genres.map((genre) => (
                      genre == this.state.currGenre ?
                        <li class="list-group-item" style={{ backgroundColor: "#3f51b5", color: "white", fontWeight: "bold" }}>{genre}</li>
                        : <li class="list-group-item" style={{ backgroundColor: "white", color: "#3f51b5", fontWeight: "bold" }} onClick={() => this.handleGenreClick(genre)}>{genre}</li>

                    ))
                  }
                </ul>
              </div>

              <div className='col-9 favorites-table'>
                <div className='row'>
                  <input type="text" className='input-group-text col' placeholder='Search' val={this.state.currSearchText} onChange={(e) => this.setState({ currSearchText: e.target.value })} />
                  <input type="number" className='input-group-text col' placeholder='Titles per page' val={this.state.titlesPerPage} onChange={(e) => {
                    if (e.target.value == 0)
                      this.setState({ titlesPerPage: 5 })
                    else
                      this.setState({ titlesPerPage: e.target.value })
                  }} />
                </div>
                <div className='row'>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                          <g>
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            <rect class="btn" x="0" y="0" width="10" height="10" onClick={this.sortPopularityDesc} />
                          </g>

                        </svg> Popularity <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">

                            <g>
                              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                              <rect class="btn" x="0" y="0" width="10" height="10" onClick={this.sortPopularityAsc} />
                            </g>

                          </svg></th>
                        <th scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                          <g>
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            <rect class="btn" x="0" y="0" width="10" height="10" onClick={this.sortRatingDesc} />
                          </g>

                        </svg> Rating <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <g>
                              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                              <rect class="btn" x="0" y="0" width="10" height="10" onClick={this.sortRatingAsc} />
                            </g>

                          </svg></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filterarr.map((movieObj) => (
                          <tr>
                            <td style={{ fontWeight: "bold" }}><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{ width: "5rem", margin: "7px" }}></img>{movieObj.original_title}</td>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td style={{ textAlign: "justify" }}>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>

                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div className='row'>
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      {
                        pagesarr.map((page) =>
                        (
                          <li class="page-item"><a class="page-link" onClick={() => this.handlePageChange(page)} >{page}</a></li>
                        ))
                      }
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>

      </div>
    )
  }
}
