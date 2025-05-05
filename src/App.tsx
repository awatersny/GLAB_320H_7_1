import { useState, useEffect } from "react";
import "./App.css";

// Import our components
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  const apiKey = process.env.API_KEY

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // Function to get movies
  const getMovie = async(searchTerm: string) => {
    try {
      // Make fetch request and store the response
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      )
      // Parse JSON response into a JavaScript object
      const data = await response.json()
      // Set the Movie state to the received data
      setMovie(data)
    } catch (error) {
      console.error(error)
    }
  }

  // This will run on the first render but not on subsquent renders
  useEffect(() => {
    getMovie("Clueless");
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  )
}