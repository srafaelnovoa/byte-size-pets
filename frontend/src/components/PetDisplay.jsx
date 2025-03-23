import { Image } from "react-bootstrap";

const PetDisplay = ({ mood }) => (
  <div className="row border border-5 border-dark bg-secondary">
    <div className="d-flex justify-content-center align-items-center">
      <Image
        src={mood.img}
        className="img-fluid bg-secondary"
        alt={mood.text}
        width="50%"
      />
    </div>
  </div>
);

export default PetDisplay;
