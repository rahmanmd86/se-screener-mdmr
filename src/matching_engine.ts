const { greatCircleDistance } = require("great-circle-distance");
import { compareTwoStrings } from 'string-similarity'

export class MatchingEngine{

    constructor(){}

    // Calculates matched respondents by reading participants and respondent data
    // Returns the list of matched respodents as objects
    getMatchedRespondents(participantsData: any, respondentsData: any) {
        let matchedRespondents = [];
        let titles = participantsData.professionalJobTitles;
        let industries = participantsData.professionalIndustry;
        let title = "";
        let industry = [];
        let respLatLon = {
            lat: "",
            lon: ""
        };
        let industryCompare, industryMatch, titleCompare, titleMatch, distance, distanceMatch, totalScore;

        console.log("[!] Processing respondents data to match participants needs...")
        for(let i=0; i<respondentsData.length; i++){

            respLatLon.lat = respondentsData[i].latitude;
            respLatLon.lon = respondentsData[i].longitude;
            distance = this.distanceCalculator(participantsData.cities, respLatLon);
            
            if(distance <= 100) {
                title = respondentsData[i].jobTitle;
                industry = respondentsData[i].industry.split(",");
                        
                industryCompare = this.compare(industries, industry);
                industryMatch = (industryCompare * 20);
                
                titleCompare = this.compare([title], titles);
                titleMatch = (titleCompare * 50);

                distanceMatch = (100 - distance) * 0.30;
                totalScore = parseFloat((industryMatch + titleMatch + distanceMatch).toFixed(2));

                matchedRespondents.push({
                    name: respondentsData[i].firstName,
                    distance: distance.toFixed(2),
                    score: totalScore
                });
            }
            else {
                console.log(`[!] Respondent ${respondentsData[i].firstName} is ${distance.toFixed(2)} kms away from participants location! Hence excluded from the list...`)
            }
        }

        return matchedRespondents;
    }
    
    // Calculates the distance between participant cities location and respondents location
    // Returns the minimun distance as KM
    distanceCalculator(cities: any, respLocation: any): number{
        let participantLocations: any = this.extractParticipantsLocation(cities)
        let distance: number, distances: number[] = [];
        let coords = {
            lat1: "", 
            lng1: "",
            lat2: respLocation.lat,
            lng2: respLocation.lon
        }

        for(let latLon of participantLocations){
            coords.lat1 = latLon.lat
            coords.lng1 = latLon.lon
            distance = greatCircleDistance(coords)
            distances.push(distance)
        }

        distance = Math.min.apply(Math, distances)
        return distance
    }

    // Extracts participants geolocations as list
    // Retruns a list of objects
    extractParticipantsLocation(cities: any): Object {
        let latsAndlonsMap = []
        let lat, lon;
        for(let i in cities){
            lat = cities[i].location.location.latitude
            lon = cities[i].location.location.longitude
            latsAndlonsMap.push({lat, lon})
        }
        return latsAndlonsMap
    }

    // Compares the similarity between strings within arrays
    // Returns the max similarity as number
    compare(arr1: string[], arr2: string[]): number {
        let comp: number, comps: number[] = [];
        
        arr1.forEach((e1:string) => arr2.forEach((e2: string) => {
            comp = compareTwoStrings(e1, e2)
            comps.push(comp)
        }));
        
        comp = Math.max.apply(Math, comps);
        return comp;
    }
    

}