import React from 'react';
import InputWithButton from './components/InputWithButton';
import JoinedCardsElements from './components/JoinedCardsElements';
import StateCardsElements from './components/StateCardsElements';
import SeparatedCardsElements from './components/SeparatedCardsElements';
import FilesSection from './components/FilesSection';
import LayoutElements from './components/LayoutElements';

const Elements = () => {
  return (
    <div className="p-10">
      <LayoutElements />
      <InputWithButton />
      <JoinedCardsElements />
      <SeparatedCardsElements />
      <StateCardsElements />
      <FilesSection />
    </div>
  );
};

export default Elements;
