import useSweepLines from "@/hooks/use-sweeplines"
import { GripHorizontalIcon } from "lucide-react"

export default function SweepLines({ boundsWidth, }: { boundsWidth: number }) {
    const { yTop, yBottom } = useSweepLines()

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


            {/* Sweep Line Bottom */}
            <line
                className="sweep-line-bottom stroke-border stroke-2"
                x1={0}
                x2={boundsWidth}
                y1={yBottom}
                y2={yBottom}
                style={{ transition: "y 0.1s" }}
            />

            <foreignObject
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