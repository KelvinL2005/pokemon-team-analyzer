import type { Pokemon } from "@/types/pokemon";

export default function TeamSlot({
  pokemon,
  onClick,
}: {
  pokemon: Pokemon | null;
  onClick: () => void;
}) {
  return (
    <div className="team-slot" onClick={onClick}>
      {pokemon ? (
        <div className="slot-filled">
          <img
            src={pokemon.sprites.front_default ?? ""}
            alt={pokemon.name}
            className="slot-image"
          />
          <p className="slot-name">{pokemon.name}</p>
        </div>
      ) : (
        <div className="slot-empty">
          <div className="plus">+</div>
          <p>Add Pokémon</p>
        </div>
      )}
    </div>
  );
}