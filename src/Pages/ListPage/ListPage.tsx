import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import PokemonCard from "../../Components/PokemonCard";
import { NamedAPIResource, Pokemon } from "pokenode-ts";
import "./ListPage.css";

const ListPage = () => {
  const [error, setError] = useState();
  const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon"); //"https://pokeapi.co/api/v2/pokemon?limit=150"
        const pokemonList = await response.json();

        setPokemonList(pokemonList.results);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        for (let i = 0; i < pokemonList.length; i++) {
          const response = await fetch(pokemonList[i].url);
          const nextPokemon = (await response.json()) as Pokemon;

          setPokemons((prevState) => [...prevState, nextPokemon]);
        }
      } catch (err: any) {
        setError(err);
      }
    };

    fetchPokemons();
  }, [pokemonList]);

  const pokemonElement = pokemons.map((p) => {
    return <PokemonCard key={p.name} pokemon={p} />;
  });

  return (
    <>
      <NavBar />
      {error && <div>Something went wrong! Please try again.</div>}

      <div className="pokemons">{pokemonElement}</div>
    </>
  );
};

export default ListPage;
