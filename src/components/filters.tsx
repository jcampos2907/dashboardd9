import CountryList from "./countryList";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
            </CardContent>
        </Card>
    )
}