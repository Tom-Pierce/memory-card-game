export default function LoseScreen({ restartGame }) {
  return (
    <div className="game-outcome-message bordered">
      <span>You Lose!</span>
      <button type="button" className="bordered" onClick={restartGame}>
        Try again... i guess
      </button>
    </div>
  );
}
