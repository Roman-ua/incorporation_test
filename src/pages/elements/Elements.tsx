import React from 'react';
import SectionStatus from './components/SectionStatus';
import InputWithButton from './components/InputWithButton';
import JoinedCardsElements from './components/JoinedCardsElements';

const Elements = () => {
  return (
    <div className="p-10">
      <SectionStatus />
      <InputWithButton />
      <JoinedCardsElements />
    </div>
  );
};

export default Elements;
