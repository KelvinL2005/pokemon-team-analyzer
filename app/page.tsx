"use client";

import { useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import TeamSlot from "@/components/TeamSlot";
import Search from "@/components/Search";
import type { Pokemon } from "@/types/pokemon";

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // State to hold the currently fetched Pokémon either from the API or null if none is fetched
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null)); // Initialize team with 6 null slots
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Function to fetch Pokémon data from the API
  async function getPokemon(search: string) {
    const query = search.toLowerCase().trim();
    if (!query) {
      setError("Please enter a Pokémon name");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (!response.ok) {
        setError("Pokémon not found");
        setPokemon(null);
        return;
      }
      const data: Pokemon = await response.json();
      setPokemon(data);
    } catch {
      setError("Something went wrong fetching that Pokémon");
    } finally {
      setIsLoading(false);
    }
  }
  // Function to handle adding/removing Pokémon from the team
  function handleSlotClick(index: number) {
    if (team[index]) {
      // slot already filled -> clicking it removes the Pokémon
      const newTeam = [...team];
      newTeam[index] = null;
      setTeam(newTeam);
      return;
    }

    if (!pokemon) {
      setError("Fetch a Pokémon first");
      return;
    }

    const newTeam = [...team];
    newTeam[index] = pokemon;
    setTeam(newTeam);
  }

  const teamCount = team.filter(Boolean).length;

  return (
    <main className="page">
      {/* Header */}
      <div className="header">
        <h1 className="page-title">Pokémon Team Analyzer</h1>
      </div>
      <div className="search-section">

        {/* Search component for fetching Pokémon */}
        <Search
          search={searchTerm}
          setSearch={setSearchTerm}
          onSearch={getPokemon}
          isLoading={isLoading}
        />
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
      
      {/* Display the fetched Pokémon */}
      <div className="pokemon-display">
        {pokemon && <PokemonCard pokemon={pokemon} />}
      </div>
      <p className="team-count">Current team size: {teamCount} / 6</p>

      {/* Display the team slots */}
      <div className="team-grid">
          {team.map((teamPokemon, index) => (
            <TeamSlot
              key={index}
              pokemon={teamPokemon}
              onClick={() => handleSlotClick(index)}
            />
          ))}
        </div>
    </main>
  );
}