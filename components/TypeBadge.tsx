import { typeColors } from "@/constants/pokemonTypes";

export default function TypeBadge({ type }: { type: string }) {
    return (
        <span className={`type-badge ${typeColors[type] || "type-normal"}`}>
            {type}
        </span>
    );
}