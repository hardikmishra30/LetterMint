export interface LetterheadState {
  companyName: string;
  tagline: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pin: string;
  phone: string;
  email: string;
  website: string;
  gstVat: string;
  logo: string | null;
  brandColor: string;
  style: 'corporate' | 'startup' | 'creative';
  socials: {
    linkedin: boolean;
    facebook: boolean;
    twitter: boolean;
    instagram: boolean;
  };
}

export const defaultState: LetterheadState = {
  companyName: 'Acme Corp',
  tagline: 'Future of Logistics',
  address1: '123 Innovation Way',
  address2: '',
  city: 'San Francisco',
  state: 'CA',
  pin: '94105',
  phone: '+1 (555) 000-1234',
  email: 'hello@acme.corp',
  website: 'www.acme.corp',
  gstVat: '',
  logo: null,
  brandColor: '#0f172a',
  style: 'corporate',
  socials: {
    linkedin: true,
    facebook: false,
    twitter: true,
    instagram: false,
  },
};

export const exampleState: LetterheadState = {
  companyName: 'Stellar Dynamics',
  tagline: 'Aerospace & Orbital Logistics',
  address1: '42 Launchpad Way',
  address2: 'Suite 200',
  city: 'Cape Canaveral',
  state: 'FL',
  pin: '32920',
  phone: '+1 (321) 555-0199',
  email: 'ops@stellar.dy',
  website: 'www.stellar.dy',
  gstVat: 'US-EIN-87-1234567',
  logo: null,
  brandColor: '#2563eb',
  style: 'startup',
  socials: {
    linkedin: true,
    facebook: false,
    twitter: true,
    instagram: true,
  },
};
