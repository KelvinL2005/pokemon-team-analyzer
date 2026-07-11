import { typeColors } from "@/constants/pokemonTypes";

/**
 * Small colored pill showing a Pokémon type name (e.g. "fire", "water").
 * Color comes from the `typeColors` map + matching CSS classes (e.g. `.type-fire`).
 */
export default function TypeBadge({ type }: { type: string }) {
    return (
        <span className={`type-badge ${typeColors[type] || "type-normal"}`}>
            {type}
        </span>
    );
}