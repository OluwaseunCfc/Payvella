export const mockTransactions = [
  {
    id: 'PVL-84920156',
    category: 'airtime',
    title: 'MTN Airtime Top-up',
    subtitle: '0803 •••• 123',
    recipient: '08031234123',
    network: 'MTN',
    amount: 1000,
    fee: 0,
    status: 'successful',
    date: '2026-09-06T11:24:00',
    paymentMethod: 'PAYVELLA Wallet',
  },
  {
    id: 'PVL-84920099',
    category: 'data',
    title: 'Airtel 5GB Data Bundle',
    subtitle: '0802 •••• 456',
    recipient: '08021234456',
    network: 'Airtel',
    amount: 2000,
    fee: 0,
    status: 'pending',
    date: '2026-09-06T09:15:00',
    paymentMethod: 'PAYVELLA Wallet',
  },
  {
    id: 'PVL-84919887',
    category: 'electricity',
    title: 'Ikeja Electric Prepaid',
    subtitle: 'Meter 4519 •••• 21',
    recipient: '4519283021',
    network: 'Ikeja Electric (IKEDC)',
    amount: 5000,
    fee: 0,
    status: 'successful',
    date: '2026-09-05T16:40:00',
    paymentMethod: 'PAYVELLA Wallet',
  },
  {
    id: 'PVL-84918342',
    category: 'cable',
    title: 'DSTV Compact Plus',
    subtitle: 'Smartcard 1023 •••• 88',
    recipient: '1023456788',
    network: 'DSTV',
    amount: 12500,
    fee: 0,
    status: 'successful',
    date: '2026-09-04T08:05:00',
    paymentMethod: 'PAYVELLA Wallet',
  },
  {
    id: 'PVL-84917210',
    category: 'betting',
    title: 'Bet9ja Wallet Funding',
    subtitle: 'User ID 55223311',
    recipient: '55223311',
    network: 'Bet9ja',
    amount: 3000,
    fee: 0,
    status: 'successful',
    date: '2026-09-03T14:12:00',
    paymentMethod: 'PAYVELLA Wallet',
  },
  {
    id: 'PVL-84916654',
    category: 'wallet_funding',
    title: 'Wallet Funding via Bank Transfer',
    subtitle: 'Wema Bank • 9012345678',
    recipient: null,
    network: 'Wema Bank',
    amount: 25000,
    fee: 0,
    status: 'successful',
    date: '2026-09-02T09:12:00',
    paymentMethod: 'Bank Transfer',
    isCredit: true,
  },
  {
    id: 'PVL-84915432',
    category: 'exam_pin',
    title: 'WAEC Result Checker PIN',
    subtitle: 'Quantity: 1',
    recipient: null,
    network: 'WAEC',
    amount: 3400,
    fee: 0,
    status: 'failed',
    date: '2026-09-01T18:30:00',
    paymentMethod: 'PAYVELLA Wallet',
  },
]

export const mockUser = {
  name: 'Oluwaseun',
  fullName: 'Oluwaseun A. Adebola',
  phone: '0803 XXX XXXX',
  balance: 125680.5,
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

export const electricityProviders = [
  { id: 'ikedc', label: 'Ikeja Electric (IKEDC)', short: 'IKEDC', subtitle: 'Lagos Mainland & Suburbs', icon: '⚡' },
  { id: 'ekedc', label: 'Eko Electric (EKEDC)', short: 'EKEDC', subtitle: 'Lagos Island & Environs', icon: '⚡' },
  { id: 'aedc', label: 'Abuja Electric (AEDC)', short: 'AEDC', subtitle: 'FCT Abuja & Environs', icon: '⚡' },
  { id: 'ibedc', label: 'Ibadan Electric (IBEDC)', short: 'IBEDC', subtitle: 'Oyo, Ogun & Environs', icon: '⚡' },
  { id: 'eedc', label: 'Enugu Electric (EEDC)', short: 'EEDC', subtitle: 'South East Region', icon: '⚡' },
]

export const cableProviders = [
  { id: 'dstv', label: 'DSTV', short: 'DSTV', subtitle: 'DStv Digital Satellite TV', icon: '📡' },
  { id: 'gotv', label: 'GOtv', short: 'GOtv', subtitle: 'GOtv Digital TV', icon: '📺' },
  { id: 'startimes', label: 'StarTimes', short: 'StarTimes', subtitle: 'StarTimes Digital TV', icon: '⭐' },
]

export const cablePackages = {
  dstv: [
    { id: 'dstv-padi', name: 'DStv Padi', price: 2950, description: 'Basic package, 17 channels' },
    { id: 'dstv-yanga', name: 'DStv Yanga', price: 4200, description: '23 channels' },
    { id: 'dstv-confam', name: 'DStv Confam', price: 7400, description: '34 channels' },
    { id: 'dstv-compact', name: 'DStv Compact', price: 12500, description: '46 channels' },
    { id: 'dstv-compact-plus', name: 'DStv Compact Plus', price: 20000, description: '60+ channels' },
    { id: 'dstv-premium', name: 'DStv Premium', price: 32500, description: '90+ channels, full sports' },
  ],
  gotv: [
    { id: 'gotv-smallie', name: 'GOtv Smallie', price: 1300, description: '12 channels' },
    { id: 'gotv-jinja', name: 'GOtv Jinja', price: 2700, description: '43 channels' },
    { id: 'gotv-jolli', name: 'GOtv Jolli', price: 3950, description: '58 channels' },
    { id: 'gotv-max', name: 'GOtv Max', price: 5700, description: '70+ channels' },
  ],
  startimes: [
    { id: 'st-nova', name: 'Nova', price: 1300, description: '30 channels' },
    { id: 'st-basic', name: 'Basic', price: 2100, description: '45 channels' },
    { id: 'st-smart', name: 'Smart', price: 3100, description: '55 channels' },
    { id: 'st-classic', name: 'Classic', price: 3700, description: '65 channels' },
  ],
}

export const bettingPlatforms = [
  { id: 'bet9ja', label: 'Bet9ja', short: 'Bet9ja', subtitle: 'Sports betting & casino', icon: '🎯' },
  { id: 'sportybet', label: 'SportyBet', short: 'SportyBet', subtitle: 'Sports betting', icon: '⚽' },
  { id: 'nairabet', label: 'NairaBet', short: 'NairaBet', subtitle: 'Sports betting', icon: '🏆' },
  { id: '1xbet', label: '1xBet', short: '1xBet', subtitle: 'Sports & casino', icon: '🎲' },
  { id: 'betking', label: 'BetKing', short: 'BetKing', subtitle: 'Sports betting', icon: '👑' },
]

export const examProviders = [
  { id: 'waec', label: 'WAEC', short: 'WAEC', subtitle: 'Result Checker PIN', icon: '📘' },
  { id: 'jamb', label: 'JAMB', short: 'JAMB', subtitle: 'UTME/DE ePIN', icon: '📗' },
  { id: 'neco', label: 'NECO', short: 'NECO', subtitle: 'Result Checker PIN', icon: '📙' },
  { id: 'nabteb', label: 'NABTEB', short: 'NABTEB', subtitle: 'Result Checker PIN', icon: '📕' },
]

export const examPinTypes = {
  waec: [{ id: 'waec-checker', name: 'WAEC Result Checker', price: 3400, description: 'Check WASSCE results' }],
  jamb: [
    { id: 'jamb-utme', name: 'UTME ePIN', price: 6200, description: 'For new UTME registration' },
    { id: 'jamb-de', name: 'Direct Entry ePIN', price: 6200, description: 'For Direct Entry registration' },
  ],
  neco: [{ id: 'neco-checker', name: 'NECO Result Checker', price: 1300, description: 'Check NECO results' }],
  nabteb: [{ id: 'nabteb-checker', name: 'NABTEB Result Checker', price: 900, description: 'Check NABTEB results' }],
}

export const virtualAccount = {
  bankName: 'Wema Bank',
  accountName: 'PAYVELLA - Oluwaseun A. Adebola',
  accountNumber: '9012345678',
}

export const walletBreakdown = {
  mainBalance: 120430.5,
  cashbackBalance: 5250,
}

export const walletActivity = [
  {
    id: 'wa1',
    type: 'inflow',
    title: 'GTBank Deposit Inflow',
    date: 'Today, 09:12 AM',
    amount: 25000,
    icon: 'inflow',
  },
  {
    id: 'wa2',
    type: 'outflow',
    title: 'Airtime Purchase (MTN)',
    date: 'Today, 08:30 AM',
    amount: 1000,
    icon: 'airtime',
  },
  {
    id: 'wa3',
    type: 'inflow',
    title: 'Referral Bonus Reward',
    date: 'Yesterday, 04:15 PM',
    amount: 1000,
    icon: 'bonus',
  },
  {
    id: 'wa4',
    type: 'outflow',
    title: 'DSTV Compact Subscription',
    date: '02 Sep, 11:20 AM',
    amount: 12500,
    icon: 'cable',
  },
]