import { Card, CardMedia, Typography } from "@mui/material";
import { Pokemon } from "pokenode-ts";

interface Props {
  pokemon?: Pokemon;
}

const PokemonCard = (props: Props) => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        component="img"
        image={props.pokemon?.sprites.front_default || ""}
        alt="pokemon"
      />

      <Typography>Name: {props.pokemon?.name}</Typography>
      <Typography>Height: {props.pokemon?.height}</Typography>
      <Typography>Weight: {props.pokemon?.weight}</Typography>
      <Typography>
        Type:{" "}
        {props.pokemon?.types.map(
          (pokemonType, slot) => pokemonType.type.name + " "
        )}
      </Typography>
    </Card>
  );
};

export default PokemonCard;
