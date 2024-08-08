import React from 'react';
import SectionStatus from './components/SectionStatus';
import InputWithButton from './components/InputWithButton';
import JoinedCardsElements from './components/JoinedCardsElements';
import StateCardsElements from './components/StateCardsElements';

const Elements = () => {
  return (
    <div className="p-10">
      <SectionStatus />
      <InputWithButton />
      <JoinedCardsElements />
      <StateCardsElements />
    </div>
  );
};

export default Elements;
