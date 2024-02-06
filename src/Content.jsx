import { Signup } from "./Signup";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { MoviesIndex } from "./MoviesIndex";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";

export function Content() {
  //placeholder data
  // const movies = [
  //   {id: 1, title:" Young Dorothy Gale and her dog Toto are swept away by a tornado from their Kansas farm to the magical Land of Oz, and embark on a quest with three new friends to see the Wizard, who can return her to her home and fulfill the others' wishes.", rating: "G", year: 1939, image_url: "https://www.movieposters.com/cdn/shop/products/40efaf8d75d26f5ab46d23214da5efed_353ef25c-fcfa-4d23-a942-c3d0e093c508_480x.progressive.jpg?v=1573594914", director_id: 10}, 
  //   {id: 2, title:"A Clockwork Orangee", description: "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.", rating: "R", year: 1971, image_url: "https://www.movieposters.com/cdn/shop/products/A70-10327_480x.progressive.jpg?v=1576163376", director_id: 10},
  // ]

  const [movies, setMovies] = useState([]);
  const handleIndexMovies = () => {
    console.log("handleIndexMovies");
    axios.get("http://localhost:3000/movies.json").then((response) => {
      console.log(response.data);
      setMovies(response.data);
    });
  };

  useEffect(handleIndexMovies, []);

  return (
    <main>
      <h1>The Cinemalist.</h1>
      <Signup/>
      <Login/>
      <Logout/>
      <MoviesIndex movies = {movies}/>
      <Modal show ={true}>
        <h1>test</h1>
      </Modal>
    </main>
  )
}
