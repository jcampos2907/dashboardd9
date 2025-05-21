import type { ScaleLinear } from "d3";
import { useMemo } from "react";

type AxisBottomProps = {
    xScale: ScaleLinear<number, number>;
    pixelsPerTick: number;
    height: number;
    label: string;
};

// tick length
const TICK_LENGTH = 10;

export const AxisBottom = ({
    xScale,
    pixelsPerTick,
    height,
    label
}: AxisBottomProps) => {
    const range = xScale.range();

    const ticks = useMemo(() => {
        const width = range[1] - range[0];
        const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

        return xScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            xOffset: xScale(value),
        }));
    }, [xScale]);

    return (
        <>
            {/* Ticks and labels */}
            {ticks.map(({ value, xOffset }) => (
                <g
                    className="pointer-events-none select-none" // Non-selectable text
                    key={value}
                    transform={`translate(${xOffset}, 0)`}
                    shapeRendering={"crispEdges"}
                >
                    <line
                        className="pointer-events-none"
                        y1={TICK_LENGTH}
                        y2={-height - TICK_LENGTH}
                        stroke="#D2D7D3"
                        strokeWidth={0.5}
                    />
                    <text
                        className="pointer-events-none select-none font-mono" // Non-selectable text
                        key={value}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateY(20px)",
                            fill: "#D2D7D3",
                            userSelect: "none", // Double insurance for non-selectable
                        }}
                    >
                        {value}
                    </text>
                </g>
            ))}

            {/* Axis label */}
            <text
                className="pointer-events-none select-none font-mono text-sm text-black " // Non-selectable text
                x={range[0] + (range[1] - range[0]) / 2} // Centered
                y={TICK_LENGTH + 30} // Positioned below the ticks
                style={{
                    textAnchor: "middle",
                }}
            >
                {label}
            </text>
        </>
    );
};
