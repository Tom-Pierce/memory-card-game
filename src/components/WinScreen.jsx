export default function WinScreen({ restartGame }) {
  return (
    <div className="game-outcome-message bordered">
      <span>You Win!</span>
      <button type="button" className="bordered" onClick={restartGame}>
        GO AGANE?
      </button>
    </div>
  );
}
