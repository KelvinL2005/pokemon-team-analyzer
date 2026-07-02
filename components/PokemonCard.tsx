type Props = {
  pokemon: any;
};

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-sprite">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>

      <h3 style={{ textTransform: "capitalize" }}>
        {pokemon.name}
      </h3>
    </div>
  );
}