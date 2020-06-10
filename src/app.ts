import respondentsData from '../data/respondents_data.json'
import participantsData from '../data/project.json'
import { MatchingEngine } from './matching_engine'
import { MatchingEngineHelper } from './matching_engine_helper'
const fs = require('fs')

export module Application {

    let me = new MatchingEngine()
    let meh = new MatchingEngineHelper()

    console.log("[!] Initiated Matching Engine process...")
    let resultList = me.getMatchedRespondents(participantsData, respondentsData);
    resultList = resultList.sort(meh.sortByValues('score', 'desc'))

    let fileName = 'matched_respondents.csv'
    meh.exportToCSV(resultList, fileName);
    if(!fs.existsSync("./data/"+ fileName +"'")) {
        console.log("[!] Generated file in path: './data/"+ fileName +"'")
    }
    else{
        console.log('No file found in: ./data/' + fileName)
    }
}

