import type { ScaleLinear } from "d3";
import { useMemo } from "react";

type AxisLeftProps = {
    yScale: ScaleLinear<number, number>;
    pixelsPerTick: number;
    width: number;
    label?: string;
    margin?: number;
};

const TICK_LENGTH = 10;

export const AxisLeft = ({ yScale, pixelsPerTick, width, label = 'GDP per capita (normalized)', margin = 60 }: AxisLeftProps) => {
    const range = yScale.range();

    const ticks = useMemo(() => {
        const height = range[0] - range[1];
        const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

        return yScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            yOffset: yScale(value),
        }));
    }, [yScale]);

    return (
        <>
            {/* Ticks and labels */}
            {ticks.map(({ value, yOffset }) => (
                <g
                    key={value}
                    transform={`translate(0, ${yOffset})`}
                    shapeRendering={"crispEdges"}
                >
                    <line
                        x1={-TICK_LENGTH}
                        x2={width + TICK_LENGTH}
                        stroke="#D2D7D3"
                        strokeWidth={0.5}
                    />
                    <text
                        key={value}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateX(-20px)",
                            fill: "#D2D7D3",
                        }}
                    >
                        {value}
                    </text>
                </g>
            ))}
            {/* Axis label - Corrected Vertical */}
            {/* <text
                x={-((range[1] - range[0]) / 2)} // Adjust distance from the axis
                y={-(margin - 10)} // Centered along the axis height
                transform="rotate(-90)"
                style={{
                    fontSize: "12px",
                    textAnchor: "middle",
                    fill: "#D2D7D3",
                }}
            >
                {label}
            </text> */}
            {/* Axis label - Corrected Vertical */}
            <text
                x={-(((range[0] - range[1]) / 2))} // Adjust distance from the axis
                y={-(margin - TICK_LENGTH)} // Centered along the axis height
                transform="rotate(-90)"
                style={{
                    fontSize: "12px",
                    textAnchor: "middle",
                    fill: "#D2D7D3",
                }}
            >
                {label}
            </text>

        </>
    );
};
