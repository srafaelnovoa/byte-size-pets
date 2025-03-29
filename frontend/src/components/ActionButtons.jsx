import { Button } from "react-bootstrap";

const ReviveButton = ({ isActive, score, revivePet }) => (
  <div className="row m-1">
    <div className="text-center">
      {isActive ? (
        <></>
      ) : score == 0 ? (
        <Button className="btn btn-primary m-2" onClick={revivePet}>
          Start
        </Button>
      ) : (
        <Button className="btn btn-danger m-2" onClick={revivePet}>
          Revive Pet
        </Button>
      )}
    </div>
  </div>
);

export default ReviveButton;
