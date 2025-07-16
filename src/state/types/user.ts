export interface IUpdateUserContactInfo {
  full_name?: string | null; // maxLength: 255, minLength: 1
  phone?: string | null; // maxLength: 15
  telegram?: string | null; // format: URI, maxLength: 200
  whatsapp?: string | null; // maxLength: 15
  linkedin?: string | null; // format: URI, maxLength: 200
  facebook?: string | null; // format: URI, maxLength: 200
  twitter?: string | null; // format: URI, maxLength: 200
  line1?: string | null; // maxLength: 255, minLength: 1
  line2?: string | null; // maxLength: 255, minLength: 1
  line3?: string | null; // maxLength: 255, minLength: 1
  line4?: string | null; // maxLength: 255, minLength: 1
  city?: string | null; // maxLength: 255, minLength: 1
  zip?: string | null; // maxLength: 255, minLength: 1
  state?: string | null; // string
  county?: string | null; // string
  country?: string | null; // string
  phone_country?: string | null; // string
  image?: File | string | null;
  is_report_signer: boolean; // required
}
