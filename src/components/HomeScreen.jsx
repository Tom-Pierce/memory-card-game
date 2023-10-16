export default function HomeScreen({
  setStartGame,
  numberOfCards,
  setNumberOfCards,
}) {
  return (
    <div className="home-screen">
      <button
        type="button"
        onClick={() => {
          setStartGame(true);
        }}
        className="start-game-btn"
      >
        Start Game
      </button>
      <label htmlFor="number-of-cards-input">
        <input
          type="number"
          name="number-of-cards"
          id="number-of-cards-input"
          value={numberOfCards}
          onChange={(event) => {
            setNumberOfCards(event.target.value);
          }}
        />
      </label>
    </div>
  );
}
