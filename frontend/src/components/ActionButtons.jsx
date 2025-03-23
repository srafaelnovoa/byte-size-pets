import { Button } from "react-bootstrap";

const ReviveButton = ({ isActive, revivePet }) => (
  <div className="row m-1">
    <div className="">
      {isActive ? (
        <></>
      ) : (
        <Button className="btn btn-danger m-2" onClick={revivePet}>
          Revive Pet
        </Button>
      )}
    </div>
  </div>
);

export default ReviveButton;
