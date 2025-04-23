import React from 'react';
import SectionStatus from './components/SectionStatus';
import InputWithButton from './components/InputWithButton';
import JoinedCardsElements from './components/JoinedCardsElements';
import StateCardsElements from './components/StateCardsElements';
import CustomCheckBox from './components/CustomCheckBox';
import SeparatedCardsElements from './components/SeparatedCardsElements';
import USAddressFormElements from './components/USAddressFormElements';
import StateIcons from './components/StateIcons';
import FilesSection from './components/FilesSection';
import Buttons from './components/Buttons';
import LayoutElements from './components/LayoutElements';
import SwitchElements from './components/SwitchElements';
import CheckBoxElem from './components/CheckBoxElem';
import NotificationsElements from './components/NotificationsElements';

const Elements = () => {
  return (
    <div className="p-10">
      <SectionStatus />
      <NotificationsElements />
      <CustomCheckBox />
      <CheckBoxElem />
      <SwitchElements />
      <StateIcons />
      <USAddressFormElements />
      <LayoutElements />
      <InputWithButton />
      <JoinedCardsElements />
      <SeparatedCardsElements />
      <StateCardsElements />
      <Buttons />
      <FilesSection />
    </div>
  );
};

export default Elements;
