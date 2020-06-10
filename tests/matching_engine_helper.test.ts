const fs = require('fs')
import { MatchingEngineHelper } from '../src/matching_engine_helper';

let meh: any, listOfItems: any;
beforeAll(() =>{
    meh = new MatchingEngineHelper
    listOfItems = 
    [{
        name: 'John',
        distance: 87,
        score: 45
    },
    {
        name: 'Greg',
        distance: 25,
        score: 78
    },
    {
        name: 'Bert',
        distance: 22,
        score: 66
    }]
})

test('Test exportToCSV method in matching engine helpers', async () => {
    let results = [{
        name: 'Jack',
        distance: 99,
        score: 35
    }]

    meh.exportToCSV(results, 'test.csv')
    let filePath = './data/test.csv'
    expect(fs.existsSync(filePath)).toBeTruthy()

    let result = await meh.readFromCSV(filePath)
    expect(result).toMatchObject([{
        name: 'Jack',
        distance: '99',
        score: '35'
    }])
})

test('Tests sortByValues method with desc in matching engine helpers', () => {    
    let sorted = listOfItems.sort(meh.sortByValues('score', 'desc'))
    expect(sorted).toMatchObject(
    [{
        name: 'Greg',
        distance: 25,
        score: 78
    },
    {
        name: 'Bert',
        distance: 22,
        score: 66
    },
    {
        name: 'John',
        distance: 87,
        score: 45
    }])
    
});

test('Tests sortByValues method with asc in matching engine helpers', () => {
    let sorted = listOfItems.sort(meh.sortByValues('score', 'asc'))
    expect(sorted).toMatchObject([
        {
            name: 'John',
            distance: 87,
            score: 45
        },
        {
            name: 'Bert',
            distance: 22,
            score: 66
        },
        {
            name: 'Greg',
            distance: 25,
            score: 78
        }
    ])
    
});

test('Tests sortByValues method with asc in matching engine helpers with string value', () => {
    let sorted = listOfItems.sort(meh.sortByValues('name', 'asc'))
    expect(sorted).toMatchObject([
        {
            name: 'Bert',
            distance: 22,
            score: 66
        },
        {
            name: 'Greg',
            distance: 25,
            score: 78
        },
        {
            name: 'John',
            distance: 87,
            score: 45
        },
    ])
    
});

test('Tests sortByValues method with asc in matching engine helpers with unknown key', () => {
    let sorted = listOfItems.sort(meh.sortByValues('nokey'))
    expect(sorted).toMatchObject([
        {
            name: 'Bert',
            distance: 22,
            score: 66
        },
        {
            name: 'Greg',
            distance: 25,
            score: 78
        },
        {
            name: 'John',
            distance: 87,
            score: 45
        },
    ])
    
});

test('Tests sortByValues method with asc in matching engine helpers with same value', () => {
    listOfItems = [
        {
            name: 'Greg',
            distance: 25,
            score: 78
        },
        {
            name: 'Bert',
            distance: 87,
            score: 78
        }
    ]

    let sorted = listOfItems.sort(meh.sortByValues('score'))
    expect(sorted).toMatchObject([
        {
            name: 'Greg',
            distance: 25,
            score: 78
        },
        {
            name: 'Bert',
            distance: 87,
            score: 78
        }
    ])
    
});

// Cleanup test
afterAll(() => {
    try {
        fs.unlinkSync('./data/test.csv')
        //file removed
    } catch(err) {
        console.error(err)
  }
});