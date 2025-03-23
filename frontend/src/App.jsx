import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PetDisplay from "./components/PetDisplay";
import PetInfo from "./components/PetInfo";
import StatusBars from "./components/StatusBars";
import ActionButtons from "./components/ActionButtons";
import { usePetLogic } from "./hooks/usePetLogic";

function App() {
  const [petName, setPetName] = useState("Fluffy"); // Added state for pet name

  const {
    hunger,
    energy,
    fun,
    mood,
    isActive,
    feedPet,
    playWithPet,
    restPet,
    revivePet,
  } = usePetLogic();

  return (
    <div className="container">
      <div className="row">
        <h1>Byte-Size Pets</h1>
      </div>

      <PetDisplay mood={mood} />
      <PetInfo petName={petName} mood={mood} />
      <StatusBars hunger={hunger} fun={fun} energy={energy} />
      <ActionButtons
        isActive={isActive}
        feedPet={feedPet}
        playWithPet={playWithPet}
        restPet={restPet}
        revivePet={revivePet}
      />
    </div>
  );
}

export default App;
