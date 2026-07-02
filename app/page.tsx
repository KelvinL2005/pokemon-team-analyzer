"use client";

import { useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import TeamSlot from "@/components/TeamSlot";
export default function Home() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [team, setTeam] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  async function getPokemon() {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/blastoise"
    );

    const data = await response.json();

    // store it in state (this triggers UI update)
    setPokemon(data);

  }

  function handleSlotClick(index: number) {
    if(!pokemon) {
      alert("Fetch a Pokémon first");
      return;
    }

    const newTeam = [...team];
    newTeam[index] = pokemon;
    setTeam(newTeam);
  }

  function addToTeam() {
    if (!pokemon) {
      alert("Fetch a Pokémon first");
      return;
    }

    if (team.length >= 6) {
      alert("Can only have max 6 Pokémon");
      return;
    }

    setTeam([...team, pokemon]);
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>

      <button onClick={getPokemon}>
        Fetch Pokémon
      </button>

      <button onClick={addToTeam}>
        Add to Team
      </button>

      {pokemon && (
        <PokemonCard pokemon={pokemon} />
      )}
      <div className="team">
        {Array.from({ length: 6 }).map((_, index) => (
          <TeamSlot
            key={index}
            pokemon={team[index]}
            onClick={() => handleSlotClick(index)}
          />
        ))}
      </div>

    </main>
  );
}