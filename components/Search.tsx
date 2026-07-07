export default function Search({
    search,
    setSearch,
    onSearch,
    isLoading,
}: {
    search: string;
    setSearch: (value: string) => void;
    onSearch: (value: string) => void;
    isLoading?: boolean;
}) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            onSearch(search);
        }
    }

    return (
        <div className="search-container flex gap-2">
            <input
                value={search}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search Pokémon"
                className="border rounded px-3 py-2"
            />
            <button
                onClick={() => onSearch(search)}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
            >
                {isLoading ? "Searching..." : "Search"}
            </button>
        </div>
    );
}