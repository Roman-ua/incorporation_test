import { atom } from 'recoil';

export const defaultUser: IUser = {
  id: '12',
  email: '',
  full_name: null,
  phone: null,
  telegram: null,
  whatsapp: null,
  linkedin: null,
  is_active: false,
  is_staff: false,
  line1: null,
  line2: null,
  city: null,
  zip: null,
  state: null,
  county: null,
  is_report_signer: false,
  image: null,
  auth0_user_id: null,
};

export interface IUser {
  id: string; // readOnly
  email: string; // readOnly, minLength: 1
  full_name?: string | null; // nullable, min: 1, max: 255
  phone?: string | null; // nullable, max: 15
  telegram?: string | null; // nullable, URI, max: 200
  whatsapp?: string | null; // nullable, max: 15
  linkedin?: string | null; // nullable, URI, max: 200
  is_active: boolean; // readOnly
  is_staff: boolean; // readOnly

  line1?: string | null; // nullable, min: 1, max: 255
  line2?: string | null; // nullable, min: 1, max: 255
  line3?: string | null; // nullable, min: 1, max: 255
  line4?: string | null; // nullable, min: 1, max: 255
  city?: string | null; // nullable, min: 1, max: 255
  zip?: string | null; // nullable, min: 1, max: 255
  state?: string | null; // nullable
  county?: string | null; // nullable
  country?: string | null; // nullable
  status?: string | null; // nullable
  facebook?: string | null; // nullable, URI, max: 200
  twitter?: string | null; // nullable, URI, max: 200
  x?: string | null; // nullable, URI, max: 200
  is_report_signer: boolean;
  image?: string | null; // nullable, URI, readOnly
  auth0_user_id?: string | null; // nullable, readOnly, minLength: 1
  phone_country?: string | null; // nullable
  companies?: [];
}

export interface IUserProfile {
  data: IUser;
}

const UserProfileState = atom<IUserProfile>({
  key: 'UserProfileState',
  default: {
    data: defaultUser,
  },
});

export default UserProfileState;
