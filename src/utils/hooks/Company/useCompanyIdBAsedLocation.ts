import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const useCompanyIdNumber = (): string | null => {
  const location = useLocation();

  const companyId = useMemo(() => {
    const parts = location.pathname.split('/');

    const cPart = parts.find((part) => /^c_\d+$/.test(part));

    if (cPart) {
      return cPart;
    }
    return null;
  }, [location.pathname]);

  return companyId;
};

export default useCompanyIdNumber;
