import { Button } from "react-bootstrap";

const StatusBar = ({ label, value, isActive, action, actionValue }) => (
  <div className="row m-1">
    <div className="col-4 d-flex justify-content-end">{label}:</div>
    <div className="col-7 my-auto">
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
    <div className="col-1">
      {isActive ? (
        <Button
          className="btn btn-dark btn-sm mx-auto"
          onClick={() => action(actionValue)}
        >
          +
        </Button>
      ) : (
        <></>
      )}
    </div>
  </div>
);

const StatusBars = ({
  isActive,
  hunger,
  fun,
  energy,
  feedPet,
  playWithPet,
  restPet,
}) => (
  <div className="row border border-dark mb-2">
    <StatusBar
      label="Hunger"
      value={hunger}
      isActive={isActive}
      action={feedPet}
      actionValue={15}
    />
    <StatusBar
      label="Fun"
      value={fun}
      isActive={isActive}
      action={playWithPet}
      actionValue={20}
    />
    <StatusBar
      label="Energy"
      value={energy}
      isActive={isActive}
      action={restPet}
      actionValue={20}
    />
  </div>
);

export default StatusBars;
