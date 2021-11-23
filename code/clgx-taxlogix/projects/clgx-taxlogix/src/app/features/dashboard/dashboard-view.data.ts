import { environment as env } from '../../../environments/environment';

export interface AgencyFeature {
  name?: string;
  status?: string;
  count?: string
  description?: string;
  enabled?: boolean
}

export const features: AgencyFeature[] = [
  {
    name: 'Security',
    status: '',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Client',
    status: 'Completed',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Agency',
    status: 'Completed',
    description: 'Security',
    count: '12',
    enabled: true
  },
  {
    name: 'Loan Boarding',
    status: 'Completed',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Search',
    status: 'Completed',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Escrow',
    status: 'Completed',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Non Escrow',
    status: 'In Progress',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Master',
    status: '',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Reporting',
    status: '',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Accounting',
    status: '',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Payment Processing',
    status: 'In Progress',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Invoicing',
    status: 'Next',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Customer Service',
    status: 'In Progress',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Claims and Refunds',
    status: '',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'File Tracking',
    status: '',
    description: 'Security',
    count: '',
    enabled: false
  },
  {
    name: 'Reports',
    status: '',
    description: 'Security',
    count: '',
    enabled: false
  }
 
];
