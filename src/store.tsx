import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react'
import { SEED_BILLIONAIRES, SEED_BILLS, SEED_DEBTS } from './data/seed'
import { shuffle } from './lib/shuffle'
import type { AppState, Debt } from './types'

const STORAGE_KEY = 'pfm-state-v2'

type Action =
  | { type: 'pay'; debtId: string }
  | { type: 'payBill'; billId: string }
  | { type: 'skip'; debtId: string }
  | { type: 'post'; debt: Omit<Debt, 'id' | 'createdAt'> }
  | { type: 'selectBillionaire'; id: string }
  | { type: 'clearSkipped' }
  | { type: 'reset' }

const initialState = (): AppState => ({
  debts: shuffle(SEED_DEBTS),
  billionaires: SEED_BILLIONAIRES,
  payments: [],
  skipped: [],
  paidBills: [],
  activeBillionaireId: SEED_BILLIONAIRES[0].id,
})

// Seed content always comes from code; storage only restores player progress and user-posted debts.
function hydrate(saved: Partial<AppState>): AppState {
  const base = initialState()
  const savedDebts = new Map((saved.debts ?? []).map((d) => [d.id, d]))
  const savedNetWorth = new Map((saved.billionaires ?? []).map((b) => [b.id, b.netWorth]))
  return {
    ...base,
    debts: shuffle([
      ...(saved.debts ?? []).filter((d) => d.userPosted),
      ...base.debts.map((d) => ({ ...d, paidBy: savedDebts.get(d.id)?.paidBy })),
    ]),
    billionaires: base.billionaires.map((b) => ({ ...b, netWorth: savedNetWorth.get(b.id) ?? b.netWorth })),
    payments: saved.payments ?? [],
    skipped: saved.skipped ?? [],
    paidBills: saved.paidBills ?? [],
    activeBillionaireId: base.billionaires.some((b) => b.id === saved.activeBillionaireId) ? saved.activeBillionaireId! : base.activeBillionaireId,
  }
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? hydrate(JSON.parse(raw)) : initialState()
  } catch {
    return initialState()
  }
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'pay': {
      const debt = state.debts.find((d) => d.id === action.debtId)
      const payer = state.billionaires.find((b) => b.id === state.activeBillionaireId)
      if (!debt || debt.paidBy || !payer || payer.netWorth < debt.amount) return state
      return {
        ...state,
        debts: state.debts.map((d) => (d.id === debt.id ? { ...d, paidBy: payer.id } : d)),
        billionaires: state.billionaires.map((b) => (b.id === payer.id ? { ...b, netWorth: b.netWorth - debt.amount } : b)),
        payments: [...state.payments, { debtId: debt.id, billionaireId: payer.id, amount: debt.amount, at: Date.now() }],
      }
    }
    case 'payBill': {
      const bill = SEED_BILLS.find((b) => b.id === action.billId)
      const payer = state.billionaires.find((b) => b.id === state.activeBillionaireId)
      if (!bill || !payer || payer.netWorth < bill.amount) return state
      return {
        ...state,
        paidBills: [...state.paidBills, bill.id],
        billionaires: state.billionaires.map((b) => (b.id === payer.id ? { ...b, netWorth: b.netWorth - bill.amount } : b)),
        payments: [...state.payments, { debtId: bill.id, billionaireId: payer.id, amount: bill.amount, at: Date.now() }],
      }
    }
    case 'skip':
      return { ...state, skipped: [...state.skipped, action.debtId] }
    case 'post':
      return { ...state, debts: [{ ...action.debt, id: crypto.randomUUID(), createdAt: Date.now(), userPosted: true }, ...state.debts] }
    case 'selectBillionaire':
      return { ...state, activeBillionaireId: action.id }
    case 'clearSkipped':
      return { ...state, skipped: [] }
    case 'reset':
      return initialState()
  }
}

const StoreContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}

export function useActiveBillionaire() {
  const { state } = useStore()
  return state.billionaires.find((b) => b.id === state.activeBillionaireId) ?? state.billionaires[0]
}
