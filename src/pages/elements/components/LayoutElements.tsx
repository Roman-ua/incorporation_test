import React from 'react';
import ModalLayout from '../../../components/shared/Modals/ModalLayout';
import SectionHeading from '../../createCompany/components/SectionHeading';

const LayoutElements = () => {
  return (
    <div className="w-3/5 mb-20">
      <SectionHeading text={'Modal layout'} status={false} hideStatus={true} />
      <ModalLayout
        title="Modal Title"
        actionBtnTitle="Save"
        setOpen={() => {}}
        cancelHandler={() => {}}
        submitHandler={() => {}}
        deleteAction={() => {}}
      >
        <div className="py-5">Modal content</div>
      </ModalLayout>
    </div>
  );
};

export default LayoutElements;
