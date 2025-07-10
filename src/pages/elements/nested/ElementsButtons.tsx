import React from 'react';
import Buttons from '../components/Buttons';
import CustomCheckBox from '../components/CustomCheckBox';
import CheckBoxElem from '../components/CheckBoxElem';
import SwitchElements from '../components/SwitchElements';
import InputsButtons from '../components/InputsButtons';

const ElementsButtons = () => {
  return (
    <div className="p-10">
      <Buttons />
      <CustomCheckBox />
      <CheckBoxElem />
      <SwitchElements />
      <InputsButtons />
    </div>
  );
};

export default ElementsButtons;
