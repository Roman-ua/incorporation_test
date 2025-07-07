import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const useCompanyIdNumber = (): string | null => {
  const location = useLocation();

  const companyId = useMemo(() => {
    const parts = location.pathname.split('/');

    const id = parts.at(-1);
    if (id) {
      return id;
    }
    return null;
  }, [location.pathname]);

  return companyId;
};

export default useCompanyIdNumber;
