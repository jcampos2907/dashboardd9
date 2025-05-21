import useStore from "@/hooks/useStore";
import type { DataRow } from "@/types/types";
import { Separator } from "./ui/separator";

export type InteractionData = DataRow & {
    xPos: number;
    yPos: number;
    gdp: number;
    color: string
};
export const ScatterChartTooltip = ({ interactionData }: { interactionData: InteractionData }) => {
    const indicator = useStore((state) => state.indicator)
    if (!interactionData) {
        return null;
    }

    const { "Country Name": name, Value: x, gdp, color } = interactionData;

    return (
        <div
            className='w-[365px] bg-white border text-sm max-w-[200px] p-2 rounded-lg z-50  shadow-xl'
        >
            <div className='border-l-4 pl-2 pt-0 mb-2' style={{ borderColor: color }}>
                <b className='text-md'>{name}</b>
            </div>
            <div className='flex flex-row gap-8 mb-2 text-xs px-1 font-mono'>
                <span>PIB per cápita</span>
                <b>
                    {
                        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                            Math.round(gdp * 100) / 100,
                        )
                    }
                </b>
            </div>
            <Separator className="w-full my-2" />
            <div className='flex flex-row gap-8 mb-2 text-xs px-1 font-mono'>
                <span>
                    {indicator}
                </span>
                <b>{Math.round(x * 100) / 100}%</b>
            </div>
        </div>
    );
};
