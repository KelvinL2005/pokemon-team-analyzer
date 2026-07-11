"use client";

import { useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import TeamSlot from "@/components/TeamSlot";
import Search from "@/components/Search";
import type { Pokemon } from "@/types/pokemon";

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  function handleSlotClick(index: number) {
    if (team[index]) {
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

  const teamTypes = new Set<string>();
  for (const member of team) {
    if (member) {
      for (const type of member.types) {
        teamTypes.add(type.type.name);
      }
    }
  }
  const uniqueTeamTypes = Array.from(teamTypes);

  return (
    <>
      {/* Sticky app header */}
      <header className="app-bar">
        <div className="app-bar-inner">
          <svg className="app-logo" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#E63946" />
            <path d="M2 12h20" stroke="#1E2233" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3.5" fill="#fff" stroke="#1E2233" strokeWidth="1.5" />
          </svg>
          <div className="app-titles">
            <span className="app-title">Team Analyzer</span>
            <span className="app-subtitle">Pokémon Toolkit</span>
          </div>
        </div>
      </header>

      <main className="page">
        {/* Search */}
        <div className="search-section">
          <Search
            search={searchTerm}
            setSearch={setSearchTerm}
            onSearch={getPokemon}
            isLoading={isLoading}
            hasError={!!error}
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        {/* Preview: loading skeleton, fetched Pokémon, or empty hint */}
        <div className="pokemon-display">
          {isLoading ? (
            <div className="skeleton-card">
              <div className="skeleton-box" style={{ width: 96, height: 96 }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton-box" style={{ width: "50%", height: 18, marginBottom: 10 }} />
                <div className="skeleton-box" style={{ width: "70%", height: 12, marginBottom: 14 }} />
                <div className="skeleton-box" style={{ width: "100%", height: 40 }} />
              </div>
            </div>
          ) : pokemon ? (
            <PokemonCard pokemon={pokemon} />
          ) : (
            <div className="empty-hint">
              Search for a Pokémon above, then tap a party slot below to add it.
            </div>
          )}
        </div>

        {/* Team */}
        <div className="team-section">
          <p className="section-eyebrow">
            <span>Party</span>
            <span>{teamCount} / 6</span>
          </p>
          <div className="team-grid">
            {team.map((teamPokemon, index) => (
              <TeamSlot
                key={index}
                pokemon={teamPokemon}
                onClick={() => handleSlotClick(index)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}