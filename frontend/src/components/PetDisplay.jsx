import { Image } from "react-bootstrap";
import PetStats from "./PetStats";

const PetDisplay = ({ mood, highScore, level, score }) => (
  <div className="row border border-2 border-dark  mb-1">
    <div className="col-4 border-end border-dark text-center">
      <Image src={mood.img} className="img-fluid" alt={mood.text} />
    </div>
    <div className="col-8 my-auto">
      <PetStats highScore={highScore} level={level} score={score} />
    </div>
  </div>
);

export default PetDisplay;
