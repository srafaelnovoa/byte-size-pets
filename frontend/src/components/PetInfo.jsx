const PetInfo = ({ petName, mood }) => (
  <div className="row border border-dark mb-1">
    <div className="row">
      <div className="col-4 d-flex justify-content-end">Pet Name:</div>
      <div className="col-8 d-flex justify-content-start">{petName}</div>
    </div>
    <div className="row">
      <div className="col-4 d-flex justify-content-end">Pet Mood:</div>
      <div className="col-8 d-flex justify-content-start">{mood.text}</div>
    </div>
  </div>
);

export default PetInfo;
