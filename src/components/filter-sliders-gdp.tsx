'use client'

import {
    ChartContainer,
    type ChartConfig,
} from "@/components/ui/chart"
import { useData } from "@/hooks/use-data"
import useStore from "@/hooks/useStore"
import { useMemo, useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
} from "recharts"
import { Input } from "./ui/input"
import { Slider } from "./ui/slider"

// Histogram binning function
function binData(values: number[], binSize: number) {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const binCount = Math.ceil((max - min) / binSize)

    const bins = Array.from({ length: binCount }, (_, i) => ({
        binStart: min + i * binSize,
        binEnd: min + (i + 1) * binSize,
        count: 0,
    }))

    for (const val of values) {
        const binIndex = Math.min(Math.floor((val - min) / binSize), binCount - 1)
        bins[binIndex].count += 1
    }

    return bins.map((bin) => ({
        range: `${bin.binStart.toFixed(0)} - ${bin.binEnd.toFixed(0)}`,
        binStart: bin.binStart,
        binEnd: bin.binEnd,
        count: bin.count,
    }))
}

export default function FilterSliderGDP() {
    const year = useStore((state) => state.year)
    const [isFocused, setIsFocused] = useState(false)
    const [dataPerYear] = useData()
    const { filteredDataGDP } = dataPerYear[year[1].toString()] ?? { filteredDataGDP: [] }
    const [minVal, maxVal] = useMemo(() => {
        const vals = filteredDataGDP.map(item => Number(item.Value)).filter(val => !isNaN(val))
        return [Math.min(...vals), Math.max(...vals)]
    }, [filteredDataGDP])
    const values = useStore((state) => state.gdpRange)
    const setValues = useStore((state) => state.setGdpRange)
    const histogramData = useMemo(() => {
        const rawValues = filteredDataGDP
            .map(item => Number(item.Value))
            .filter(val => !isNaN(val))

        return binData(rawValues, 5000).map((bin) => ({
            ...bin,
            fill: bin.binEnd < values[0] || bin.binStart > values[1]
                ? "var(--muted-foreground)"  // low opacity
                : "var(--foreground)"        // normal opacity
        }))
    }, [filteredDataGDP, values])

    const chartConfig = {
        count: {
            label: "Frequency",
            color: "var(--foreground)",
        },
    } satisfies ChartConfig

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
                <BarChart
                    accessibilityLayer
                    // width={100}
                    // height={300}
                    data={histogramData}
                // margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                    <CartesianGrid vertical={false} horizontal={false} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {histogramData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ChartContainer>

            <Slider
                value={values}
                min={minVal}
                max={maxVal}
                // step={5000}
                onValueChange={setValues}
                className="w-full px-4"
            />

            <div className="flex flex-row justify-between w-full px-4 gap-2 font-mono">
                <Input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={isFocused ? values[0] : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                        values[0],
                    )}
                    min={minVal}
                    max={values[1] - 1}
                    onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        if (!isNaN(val)) setValues([val, values[1]])
                    }}
                    className="w-1/2"
                />
                <Input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={isFocused ? values[1] : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                        values[1],
                    )}
                    min={values[0] + 1}
                    max={maxVal}
                    onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        if (!isNaN(val)) setValues([values[0], val])
                    }}
                    className="w-1/2"
                />
            </div>
        </div>
    )
}
