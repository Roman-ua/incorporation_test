import React from 'react';
import SectionStatus from './components/SectionStatus';
import InputWithButton from './components/InputWithButton';
import JoinedCardsElements from './components/JoinedCardsElements';
import StateCardsElements from './components/StateCardsElements';
import CustomCheckBox from './components/CustomCheckBox';
import SeparatedCardsElements from './components/SeparatedCardsElements';

const Elements = () => {
  return (
    <div className="p-10">
      <SectionStatus />
      <CustomCheckBox />
      <InputWithButton />
      <JoinedCardsElements />
      <SeparatedCardsElements />
      <StateCardsElements />
    </div>
  );
};

export default Elements;
