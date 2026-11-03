export type Lang = 'vi' | 'en'

export type Region = 'vn' | 'asia' | 'world'

export type DebtCategory = 'electric' | 'medical' | 'rent' | 'credit' | 'milktea' | 'other'

export interface Debt {
  id: string
  debtor: string
  age: number
  avatar: string
  image?: string
  cover?: string
  bio?: string
  region?: Region
  category: DebtCategory
  amount: number
  story: string
  createdAt: number
  paidBy?: string
}

export interface Billionaire {
  id: string
  name: string
  avatar: string
  image?: string
  bio?: string
  region?: Region
  netWorth: number
  quirk: string
}

export interface Payment {
  debtId: string
  billionaireId: string
  amount: number
  at: number
}

export interface AppState {
  debts: Debt[]
  billionaires: Billionaire[]
  payments: Payment[]
  skipped: string[]
  paidBills: string[]
  activeBillionaireId: string
}

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Bill {
  id: string
  title: string
  issuer: string
  category: DebtCategory
  amount: number
  joke: string
  rarity: Rarity
  image?: string
}
