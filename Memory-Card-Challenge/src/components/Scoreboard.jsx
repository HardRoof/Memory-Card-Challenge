const Scoreboard = ({ score, bestScore }) => {
  return (
    <div className="header_scoreboard">
      <div className="scoreboard_score">
        <p>Score</p>
        <span>{score}</span>
      </div>
      <div className="scoreboard_bestScore">
        <p>Best score</p>
        <span>{bestScore}</span>
      </div>
    </div>
  );
};

export default Scoreboard;
