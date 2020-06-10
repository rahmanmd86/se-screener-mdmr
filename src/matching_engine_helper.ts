const csv = require('csvtojson')

export class MatchingEngineHelper{

    constructor(){}

    // Exports the list of objects in to the designated data folder
    exportToCSV(listOfItems: {name: string, distance: number, score: number}[], fileName: string) {    
        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
            path: './data/'+fileName,
            header: [
                {id: 'name', title: 'name'},
                {id: 'distance', title: 'distance'},
                {id: 'score', title: 'score'}
            ]
        });
        
        csvWriter.writeRecords(listOfItems)       // returns a promise
            .then(() => {});
    }
    
    // Sorts a list of objects by values based on keys
    // Returns sorted list of json objects
    sortByValues(key: string, order = 'asc') {
        return function innerSort(a:any, b:any) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
                return 0;
            }
        
            const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
        
            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } 
            else if (varA < varB) {
                comparison = -1;
            }
            return ((order === 'desc') ? (comparison * -1) : comparison);
        };
    }

    // Read and parse CSV to generate json objects
    // returns list of json objects
    async readFromCSV(filePath: string){
        let jsonArray = await csv().fromFile(filePath);
        return jsonArray;
    }
}