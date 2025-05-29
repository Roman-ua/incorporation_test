import { ICompanyData } from '../state/types/company';

export interface Address {
  country?: string;
  address0?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  zip?: string;
  state?: string;
  county?: string;
}

export interface Person {
  id: number;
  name: string;
  title: string;
  email: string;
  signer: boolean;
  added?: boolean;
  removed?: boolean;
  picture?: string;
  status?: string;
  edited?: boolean;
  new?: boolean;
  address: Address;
}

export interface Agent {
  name: string;
  address: Address;
}

export interface ReportData {
  id: number;
  year: number;
  status: string;
  filingDate: string;
  confirmedBy: string;
  relatedOrder: string;
  attachedFiles: boolean;
  confirmationLinks: string[];
  address: Address;
  mailingAddress: Address;
  updatedAddress: Address | null;
  updatedMailingAddress: Address | null;
  companyName: string;
  registrationNumber: string;
  file: string;
  confirmFile: string;
  state: string;
  stateId: string;
  people: Person[];
  signed: string;
}

export interface MockAnnualReportData {
  id: number;
  year: number;
  status: string;
  filingDate: string;
  confirmedBy: string;
  relatedOrder: string;
  attachedFiles: boolean;
  confirmationLinks: string[];
  address: AddressFields;
  updatedAddress: AddressFields | null;
  mailingAddress: AddressFields;
  updatedMailingAddress: AddressFields | null;
  companyName: string;
  registrationNumber: string;
  file: string;
  confirmFile: string;
  stateId: string;
  state: string;
  people: Person[];
  signed: string;
}

export type AddressFields = {
  type?: string;
  country?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  line4?: string;
  city?: string;
  zip?: string;
  state?: string;
};

export interface IFiles {
  file: File | { name: string; link: string } | null;
}

export interface MockData {
  taxId: string;
  status: { id: number; name: string };
  companyName: string;
  lastVerifDate: string;
  documentType: string[];
  relatedAddress: Address | null;
  relatedDocument: IFiles | null;
}

export type UpdatedCompanyState = Partial<ICompanyData>;

export type UpdatedState = Partial<MockData>;
