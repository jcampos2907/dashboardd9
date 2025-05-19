import useStore from "@/hooks/useStore";
import type { DataRow } from "@/types/types";
import { Separator } from "./ui/separator";

export type InteractionData = DataRow & {
    xPos: number;
    yPos: number;
    gdp: number;
    color: string
};



export const Tooltip = () => {
    const indicator = useStore((state) => state.indicator)
    const interactionData = useStore((state) => state.interactionData)
    if (!interactionData) {
        return null;
    }

    const { xPos, yPos, "Country Name": name, Value: x, gdp, color } = interactionData;

    return (
        <div
            className='w-[365px] bg-white border text-sm max-w-[200px] p-2 rounded-lg  absolute translate-y-[-50%] z-50 ml-8 shadow-xl'
            style={{
                left: xPos,
                top: yPos,
            }}
        >
            {/* display: flex;
    justify-content: space-between;
    line-height: 20px;
    font-size: 14px; */}

            <div className='border-l-4 pl-2 pt-0 mb-2' style={{ borderColor: color }}>
                <b className='text-md'>{name}</b>
            </div>
            <div className='flex justify-between text-xs px-1'>
                <span>GDP per Capita</span>
                <b>
                    {
                        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                            Math.round(gdp * 100) / 100,
                        )
                    }
                </b>
            </div>
            <Separator className="w-full my-2" />
            <div className='flex justify-between mb-2 text-xs px-1'>
                <span>
                    {indicator}
                </span>
                <b>{Math.round(x * 100) / 100}</b>
            </div>
        </div>
    );
};
