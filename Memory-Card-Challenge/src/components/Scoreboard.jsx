const Scoreboard = ({ score, bestScore }) => {
  return (
    <div className="headerScoreboard">
      <div className="score">
        <p>Score:</p>
        <span>{score}</span>
      </div>
      <div className="bestScore">
        <p>Best score:</p>
        <span>{bestScore}</span>
      </div>
    </div>
  );
};

export default Scoreboard;
