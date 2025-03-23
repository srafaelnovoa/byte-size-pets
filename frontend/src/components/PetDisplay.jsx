import { Image } from "react-bootstrap";

const PetDisplay = ({ mood }) => (
  <div className="row border border-2 border-dark  mb-1">
    <div className="col-4 border-end border-dark">
      <Image src={mood.img} className="" alt={mood.text} />
    </div>
    <div className="col-8 my-auto"></div>
  </div>
);

export default PetDisplay;
