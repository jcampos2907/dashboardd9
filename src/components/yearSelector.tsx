// import { useYear } from "@/hooks/use-year";
// import { Slider } from "./ui/slider";

// export default function YearSelector() {
//     const { year, updateYear } = useYear();
//     // const [indicator, setIndicator] = useState("Women in Parliament (%)");

//     return (
//         <Slider value={[year]} defaultValue={[year]} min={2012} max={2022} step={1} onValueChange={(e) => updateYear(e[0])} />
//     )
// }

import { Slider } from "@/components/ui/slider";
import { useYear } from "@/hooks/use-year";
import React from "react";


const YearSelector: React.FC = () => {
    const min = 2012
    const max = 2022
    const step = 1
    // const onChange = (value: number) => {
    // console.log("Selected Year:", value);
    // }
    // const [value, setValue] = useState(min);

    // const handleChange = (newValue: number[]) => {
    //     setValue(newValue[0]);
    //     onChange(newValue[0]);
    // };

    const { year, updateYear } = useYear();

    const generateMarkers = () => {
        const markers = [];
        for (let i = min; i <= max; i += step) {
            markers.push(<div key={i} className="text-xs text-muted-foreground">{i}</div>);
        }
        return markers;
    };

    return (
        <div className="flex flex-col items-center space-y-4 w-full">
            <div className="w-full relative">
                <Slider value={[year]} defaultValue={[year]} min={2012} max={2022} step={1} onValueChange={(e) => updateYear(e[0])} />

                <div className="absolute inset-x-0 top-full flex justify-between mt-2">
                    {generateMarkers()}
                </div>
            </div>
        </div>
    );
};

export default YearSelector;
