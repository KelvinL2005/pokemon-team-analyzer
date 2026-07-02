


export default function Search({ search, setSearch, onSearch }: { search: string; setSearch: (value: string) => void; onSearch: (value: string) => void }) {

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
        onSearch(event.target.value);
    }

    return (
        <div className="search-container">
            <input
                value={search}
                onChange={handleChange}
                placeholder="Search Pokémon"
            />

            <button onClick={() => onSearch(search)}>
                Search
            </button>
        </div>

    );

}