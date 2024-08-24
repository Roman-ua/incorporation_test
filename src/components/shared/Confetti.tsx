import React from 'react';
import Confetti from 'react-confetti';

export default function ConfettiAp() {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      recycle={false}
      gravity={0.1}
    />
  );
}
