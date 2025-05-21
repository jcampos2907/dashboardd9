import CountryList from "./countryList";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

export default function Filters() {

    return (

        <Card>
            <CardHeader>
                <CardTitle>
                    Filtros
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CountryList />
                <Separator className="w-full my-4" />
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms2" disabled />
                    <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Grupo A
                    </label>
                </div>
                <Separator className="w-full my-4" />

                <div className="flex items-center space-x-2">
                    <Checkbox id="terms22" disabled />
                    <label
                        htmlFor="terms22"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Grupo B
                    </label>
                </div>
                <Separator className="w-full my-4" />


            </CardContent>
        </Card>
    )
}