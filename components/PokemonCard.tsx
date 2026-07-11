import type { Pokemon } from "@/types/pokemon";
import TypeBadge from "./TypeBadge";

function getStatTier(value: number): "low" | "mid" | "high" {
    if (value < 50) return "low";
    if (value < 100) return "mid";
    return "high";
}

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
                <h3 className="poke-name">{pokemon.name}</h3>

                <div className="poke-types">
                    {pokemon.types.map((t) => (
                        <TypeBadge key={t.type.name} type={t.type.name} />
                    ))}
                </div>

                <div className="poke-stats">
                    {pokemon.stats.map((stat) => {
                        const tier = getStatTier(stat.base_stat);
                        return (
                            <div key={stat.stat.name} className="poke-stat">
                                <span>{stat.stat.name}</span>
                                <div className="poke-stat-bar">
                                    <div
                                        className={`poke-stat-bar-fill stat-${tier}`}
                                        style={{ width: `${Math.min((stat.base_stat / 180) * 100, 100)}%` }}
                                    />
                                </div>
                                <span className={`poke-stat-value stat-text-${tier}`}>
                                    {stat.base_stat}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}