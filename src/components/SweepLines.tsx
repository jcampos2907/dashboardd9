import useSweepLines from "@/hooks/use-sweeplines";
import useStore from "@/hooks/useStore";
import { GripHorizontalIcon } from "lucide-react";
import { useState } from "react";

export default function SweepLines() {
    const { yTop, yBottom, isDraggingBottom, isDraggingTop } = useSweepLines()
    const boundsWidth = useStore((state) => state.boundsWidth)
    const yScale = useStore((state) => state.yScale)();

    const [isHoveredTop, setIsHoveredTop] = useState(false);
    const [isHoveredBottom, setIsHoveredBottom] = useState(false);

    if (!yScale) {
        return null;
    }

    return (
        <>
            {/* Sweep Line Top */}
            <line
                className="sweep-line-top stroke-border stroke-2"
                x1={0}
                x2={boundsWidth}
                y1={yTop}
                y2={yTop}
                style={{ transition: "y 0.1s" }}
            />

            <foreignObject
                onMouseEnter={() => setIsHoveredTop(true)}
                onMouseLeave={() => setIsHoveredTop(false)}
                className="sweep-handle-top cursor-ns-resize bg-border h-3 w-4 items-center justify-center rounded-sm border"
                x={boundsWidth - 8}
                y={yTop - 6}
            // width={24}
            // height={24}
            >
                <div className=" flex flex-col cursor-ns-resize bg-border h-full w-full items-center justify-center">
                    <GripHorizontalIcon
                        className={`size-2.5`}
                    />
                </div>
            </foreignObject>
            <text
                x={boundsWidth - 40}
                y={yTop}
                className={`text-sm font-semibold pointer-events-none select-none ${isHoveredTop || isDraggingTop ? 'block' : 'hidden'}`}
                textAnchor="end"
                dy="0.3em"
            >
                GDP: ${yScale.invert(yTop).toFixed(2)}
            </text>


            {/* Sweep Line Bottom */}
            <line
                className="sweep-line-bottom stroke-border stroke-2"
                x1={0}
                x2={boundsWidth}
                y1={yBottom}
                y2={yBottom}
                style={{ transition: "y 0.1s" }}
            />

            <text
                x={boundsWidth - 40}
                y={yBottom}
                className={`text-sm font-semibold pointer-events-none select-none ${isHoveredBottom || isDraggingBottom ? 'block' : 'hidden'}`}
                fontSize="12px"
                textAnchor="end"
                dy="0.3em"
            >
                GDP: ${yScale.invert(yBottom).toFixed(2)}
            </text>

            <foreignObject
                onMouseEnter={() => setIsHoveredBottom(true)}
                onMouseLeave={() => setIsHoveredBottom(false)}
                className="sweep-handle-bottom cursor-ns-resize bg-border h-3 w-4 items-center justify-center rounded-sm border"
                x={boundsWidth - 8}
                y={yBottom - 6}
            // width={24}
            // height={24}
            >
                <div className=" flex flex-col cursor-ns-resize bg-border h-full w-full items-center justify-center ">
                    <GripHorizontalIcon
                        className={`size-2.5`}
                    />
                </div>
            </foreignObject>

        </>
    )
}