import type { InteractionData } from '@/components/Tooltip';
import type { DataRow } from '@/types/types';
import type { ScaleLinear } from 'd3';
import { create } from 'zustand';
import { data } from "../data";





type Store = {
    indicator: string,
    data: DataRow[]
    year: number,
    interactionData: InteractionData | null,
    xScale: ScaleLinear<number, number, never>,
    yScale: ScaleLinear<number, number, never>,
    dimensions: { width: number, height: number }
    setDimensions: (dimensions: { width: number, height: number }) => void,
    setXScale: (xScale: ScaleLinear<number, number, never>) => void,
    setYScale: (yScale: ScaleLinear<number, number, never>) => void,
    setInteractionData: (data: InteractionData | null) => void,
    updateData: (data: DataRow[]) => void,
    updateIndicator: (indicator: string) => void,
    updateYear: (year: number) => void,
}

const useStore = create<Store>((set) => ({
    indicator: 'Women in Parliament (%)',
    data: data,
    year: 2022,
    interactionData: null,
    dimensions: { width: 0, height: 0 },
    setDimensions: (dimensions: { width: number, height: number }) => set({ dimensions }),
    xScale: (null as unknown) as ScaleLinear<number, number, never>,
    yScale: (null as unknown) as ScaleLinear<number, number, never>,
    setXScale: (xScale: ScaleLinear<number, number, never>) => set({ xScale }),
    setYScale: (yScale: ScaleLinear<number, number, never>) => set({ yScale }),
    setInteractionData: (interactionData: InteractionData | null) => set({ interactionData }),
    updateIndicator: (indicator: string) => set({ indicator }),
    updateYear: (year: number) => set({ year }),
    updateData: (data: DataRow[]) => set({ data }),
}))
export default useStore