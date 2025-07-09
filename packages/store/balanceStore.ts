import { create } from "zustand";
type BalanceStore = {
    balance: number
}
export const useBalanceStore = create<BalanceStore>(() => ({
    balance: 0
}))