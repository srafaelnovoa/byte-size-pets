import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PetDisplay from "./components/PetDisplay";
import PetInfo from "./components/PetInfo";
import StatusBars from "./components/StatusBars";
import ReviveButton from "./components/ActionButtons";
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
    highScore,
    level,
    score,
  } = usePetLogic();

  return (
    <div className="container">
      <h1>Byte-Size Pets </h1>

      <PetDisplay
        mood={mood}
        highScore={highScore}
        level={level}
        score={score}
      />
      <PetInfo petName={petName} mood={mood} />
      <StatusBars
        isActive={isActive}
        hunger={hunger}
        fun={fun}
        energy={energy}
        feedPet={feedPet}
        playWithPet={playWithPet}
        restPet={restPet}
      />
      <ReviveButton isActive={isActive} revivePet={revivePet} />
    </div>
  );
}

export default App;
