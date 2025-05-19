// import { CIRCLE_RADIUS } from "@/constants";
// import { select } from "d3-selection";
// import { useEffect } from "react";
// export default function useCircleTransition(
//     { svgRef }: { svgRef: React.RefObject<SVGSVGElement | null> },
// ) {

//     useEffect(() => {
//         const svg = select(svgRef.current);
//         svg.selectAll("circle.last_year")
//             .data(currentFilteredData)
//             .join("circle")
//             .attr("cx", (d) => {
//                 const previousYearDataItem = lastYearFilteredData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
//                 return xScale(previousYearDataItem?.Value ?? 0)
//             })
//             .attr("cy", (d) => {
//                 const previousYearGdpValue = lastYearGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
//                 return yScale(previousYearGdpValue?.["Value"] ?? 0)
//             })
//             // .attr("cx", (d) => xScale(d.Value))
//             // .attr("cy", (d) => {
//             //     const gdpValue = currentGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === d.Year);
//             //     return yScale(gdpValue?.["Value"] ?? 0)
//             // })
//             .attr("r", CIRCLE_RADIUS)
//             .attr("fill", (d) => CountryColors[d["Country Name"]])
//             .attr("opacity", (d) => {
//                 const previousYearDataItem = lastYearFilteredData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
//                 if (!previousYearDataItem?.Value) {
//                     return 0
//                 }
//                 return 0.8

//             })
//             .transition()
//             .duration(1000)

//             // .attr('cy', 0)
//             .attr("r", () => CIRCLE_RADIUS / 2);

//         svg.selectAll("circle.current_year")
//             .data(currentFilteredData)
//             .join("circle")
//             .attr("r", 0)
//             .attr("cx", (d) => {
//                 const previousYearDataItem = lastYearFilteredData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
//                 return xScale(previousYearDataItem?.Value ?? d.Value)
//             })
//             .attr("cy", (d) => {
//                 const previousYearGdpValue = lastYearGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
//                 const currentGdpValue = currentGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === d.Year);
//                 return yScale(previousYearGdpValue?.["Value"] ?? (currentGdpValue?.["Value"] ?? 0))
//             })

//             .attr("fill", (d) => CountryColors[d["Country Name"]])
//             .transition()
//             .delay(600)
//             .duration(1000)
//             //desactivar para opcion 2
//             .attr("cx", (d) => xScale(d.Value))
//             .attr("cy", (d) => {
//                 const gdpValue = currentGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === d.Year);
//                 return yScale(gdpValue?.["Value"] ?? 0)
//             })
//             .attr("r", CIRCLE_RADIUS)
//     }, [currentFilteredData]);

// }