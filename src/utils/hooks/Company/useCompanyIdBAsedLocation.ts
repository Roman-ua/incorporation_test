import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const useCompanyIdNumber = (): number | null => {
  const location = useLocation();

  const companyId = useMemo(() => {
    const parts = location.pathname.split('/');
    const cPart = parts.find((part) => /^c_\d+$/.test(part));
    if (cPart) {
      const id = cPart.split('_')[1]; // достаём "24"
      return Number(id);
    }
    return null;
  }, [location.pathname]);

  return companyId;
};

export default useCompanyIdNumber;
