export interface ICompanyData {
  id: string;
  state_name: string;
  name: string;
  type_name: string;
  registration_date: string;
  registration_number: string;
  taxId: string;
  status: { id: number; name: string };
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  city: string;
  type: { full_name: string | null; id: number; name: string };
  state: { abbreviation: string; id: number; name: string };
  country: { id: number; short_name: string; full_name: string };
  zip: string;
  logoUrl?: string;
  ein: number | null;
}

export interface ICompanyDataForSave {
  id: string;
  state_name: string;
  name: string;
  type_name: string;
  registration_date: string;
  registration_number: string;
  taxId: string;
  status_name: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  city: string;
  state: '';
  country: '';
  zip: string;
  logoUrl?: string;
}
