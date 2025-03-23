// File: src/components/ActionButtons.jsx
import { Button } from "react-bootstrap";

const ActionButtons = ({
  isActive,
  feedPet,
  playWithPet,
  restPet,
  revivePet,
}) => (
  <div className="row">
    <div className="">
      {isActive ? (
        <>
          <Button className="btn btn-dark m-2" onClick={() => feedPet(15)}>
            Feed
          </Button>
          <Button className="btn btn-dark m-2" onClick={() => playWithPet(20)}>
            Play
          </Button>
          <Button className="btn btn-dark m-2" onClick={() => restPet(20)}>
            Rest
          </Button>
        </>
      ) : (
        <Button className="btn btn-danger m-2" onClick={revivePet}>
          Revive Pet
        </Button>
      )}
    </div>
  </div>
);

export default ActionButtons;
