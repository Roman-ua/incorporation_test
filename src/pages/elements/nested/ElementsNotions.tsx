import React from 'react';
import SectionStatus from '../components/SectionStatus';
import NotificationsElements from '../components/NotificationsElements';
import StateIcons from '../components/StateIcons';

const ElementsNotions = () => {
  return (
    <div className="p-10">
      <SectionStatus />
      <NotificationsElements />
      <StateIcons />
    </div>
  );
};

export default ElementsNotions;
