
import { MARGIN } from "@/constants";
import { data } from "@/data";
import useStore from "@/hooks/useStore";
import { scaleLinear } from "d3";
import { useEffect, useRef } from "react";
import Arrows from "./Arrows";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import Circles from "./Circles";

type ScatterplotProps = {
    width: number;
    height: number;
    // data: { x: number; y: number }[];

};


export default function ScatterPlot({ width, height }: ScatterplotProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const indicator = useStore((state) => state.indicator)
    const boundsHeight = useStore((state) => state.boundsHeight)
    const boundsWidth = useStore((state) => state.boundsWidth)
    const setXScale = useStore((state) => state.setXScale)
    const setYScale = useStore((state) => state.setYScale)
    const yScale = scaleLinear().domain([Math.min(...data.filter(item => item.Indicator == 'PIB ($)').map(v => v["Value"])) - 0.5, Math.max(...data.filter(item => item.Indicator == 'PIB ($)').map(v => v["Value"])) + 0.5]).range([boundsHeight, 0]);
    const xScale = scaleLinear().domain([Math.min(...data.filter(item => item.Indicator != 'PIB ($)').map(v => v["Value"])) - 1, Math.max(...data.filter(item => item.Indicator != 'PIB ($)').map(v => v["Value"])) + 1]).range([0, boundsWidth]);
    useEffect(() => {
        setXScale(() =>
            xScale
        );

        setYScale(() =>
            yScale
        );
    }, [yScale, xScale]);
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative">
                <svg width={width} height={height} ref={svgRef} id="scatterplot">
                    <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
                    >
                        {/* Y axis */}
                        <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} label="PIB per cápita ($)" />

                        {/* X axis, use an additional translation to appear at the bottom */}
                        <g transform={`translate(0, ${boundsHeight})`}>
                            <AxisBottom
                                xScale={xScale}
                                pixelsPerTick={40}
                                height={boundsHeight}
                                label={indicator}
                            />
                        </g>
                        {/* <SweepLines /> */}
                        <Arrows />

                        <Circles />
                    </g>
                </svg>
                <div
                    style={{
                        width: boundsWidth,
                        height: boundsHeight,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        pointerEvents: "none",
                        marginLeft: MARGIN.left,
                        marginTop: MARGIN.top,
                    }}
                >
                </div>
            </div>


        </div>
    );
};
