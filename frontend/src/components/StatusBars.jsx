// File: src/components/StatusBars.jsx
const StatusBar = ({ label, value }) => (
  <div className="row">
    <div className="col-4 d-flex justify-content-end">{label}:</div>
    <div className="col-8 my-auto">
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${value}%` }}
        >
          {value}%
        </div>
      </div>
    </div>
  </div>
);

const StatusBars = ({ hunger, fun, energy }) => (
  <div className="row border border-dark mb-2">
    <StatusBar label="Hunger" value={hunger} />
    <StatusBar label="Fun" value={fun} />
    <StatusBar label="Energy" value={energy} />
  </div>
);

export default StatusBars;
