import { useState, useEffect, useRef } from "react";
import { MOODS } from "../constants";
import { SETTINGS } from "../constants";

export function usePetLogic() {
  const [hunger, setHunger] = useState(SETTINGS.hunger.start);
  const [energy, setEnergy] = useState(SETTINGS.energy.start);
  const [fun, setFun] = useState(SETTINGS.fun.start);
  const [mood, setMood] = useState(MOODS.happy);
  const [isActive, setIsActive] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeValue, setTimeValue] = useState(SETTINGS.timeIntervalStart.medium);
  const [score, setScore] = useState(0);

  const intervalRef = useRef(null);

  const feedPet = () => {
    const amt = SETTINGS.hunger.add;
    if (!isActive) return;
    setHunger((prev) => Math.min(100, Math.max(0, prev + amt)));
  };

  const playWithPet = () => {
    const amt = SETTINGS.fun.add;
    if (!isActive) return;
    setFun((prev) => Math.min(100, Math.max(0, prev + amt)));
    setEnergy((prev) => Math.min(100, Math.max(0, prev - amt / 2)));
  };

  const restPet = () => {
    const amt = SETTINGS.energy.add;
    if (!isActive) return;
    setEnergy((prev) => Math.min(100, Math.max(0, prev + amt)));
  };

  const revivePet = () => {
    setHunger(SETTINGS.hunger.start);
    setEnergy(SETTINGS.energy.start);
    setFun(SETTINGS.fun.start);
    setIsActive(true);
    setMood(MOODS.happy);
    console.log("Pet revived!");
    setTimeAlive(0);
    setLevel(1);
    setTimeValue(SETTINGS.timeIntervalStart.medium);
    setScore(0);
  };

  // Check if pet is exhausted
  useEffect(() => {
    if (!isActive) return;
    if (hunger <= 0 || energy <= 0 || fun <= 0) {
      setIsActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Pet is exhausted!");
      }
    }
  }, [hunger, energy, fun, isActive]);

  // Update mood based on stats
  useEffect(() => {
    if (!isActive) {
      return;
    }

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

  // Set mood to exhausted and update high score when pet becomes inactive
  useEffect(() => {
    if (!isActive) {
      if (score === 0) return;
      setMood(MOODS.exhausted);
      setHighScore((prev) => (prev < score ? score : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // Update high score when score changes while active
  useEffect(() => {
    if (isActive) {
      setHighScore((prev) => (prev < score ? score : prev));
    }
  }, [score, isActive]);

  // Increment level based on timeAlive
  useEffect(() => {
    if (isActive && timeAlive > 0 && timeAlive % 10 === 0) {
      console.log("timeAlive", timeAlive);
      setLevel((prev) => prev + 1);
    }
  }, [timeAlive, isActive]);

  // Update score when level changes
  useEffect(() => {
    if (isActive && level) {
      setScore((prev) => prev + (50 * level) / 2);
    }
  }, [level, isActive, timeAlive]);

  // Update timeValue when level changes
  useEffect(() => {
    if (level > 1) {
      setTimeValue((prev) => Math.trunc(prev * 0.8));
    }
  }, [level]);

  // Setup interval for decreasing stats
  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeAlive((prev) => prev + 1);

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
          setEnergy((prev) => Math.min(100, Math.max(0, prev - amt * 0.5)));
          break;
      }
    }, timeValue);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeValue]);

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
    highScore,
    level,
    score,
    timeAlive,
  };
}
