import type { Pokemon } from "@/types/pokemon";
import { typeColors } from "@/constants/pokemonTypes";
import TypeBadge from "./TypeBadge";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
    return (
        <div className="pokemon-card">
            <div className="pokemon-sprite">
                <img
                    src={pokemon.sprites.front_default ?? ""}
                    alt={pokemon.name}
                />
            </div>
            <div className="pokemon-info">
                <h3 className="poke-name">
                    {pokemon.name}
                </h3>

                <div className="poke-types">
                    {pokemon.types.map((t) => (
                        <TypeBadge
                            key={t.type.name}
                            type={t.type.name}
                        />
                    ))}
                </div>

                <div className="poke-stats">
                    {pokemon.stats.map((stat) => (
                        <p key={stat.stat.name} className="poke-stat">
                            {stat.stat.name}: {stat.base_stat}
                        </p>
                    ))}
                </div>
            </div>

        </div>
    );
}