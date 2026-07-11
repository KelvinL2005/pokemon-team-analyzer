import { useEffect, useRef, useState } from "react";
import { getAllPokemonNames } from "@/lib/pokemonList";

const MAX_SUGGESTIONS = 7;

export default function Search({
    search,
    setSearch,
    onSearch,
    isLoading,
    hasError,
}: {
    search: string;
    setSearch: (value: string) => void;
    onSearch: (value: string) => void;
    isLoading?: boolean;
    hasError?: boolean;
}) {
    const [allNames, setAllNames] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load the full Pokémon name list once on mount
    useEffect(() => {
        getAllPokemonNames().then(setAllNames);
    }, []);

    // Recompute matching suggestions whenever the search text changes
    useEffect(() => {
        const query = search.toLowerCase().trim();
        if (!query) {
            setSuggestions([]);
            setHighlightedIndex(-1);
            return;
        }

        // Prioritize names that START WITH the query, then names that just contain it
        const startsWith = allNames.filter((name) => name.startsWith(query));
        const contains = allNames.filter(
            (name) => !name.startsWith(query) && name.includes(query)
        );

        setSuggestions([...startsWith, ...contains].slice(0, MAX_SUGGESTIONS));
        setHighlightedIndex(-1);
    }, [search, allNames]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
        setShowDropdown(true);
    }

    function selectSuggestion(name: string) {
        setSearch(name);
        setShowDropdown(false);
        onSearch(name);
        inputRef.current?.blur();
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (!showDropdown || suggestions.length === 0) {
            if (event.key === "Enter") onSearch(search);
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setHighlightedIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
        } else if (event.key === "Enter") {
            if (highlightedIndex >= 0) {
                selectSuggestion(suggestions[highlightedIndex]);
            } else {
                setShowDropdown(false);
                onSearch(search);
            }
        } else if (event.key === "Escape") {
            setShowDropdown(false);
        }
    }

    return (
        <div className="search-container">
            <span
                className={`search-led ${isLoading ? "is-loading" : ""} ${hasError ? "is-error" : ""}`}
            />
            <div className="search-input-wrap">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                    ref={inputRef}
                    value={search}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
                    placeholder="Search Pokémon (e.g. pikachu)"
                    className="search-input"
                    role="combobox"
                    aria-expanded={showDropdown && suggestions.length > 0}
                    aria-autocomplete="list"
                />

                {showDropdown && suggestions.length > 0 && (
                    <ul className="search-dropdown">
                        {suggestions.map((name, index) => (
                            <li
                                key={name}
                                // onMouseDown (not onClick) fires before the input's onBlur closes the dropdown
                                onMouseDown={() => selectSuggestion(name)}
                                className={`search-suggestion ${index === highlightedIndex ? "is-active" : ""}`}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button
                onClick={() => onSearch(search)}
                disabled={isLoading}
                className="btn-primary"
            >
                {isLoading ? "Searching…" : "Search"}
            </button>
        </div>
    );
}