import React, { useState } from 'react';
import SwitchButton from '../../../components/shared/SwitchButton/SwitchButton';

const SwitchElements = () => {
  const [selected, setSelected] = useState<1 | 2>(1);

  return (
    <div className="mb-20">
      <h2 className="mb-4 font-bold">Status Labels</h2>
      <SwitchButton
        option1="First Option"
        option2="Second Option"
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
};
export default SwitchElements;
