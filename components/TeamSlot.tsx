import type { Pokemon } from "@/types/pokemon";

export default function TeamSlot({
  pokemon,
  onClick,
}: {
  pokemon: Pokemon | null;
  onClick: () => void;
}) {
  return (
    <div className="team-slot" onClick={onClick} role="button" tabIndex={0}>
      {pokemon ? (
        <div className="slot-filled">
          <span className="slot-remove-hint">✕</span>
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
          <p>Add</p>
        </div>
      )}
    </div>
  );
}