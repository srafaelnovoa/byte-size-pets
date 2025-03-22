import { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

function App() {
  const objMood = {
    happy: { text: "Happy 😊", img: "/images/bunny-happy.svg" },
    tired: { text: "Tired 😴", img: "/images/bunny-tired.svg" },
    hunger: { text: "Hungry 🍖", img: "/images/bunny-hungry.svg" },
    bored: { text: "Bored 😐", img: "/images/bunny-bored-revised.svg" },
    excited: { text: "Excited 😆", img: "/images/bunny-excited.svg" },
    content: { text: "Content 😌", img: "/images/bunny-content.svg" },
    exhausted: { text: "Exhausted 😥", img: "/images/bunny-tired.svg" }, // Added exhausted state
  };

  const [hunger, setHunger] = useState(60);
  const [energy, setEnergy] = useState(60);
  const [fun, setFun] = useState(60);
  const [mood, setMood] = useState(objMood.happy);
  const [isActive, setIsActive] = useState(true); // Track if pet is active

  const intervalRef = useRef(null); // Create a ref to store the interval ID

  const feedPet = (amt) => {
    if (!isActive) return; // Prevent interaction if pet is exhausted
    setHunger((prevHunger) => {
      return Math.min(100, Math.max(0, prevHunger + amt));
    });
  };

  const playWithPet = (amt) => {
    if (!isActive) return; // Prevent interaction if pet is exhausted
    setFun((prevFun) => Math.min(100, Math.max(0, prevFun + amt)));
    setEnergy((prevEnergy) => Math.min(100, Math.max(0, prevEnergy - amt / 2))); // Playing reduces energy
  };

  const restPet = (amt) => {
    if (!isActive) return; // Prevent interaction if pet is exhausted
    setEnergy((prevEnergy) => Math.min(100, Math.max(0, prevEnergy + amt)));
  };

  // Check if pet is exhausted
  useEffect(() => {
    if (hunger <= 0 || energy <= 0 || fun <= 0) {
      // Changed from AND to OR - any stat at 0 means exhausted
      setIsActive(false);
      setMood(objMood.exhausted);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Pet is exhausted!");
      }
    }
  }, [hunger, energy, fun]);

  // Update mood based on stats
  useEffect(() => {
    if (!isActive) return; // Skip mood updates if pet is exhausted

    if (energy <= 40) {
      setMood(objMood.tired);
    } else if (hunger <= 40) {
      setMood(objMood.hunger);
    } else if (fun <= 40) {
      setMood(objMood.bored);
    } else if (hunger >= 80 && fun >= 80 && energy >= 80) {
      setMood(objMood.excited);
    } else if (hunger >= 60 && fun >= 60 && energy >= 60) {
      setMood(objMood.happy);
    } else {
      setMood(objMood.content);
    }
  }, [hunger, fun, energy, isActive]); // Added isActive as dependency

  // Setup interval for decreasing stats
  useEffect(() => {
    console.log("useEffect runs");

    intervalRef.current = setInterval(() => {
      if (!isActive) return; // Skip if pet is exhausted

      let amt = 10; // Reduced from 50 to make game less punishing
      let min = 1;
      let max = 7;
      let random = Math.floor(Math.random() * (max - min)) + min;
      //console.log("Random Number Generated : " + random);

      switch (random) {
        case 1:
          setHunger((prevHunger) =>
            Math.min(100, Math.max(0, prevHunger - amt))
          );
          break;
        case 2:
          setFun((prevFun) => Math.min(100, Math.max(0, prevFun - amt)));
          break;
        case 3:
          setEnergy((prevEnergy) =>
            Math.min(100, Math.max(0, prevEnergy - amt / 2))
          );
          break;
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]); // Added isActive as dependency

  // Function to revive pet
  const revivePet = () => {
    setHunger(60);
    setEnergy(60);
    setFun(60);
    setIsActive(true);
    setMood(objMood.happy);
    console.log("Pet revived!");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Byte-Size Pets</h1>
        </div>
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
        <div className="row border border-dark mb-2">
          <div className="row">
            <div className="col-4 d-flex justify-content-end">Pet Name:</div>
            <div className="col-8 d-flex justify-content-start">[Pet Name]</div>
          </div>
          <div className="row">
            <div className="col-4 d-flex justify-content-end">Pet Mood:</div>
            <div className="col-8 d-flex justify-content-start">
              {mood.text}
            </div>
          </div>
        </div>
        <div className="row border border-dark mb-2">
          <div className="row">
            <div className="col-4 d-flex justify-content-end">Hunger:</div>
            <div className="col-8 my-auto">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={hunger}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${hunger}%` }}
                >
                  {hunger}%
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 d-flex justify-content-end">Fun:</div>
            <div className="col-8 my-auto">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={fun}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${fun}%` }}
                >
                  {fun}%
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 d-flex justify-content-end">Energy:</div>
            <div className="col-8 my-auto">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={energy}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${energy}%` }}
                >
                  {energy}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="">
            {isActive ? (
              <>
                <Button
                  className="btn btn-dark m-2"
                  onClick={() => feedPet(15)}
                >
                  Feed
                </Button>
                <Button
                  className="btn btn-dark m-2"
                  onClick={() => playWithPet(20)}
                >
                  Play
                </Button>
                <Button
                  className="btn btn-dark m-2"
                  onClick={() => restPet(20)}
                >
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
      </div>
    </>
  );
}

export default App;
