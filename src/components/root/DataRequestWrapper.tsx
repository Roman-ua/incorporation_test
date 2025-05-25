import React, { useEffect, ReactNode } from 'react';
import useCompany from '../../utils/hooks/Company/useCompany';

interface DataRequestWrapperProps {
  children: ReactNode;
}

const DataRequestWrapper: React.FC<DataRequestWrapperProps> = ({
  children,
}) => {
  const { getCompaniesList } = useCompany();

  useEffect(() => {
    getCompaniesList();
  }, []);

  return <>{children}</>;
};

export default DataRequestWrapper;
