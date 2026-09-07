export const mockTransactions = [
  {
    id: 'PVL-84920156',
    type: 'airtime',
    title: 'MTN Airtime Top-up',
    subtitle: '0803 •••• 123',
    amount: 1000,
    status: 'successful',
    date: '2026-09-06T11:24:00',
    icon: 'airtime',
  },
  {
    id: 'PVL-84920099',
    type: 'data',
    title: 'Airtel 5GB Data Bundle',
    subtitle: '0802 •••• 456',
    amount: 2000,
    status: 'pending',
    date: '2026-09-06T09:15:00',
    icon: 'data',
  },
  {
    id: 'PVL-84919887',
    type: 'electricity',
    title: 'Ikeja Electric Prepaid',
    subtitle: 'Meter 4519 •••• 21',
    amount: 5000,
    status: 'successful',
    date: '2026-09-05T16:40:00',
    icon: 'electricity',
  },
  {
    id: 'PVL-84918342',
    type: 'cable',
    title: 'DSTV Compact Plus',
    subtitle: 'Smartcard 1023 •••• 88',
    amount: 12500,
    status: 'successful',
    date: '2026-09-04T08:05:00',
    icon: 'cable',
  },
]

export const mockUser = {
  name: 'Oluwaseun',
  fullName: 'Oluwaseun Adeyelu',
  phone: '0803 XXX XXXX',
  balance: 1256805.5,
}

export const dataPlans = {
  daily: [
    { id: 'd1', size: '100MB', price: 100, validity: '1 Day' },
    { id: 'd2', size: '350MB', price: 200, validity: '1 Day' },
    { id: 'd3', size: '750MB', price: 300, validity: '2 Days' },
  ],
  weekly: [
    { id: 'w1', size: '1.5GB', price: 1000, validity: '7 Days' },
    { id: 'w2', size: '3GB', price: 1500, validity: '7 Days' },
    { id: 'w3', size: '5GB', price: 2000, validity: '7 Days' },
  ],
  monthly: [
    { id: 'm1', size: '10GB', price: 3000, validity: '30 Days' },
    { id: 'm2', size: '20GB', price: 5000, validity: '30 Days' },
    { id: 'm3', size: '40GB', price: 9000, validity: '30 Days' },
    { id: 'm4', size: '75GB', price: 15000, validity: '30 Days' },
  ],
  special: [
    { id: 's1', size: '10GB Night Plan', price: 1500, validity: '30 Days (12am-5am)' },
    { id: 's2', size: '50GB Social Bundle', price: 2500, validity: '30 Days' },
  ],
}