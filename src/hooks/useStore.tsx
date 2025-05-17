import type { DataRow } from '@/types/types';
import { create } from 'zustand';
import { data } from "../data";





type Store = {
    indicator: string,
    data: DataRow[]
    year: number,
    updateData: (data: DataRow[]) => void,
    updateIndicator: (indicator: string) => void,
    updateYear: (year: number) => void,
}

const useStore = create<Store>((set) => ({
    indicator: 'Women in Parliament (%)',
    data: data,
    year: 2022,
    updateIndicator: (indicator: string) => set({ indicator }),
    updateYear: (year: number) => set({ year }),
    updateData: (data: DataRow[]) => set({ data }),
}))
export default useStore