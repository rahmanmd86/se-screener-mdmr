import { MatchingEngine } from '../src/matching_engine';
import { MatchingEngineHelper } from '../src/matching_engine_helper';


let matchingEngine: any, participantsData: any = [], respondentsData: any = [];
beforeAll(() =>{
    matchingEngine = new MatchingEngine()
    participantsData =
    {
        cities: [
            {
                location : {
                    formattedAddress : "New York, NY, USA",
                    location : {
                        latitude : 40.7127753,
                        longitude : -74.0059728
                    }
                }
            }, 
            {
                location : {
                    formattedAddress : "Philadelphia, PA, USA",
                    location : {
                        latitude : 39.9525839,
                        longitude : -75.1652215
                    }
                }
            }, 
            {
                location : {
                    formattedAddress : "Miami, FL, USA",
                    location : {
                        latitude : 25.7616798,
                        longitude : -80.1917902
                    }
                }
            }, 

        ],
        professionalJobTitles : [ 
            "Developer", 
            "Software Engineer", 
            "Software Developer", 
            "Programmer", 
            "Application Architect", 
            "Application Developer"
        ],
        professionalIndustry : [ 
            "Banking", 
            "Financial Services", 
            "Government Administration", 
            "Computer Software"
        ]
    }, 
    
    respondentsData = [
        {
            firstName: "Jefferson",
            gender: "male",
            jobTitle: ".NET Developer",
            industry: "Banking,Information Technology and Services,Transportation/Trucking/Railroad,Computer Software",
            city: "New York, NY, USA",
            latitude: "40.7127753",
            longitude: "-74.0059728"
        },
        {
            firstName: "Jillian",
            gender: "female",
            jobTitle: "3D Artist",
            industry: "Computer Software,Entertainment",
            city: "Brooklyn, NY, USA",
            latitude: "40.6781784",
            longitude: "-73.9441579"
        },
        {
            firstName: "Vivek",
            gender: "male",
            jobTitle: "AI/ML Scientist",
            industry: "Financial Services,Computer Software,Electrical/Electronic Manufacturing,Research,Nanotechnology",
            city: "New York, NY, USA",
            latitude: "40.7127753",
            longitude: "-74.0059728"
        },
    ]
})

test('Tests getMatchedRespondents function in matching engine, respondents within 100kms', () => {

    let actual = matchingEngine.getMatchedRespondents(participantsData, respondentsData)
    let expected = 
    [
        { name: 'Jefferson', distance: '0.00', score: 90 },
        { name: 'Jillian', distance: '6.48', score: 55.75 },
        { name: 'Vivek', distance: '0.00', score: 53.13 }
    ]

    expect(actual).toMatchObject(expected);
})

test('Tests getMatchedRespondents function in matching engine, respondents outside 100kms', () => {

    respondentsData = [
        {
            firstName: "Casey",
            gender: "female",
            jobTitle: "Data Entry Clerk",
            industry: "Computer Software",
            city: "Washington, PA 15301, USA",
            latitude: "40.17396",
            longitude: "-80.2461714"
        },
        {
            firstName: "Dean",
            gender: "male",
            jobTitle: "System Administrator",
            industry: "Automotive,Computer Games,Computer Software,Executive Office,Food Production",
            city: "Washington, NC, USA",
            latitude: "35.5465517",
            longitude: "-77.0521742"
        }
    ]
    let actual = matchingEngine.getMatchedRespondents(participantsData, respondentsData)
    let expected: any = []

    expect(actual).toMatchObject(expected)
})

test('Tests compare method in matching engine with matching strings', () => {
    let arr1 = ["Developer","Programmer","Architect"]
    let arr2 = ["Developer"]

    expect(matchingEngine.compare(arr1, arr2)).toBe(1);
});

test('Tests compare method in matching engine with mismatching strings', () => {
    let arr1 = ["Developer","Programmer","Architect"]
    let arr2 = ["Jugde"]

    expect(matchingEngine.compare(arr1, arr2)).toBe(0);
});

test('Tests compare method in matching engine with empty strings', () => {
    let arr1 = ["Developer","Programmer","Architect"]
    let arr2 = [""]

    expect(matchingEngine.compare(arr1, arr2)).toBe(0);
});

test('Tests extractParticipantsLocation method in matching engine', () => {
    let cities = 
    [
        {
            location: {
                location: {
                    latitude: 38.9071923,
                    longitude : -77.0368707
                }
            }
        }
    ]

    let actual = matchingEngine.extractParticipantsLocation(cities)
    let expected = [{lat: 38.9071923, lon: -77.0368707}]
    
    expect(actual).toMatchObject(expected);
});

test('Tests distanceCalculator method in matching engine with same geolocation for participant and respondents', () => {
    let cities = [{
        location: {
            location: {
                latitude: 38.9071923,
                longitude : -77.0368707
            }
        }
    }]
    let respLoc = {
        lat: 38.9071923,
        lon: -77.0368707
    }

    let distance = matchingEngine.distanceCalculator(cities, respLoc)
    expect(distance).toBe(0);
});

test('Tests distanceCalculator method in matching engine with different geolocation for participant and respondents', () => {
    let cities = [{
        location: {
            location: {
                latitude : 40.7127753,
                longitude : -74.0059728
            }
        }
    }]
    let respLoc = {
        lat: 38.9071923,
        lon: -77.0368707
    }

    let distance = matchingEngine.distanceCalculator(cities, respLoc)
    expect(distance).toBeGreaterThan(0);
});

test('Tests distanceCalculator method in matching engine missing data in participant', () => {
    let cities = [{
        location: {
            location: {
                latitude: "",
                longitude : -77.0368707
            }
        }
    }]
    let respLoc = {
        lat: 38.9071923,
        lon: -77.0368707
    }

    let distance = matchingEngine.distanceCalculator(cities, respLoc)
    expect(distance).toBeGreaterThan(0);
});

test('Tests distanceCalculator method in matching engine missing data in respondant', () => {
    let cities = [{
        location: {
            location: {
                latitude: 38.9071923,
                longitude : -77.0368707
            }
        }
    }]
    let respLoc = {
        lat: "",
        lon: -77.0368707
    }

    let distance = matchingEngine.distanceCalculator(cities, respLoc)
    expect(distance).toBeGreaterThan(0);
});