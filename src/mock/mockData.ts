export const mockReportData = {
  id: 1,
  year: 2021,
  status: 'Filed',
  filingDate: 'February 12, 2021',
  confirmedBy: 'John Doe',
  relatedOrder: 'ord_12312',
  attachedFiles: true,
  confirmationLinks: [],
  address: {
    country: 'United States',
    address0: '1234 Elm St',
    address1: 'Apt 5B',
    address2: '',
    address3: '',
    city: 'Birmingham',
    zip: '35203',
    state: 'Alabama',
  },
  mailingAddress: {
    country: 'United States',
    address0: '1234 Elm St',
    address1: 'Apt 5B',
    address2: '',
    address3: '',
    city: 'Birmingham',
    zip: '35203',
    state: 'Alabama',
  },
  companyName: 'ABC Company Inc',
  registrationNumber: 'L23000056354',
  file: 'rep_2021',
  confirmFile: 'Confirmation_file',
  state: 'Florida',
  stateId: '12323342CC',
  people: [],
  signed: 'John Doe',
};
export const mockPeople = [
  {
    id: 1,
    name: 'John Doe',
    title: 'CEO',
    email: 'example@gmail.com',
    signer: false,
    added: false,
    removed: false,
    address: {
      country: 'United States',
      address0: '1234 Elm St',
      address1: 'Apt 5B',
      address2: '',
      address3: '',
      city: 'Birmingham',
      zip: '35203',
      state: 'Alabama',
    },
  },
  {
    id: 2,
    name: 'Philip Moris',
    title: 'Accountant',
    added: false,
    removed: true,
    email: 'example@gmail.com',
    signer: true,
    address: {
      country: 'United States',
      address0: '1234 Elm St',
      address1: 'Apt 5B',
      address2: '',
      address3: '',
      city: 'Birmingham',
      zip: '35203',
      state: 'Alabama',
    },
  },
  {
    id: 3,
    name: 'User Admin',
    title: 'Developer',
    email: 'example@gmail.com',
    signer: false,
    added: true,
    removed: false,
    address: {
      country: 'United States',
      address0: '1234 Elm St',
      address1: 'Apt 5B',
      address2: '',
      address3: '',
      city: 'Birmingham',
      zip: '35203',
      state: 'Alabama',
    },
  },
];
export const mockAgent = {
  name: 'A Registered Agents Inc.',
  address: {
    country: 'Broward',
    address0: '1234 Elm St',
    address1: 'Apt 5B',
    address2: '',
    address3: '',
    city: 'Birmingham',
    county: 'Jefferson',
    zip: '35203',
    state: 'Florida',
  },
};