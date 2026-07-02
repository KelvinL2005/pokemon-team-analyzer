
export default function TeamSlot({
    pokemon,
    onClick
}: {
    pokemon: any;
    onClick: () => void;
}) {
    return (

        <div className="team-slot" onClick={onClick}>
            <div className="pokemon-sprite">
                {
                    pokemon
                        ? <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                        />
                        : <div className="empty-slot" >+</div>
                }
            </div>
        </div>
    );
}
