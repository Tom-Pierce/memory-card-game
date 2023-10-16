export default function Cards({ pokemonObjList, handleClick }) {
  return (
    <div className="pokemon-cards">
      {pokemonObjList.map((pokemon) => {
        return (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={(event) => {
              handleClick(event, pokemon);
            }}
          >
            <img src={pokemon.src} alt="pokemon" />
            <span>{pokemon.name}</span>
          </div>
        );
      })}
    </div>
  );
}
