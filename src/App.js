import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favorites from './Components/Favorites';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* We have to show navbar on each page */}
        <Route path='/' exact render={(props) => (
          <>
          <Banner{...props}/>
          <Movies{...props}/>
          </>
        )} />
        <Route path='/favorites' component={Favorites} />
      </Switch>
      {/* <Banner/> */}
      {/* <Movies/> */}
      {/* <Favorites/> */}
    </Router>
  );
}

export default App;
