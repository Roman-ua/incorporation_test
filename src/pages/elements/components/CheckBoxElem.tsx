import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';
import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';

const CheckBoxElem = () => {
  const [checked, setChecked] = React.useState(false);
  const [checkedUnder, setCheckedUnder] = React.useState(false);

  return (
    <div className="mb-20">
      <SectionHeading
        text={'Check-box with labels'}
        status={false}
        hideStatus
      />
      <Checkbox
        id={`simple`}
        title={'Simple check'}
        underInput={false}
        wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
        checked={checked}
        onChange={(value) => {
          setChecked(value);
        }}
      />
      <input
        className="mt-10 block max-w-[400px] rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer"
        type="text"
        placeholder="Email"
      />
      <div className="mt-2">
        <Checkbox
          wrapperClass={'h-4 w-4 min-w-4 min-h-4'}
          id={`Send invitation`}
          title={'Send invitation'}
          underInput={true}
          checked={checkedUnder}
          onChange={(value) => setCheckedUnder(value)}
        />
      </div>
    </div>
  );
};

export default CheckBoxElem;
