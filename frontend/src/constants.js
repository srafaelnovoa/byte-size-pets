// File: src/constants.js
export const MOODS = {
  happy: { text: "Happy 😊", img: "/images/bunny-happy.JPG" },
  tired: { text: "Tired 😴", img: "/images/bunny-tired.JPG" },
  hunger: { text: "Hungry 🍖", img: "/images/bunny-hungry.JPG" },
  bored: { text: "Bored 😐", img: "/images/bunny-bored.JPG" },
  excited: { text: "Excited 😆", img: "/images/bunny-excited.JPG" },
  content: { text: "Content 😌", img: "/images/bunny-content.JPG" },
  exhausted: { text: "Exhausted 😥", img: "/images/bunny-exhausted.JPG" },
};

export const SETTINGS = {
  hunger: { add: 15, remove: 10, start: 60 },
  energy: { add: 20, remove: 10, start: 60 },
  fun: { add: 20, remove: 10, start: 60 },
  timeIntervalStart: { easy: 1500, medium: 1000, hard: 400 },
};
