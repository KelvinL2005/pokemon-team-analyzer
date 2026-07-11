/**
 * Maps each Pokémon type name to a CSS class name used by TypeBadge for coloring.
 * Falls back to "type-normal" in TypeBadge if a type is missing here (shouldn't
 * happen for the 18 official types, but guards against PokeAPI adding new ones).
 */
export const typeColors: Record<string, string> = {
  fire: "type-fire",
  water: "type-water",
  grass: "type-grass",
  electric: "type-electric",
  psychic: "type-psychic",
  ice: "type-ice",
  dragon: "type-dragon",
  dark: "type-dark",
  fairy: "type-fairy",
  ghost: "type-ghost",
  normal: "type-normal",
  fighting: "type-fighting",
  flying: "type-flying",
  poison: "type-poison",
  ground: "type-ground",
  rock: "type-rock",
  bug: "type-bug",
  steel: "type-steel",
};