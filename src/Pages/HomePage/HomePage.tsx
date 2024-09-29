import { TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Pokemon } from "pokenode-ts";
import NavBar from "../../Components/NavBar";
import PokemonCard from "../../Components/PokemonCard";

const HomePage = () => {
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [inputText, setInputText] = useState("");

  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const fetchPokemon = async () => {
    if (inputText !== "") {
      setError(undefined);
      setLoading(true);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${inputText}`
        );
        const pokemon = (await response.json()) as Pokemon;

        setPokemon(pokemon);
        setButtonPressed(true);
      } catch (err: any) {
        setError(err);
        setButtonPressed(false);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <>
      <NavBar />
      <h1 className="header">Pokedex</h1>
      <p className="welcome">
        Welcome dear Trainer. Find your pokemon and goodluck in your adventures!
      </p>

      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          onChange={inputHandler}
        />

        <Button variant="outlined" onClick={fetchPokemon}>
          Search
        </Button>
      </div>

      <div>
        {isLoading && <div>Loading....</div>}
        {error && <div>Something went wrong! Please try again.</div>}

        {!isLoading && buttonPressed && <PokemonCard pokemon={pokemon} />}
      </div>
    </>
  );
};

export default HomePage;
