const PetStats = ({ highScore, level, score }) => (
  <div className="row">
    <div className="row">
      <div className="col-5 d-flex justify-content-end">Level:</div>
      <div className="col-7 d-flex justify-content-start">{level}</div>
    </div>
    <div className="row">
      <div className="col-5 d-flex justify-content-end">Current Score:</div>
      <div className="col-7 d-flex justify-content-start">{score}</div>
    </div>
    <div className="row">
      <div className="col-5 d-flex justify-content-end">High Score:</div>
      <div className="col-7 d-flex justify-content-start">{highScore}</div>
    </div>
  </div>
);

export default PetStats;
