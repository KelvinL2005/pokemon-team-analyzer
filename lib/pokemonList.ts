/**
 * Fetches and caches the full list of Pokémon names from PokeAPI.
 * Cached at module scope so it's only fetched once per page load,
 * no matter how many times the search component mounts/remounts.
 */
let cachedNames: string[] | null = null;
let inFlightRequest: Promise<string[]> | null = null;

export async function getAllPokemonNames(): Promise<string[]> {
  if (cachedNames) return cachedNames;
  if (inFlightRequest) return inFlightRequest;

  inFlightRequest = fetch("https://pokeapi.co/api/v2/pokemon?limit=1300")
    .then((res) => res.json())
    .then((data: { results: { name: string }[] }) => {
      cachedNames = data.results.map((p) => p.name);
      return cachedNames;
    });

  return inFlightRequest;
}