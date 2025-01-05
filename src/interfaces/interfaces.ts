interface Address {
  country: string;
  address0: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zip: string;
  state: string;
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
  companyName: string;
  registrationNumber: string;
  file: string;
  confirmFile: string;
  state: string;
  stateId: string;
  people: Person[];
  signed: string;
}
