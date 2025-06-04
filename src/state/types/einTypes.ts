export interface EinDocumentGet {
  company: Company;
  ein_documents: EinDocument[];
  ein_number: string;
  last_verification_date: string | null;
  status: 'confirmation_needed' | 'verified' | 'rejected' | string;
}

export interface Company {
  id: number;
  state: State;
  name: string;
  type: CompanyType;
  registration_number: string;
  registration_date: string;
  status: CompanyStatus;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  city: string;
  country: Country;
  zip: string;
  logoUrl: string;
  ein: number;
}

export interface State {
  id: number;
  abbreviation: string;
  name: string;
}

export interface CompanyType {
  id: number;
  name: string;
  full_name: string | null;
}

export interface CompanyStatus {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  short_name: string;
  full_name: string;
}

export interface EinDocument {
  id: number;
  company: number;
  ein_number: string;
  document: string;
  document_date: string;
  document_type: string;
  document_type_display: string;
  company_name: string;
  line1: string;
  line2: string;
  line3?: string;
  line4?: string;
  city: string;
  state: number;
  zip: string;
  country: number;
  uploaded_at: string;
}

export interface EinDocumentCreate {
  ein_number: string;
  document?: File | null;
  document_date: string; // $date
  company_name: string; // minLength: 1
  document_type: string;
  line1: string; // maxLength: 255, minLength: 1
  line2?: string; // maxLength: 255
  line3?: string; // maxLength: 255
  line4?: string; // maxLength: 255
  city: string; // maxLength: 255, minLength: 1
  state: number;
  zip: string; // maxLength: 20, minLength: 1
  country: number;
}
