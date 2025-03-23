// File: src/hooks/usePetLogic.js
import { useState, useEffect, useRef } from "react";
import { MOODS } from "../constants";

export function usePetLogic() {
  const [hunger, setHunger] = useState(60);
  const [energy, setEnergy] = useState(60);
  const [fun, setFun] = useState(60);
  const [mood, setMood] = useState(MOODS.happy);
  const [isActive, setIsActive] = useState(true);

  const intervalRef = useRef(null);

  const feedPet = (amt) => {
    if (!isActive) return;
    setHunger((prev) => Math.min(100, Math.max(0, prev + amt)));
  };

  const playWithPet = (amt) => {
    if (!isActive) return;
    setFun((prev) => Math.min(100, Math.max(0, prev + amt)));
    setEnergy((prev) => Math.min(100, Math.max(0, prev - amt / 2)));
  };

  const restPet = (amt) => {
    if (!isActive) return;
    setEnergy((prev) => Math.min(100, Math.max(0, prev + amt)));
  };

  const revivePet = () => {
    setHunger(60);
    setEnergy(60);
    setFun(60);
    setIsActive(true);
    setMood(MOODS.happy);
    console.log("Pet revived!");
  };

  // Check if pet is exhausted
  useEffect(() => {
    if (hunger <= 0 || energy <= 0 || fun <= 0) {
      setIsActive(false);
      setMood(MOODS.exhausted);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Pet is exhausted!");
      }
    }
  }, [hunger, energy, fun]);

  // Update mood based on stats
  useEffect(() => {
    if (!isActive) return;

    if (energy <= 40) {
      setMood(MOODS.tired);
    } else if (hunger <= 40) {
      setMood(MOODS.hunger);
    } else if (fun <= 40) {
      setMood(MOODS.bored);
    } else if (hunger >= 80 && fun >= 80 && energy >= 80) {
      setMood(MOODS.excited);
    } else if (hunger >= 60 && fun >= 60 && energy >= 60) {
      setMood(MOODS.happy);
    } else {
      setMood(MOODS.content);
    }
  }, [hunger, fun, energy, isActive]);

  // Setup interval for decreasing stats
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isActive) return;

      let amt = 10;
      let random = Math.floor(Math.random() * 3) + 1;

      switch (random) {
        case 1:
          setHunger((prev) => Math.min(100, Math.max(0, prev - amt)));
          break;
        case 2:
          setFun((prev) => Math.min(100, Math.max(0, prev - amt)));
          break;
        case 3:
          setEnergy((prev) => Math.min(100, Math.max(0, prev - amt / 2)));
          break;
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  return {
    hunger,
    energy,
    fun,
    mood,
    isActive,
    feedPet,
    playWithPet,
    restPet,
    revivePet,
  };
}
