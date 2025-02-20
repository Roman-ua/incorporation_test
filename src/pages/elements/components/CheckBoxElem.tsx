import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';
import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';

const CheckBoxElem = () => {
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  const [checkedUnder, setCheckedUnder] = React.useState(false);

  return (
    <div className="mb-20">
      <SectionHeading
        text={'Check-box with labels'}
        status={false}
        hideStatus
      />
      <div className="flex flex-col items-start justify-start gap-2">
        <Checkbox
          id={`simple`}
          title={'Simple check'}
          underInput={false}
          wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
          checked={checked}
          iconClass={'h-3 w-3'}
          onChange={(value) => {
            setChecked(value);
          }}
        />
        <Checkbox
          id={`simple`}
          title={'Simple check 2'}
          underInput={false}
          wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
          checked={checked1}
          iconClass={'h-3 w-3'}
          onChange={(value) => {
            setChecked1(value);
          }}
        />
        <Checkbox
          id={`simple`}
          title={'Simple check 3'}
          underInput={false}
          wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
          checked={checked2}
          iconClass={'h-3 w-3'}
          onChange={(value) => {
            setChecked2(value);
          }}
        />
      </div>
      <input
        className="mt-10 block max-w-[400px] rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer"
        type="text"
        placeholder="Email"
      />
      <div className="mt-2">
        <Checkbox
          wrapperClass={'h-4 w-4 min-w-4 min-h-4'}
          iconClass={'h-2.5 w-2.5'}
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
