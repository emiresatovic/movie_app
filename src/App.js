import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import SeacthIcon from './search.svg';

import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=8efe4437'

const movie1 = {
        "Title": "Italian Spiderman",
        "Year": "2007",
        "imdbID": "tt2705436",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYWNiMmNlNmQtZTI2MS00MzAxLTgxM2QtNDY3ZGQxNDMwZDgzXkEyXkFqcGc@._V1_SX300.jpg"
    }


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
       const response = await fetch(`${API_URL}&s=${title}`);
       const data = await response.json();

       setMovies(data.Search);
    }

    useEffect(() => {
       searchMovies('Spiderman');
    }, [])

    return (
        <div className="app">
            <h1>Watch Free Movies</h1>

            <div className="search">
                <input 
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                src={SeacthIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                  </div>
                ) : (
                 <div className="empty">
                    <h2>no movies found.</h2>
                 </div>

                )
            }
        </div>
    );
}

export default App;