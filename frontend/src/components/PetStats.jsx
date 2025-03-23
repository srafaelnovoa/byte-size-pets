const PetStats = ({ timeAlive, timeBest, level }) => (
  <div className="row">
    <div className="row">
      <div className="col-5 d-flex justify-content-end">Level:</div>
      <div className="col-7 d-flex justify-content-start">{level}</div>
    </div>
    <div className="row">
      <div className="col-5 d-flex justify-content-end">Current Time:</div>
      <div className="col-7 d-flex justify-content-start">{timeAlive}</div>
    </div>
    <div className="row">
      <div className="col-5 d-flex justify-content-end">Best Time:</div>
      <div className="col-7 d-flex justify-content-start">{timeBest}</div>
    </div>
  </div>
);

export default PetStats;
