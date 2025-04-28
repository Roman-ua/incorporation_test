import React from 'react';
import Buttons from '../components/Buttons';
import CustomCheckBox from '../components/CustomCheckBox';
import CheckBoxElem from '../components/CheckBoxElem';
import SwitchElements from '../components/SwitchElements';

const ElementsButtons = () => {
  return (
    <div className="p-10">
      <Buttons />
      <CustomCheckBox />
      <CheckBoxElem />
      <SwitchElements />
    </div>
  );
};

export default ElementsButtons;
