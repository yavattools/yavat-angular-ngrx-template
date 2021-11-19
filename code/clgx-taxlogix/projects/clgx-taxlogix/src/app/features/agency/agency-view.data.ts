import { environment as env } from '../../../environments/environment';

export interface Agency {
  name?: string;
  status?: string;
  count?: string;
  description?: string;
}

export const agencies: Agency[] = [
  {
    name: 'Security',
    status: '',
    description: 'Security',
    count: ''
  },
  {
    name: 'Client',
    status: 'Completed',
    description: 'Security',
    count: ''
  },
  {
    name: 'Agency',
    status: 'Completed',
    description: 'Security',
    count: '12'
  },
  {
    name: 'Loan Boarding',
    status: 'Completed',
    description: 'Security',
    count: '11'
  },
  {
    name: 'Search',
    status: 'Completed',
    description: 'Security',
    count: '20'
  },
  {
    name: 'Escrow',
    status: 'Completed',
    description: 'Security',
    count: ''
  },
  {
    name: 'Non Escrow',
    status: 'In Progress',
    description: 'Security',
    count: '23'
  },
  {
    name: 'Master',
    status: '',
    description: 'Security',
    count: ''
  },
  {
    name: 'Reporting',
    status: '',
    description: 'Security',
    count: ''
  },
  {
    name: 'Accounting',
    status: '',
    description: 'Security',
    count: ''
  },
  {
    name: 'Payment Processing',
    status: 'In Progress',
    description: 'Security',
    count: '20'
  },
  {
    name: 'Invoicing',
    status: 'Next',
    description: 'Security',
    count: '24'
  },
  {
    name: 'Customer Service',
    status: 'In Progress',
    description: 'Security',
    count: ''
  },
  {
    name: 'Claims and Refunds',
    status: '',
    description: 'Security',
    count: ''
  },
  {
    name: 'File Tracking',
    status: '',
    description: 'Security',
    count: ''
  },
  {
    name: 'Reports',
    status: '',
    description: 'Security',
    count: '15'
  }
];

export interface AgenciesDetails {
  number?: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  phoneNumber?: string;
}

export const agenciesDetails: AgenciesDetails[] = [
  {
    number: 'String',
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    phoneNumber: 'String'
  },
  {
    number: 'String',
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    phoneNumber: 'String'
  },
  {
    number: 'String',
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    phoneNumber: 'String'
  },
  {
    number: 'String',
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    phoneNumber: 'String'
  },
  {
    number: 'String',
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    phoneNumber: 'String'
  },
  {
    number: 'String',
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    phoneNumber: 'String'
  },
  {
    number: 'String',
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    phoneNumber: 'String'
  },
  {
    number: 'String',
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    phoneNumber: 'String'
  },
  {
    number: 'String',
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    phoneNumber: 'String'
  }
];
