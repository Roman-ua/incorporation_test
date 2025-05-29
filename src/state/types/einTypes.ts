import { IFiles } from '../../interfaces/interfaces';

export interface EinDocumentGet {
  id: number; // readOnly
  company: number;
  ein_number: string; // maxLength: 15, minLength: 1
  document?: string; // $uri, readOnly
  document_date: string; // $date
  document_type:
    | 'type1'
    | 'type2'
    | 'type3'
    | 'type4'
    | 'type5'
    | 'type6'
    | 'type7'
    | 'type8';
  document_type_display?: string; // readOnly, minLength: 1
  company_name: string; // minLength: 1
  line1: string; // maxLength: 255, minLength: 1
  line2?: string; // maxLength: 255
  line3?: string; // maxLength: 255
  line4?: string; // maxLength: 255
  city: string; // maxLength: 255, minLength: 1
  state: number;
  zip: string; // maxLength: 20, minLength: 1
  country: number;
  status?: 'pending' | 'approved' | 'rejected'; // enum of 3 values, readOnly
  status_display?: string; // readOnly, minLength: 1
  uploaded_at?: string; // $date-time, readOnly
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
