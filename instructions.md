# Respondent Software Engineer Backend
## Technical Test
We believe this should take less than 2-3 hours to complete, but understand you may have other commitments and time constraints. Please let us know (roughly) when we should expect your solution.

Please submit code as if you intended to ship it to production. The details matter. **Tests are expected**, well written and simple code.

We’d prefer you submit your test using Javascript/NodeJS as these are the languages we use. Feel to share your code with a repository or a private gist.

### Task 1 - Matching
Matching Respondents With Projects (Paid Opportunities)
Central to the Respondent platform is a matching algorithm that matches research participants with paid opportunities launched by researchers.

We have some respondents/participants data in a text file (respondents.csv attached) and data attributes we know about them (one respondent per line). We would like to evaluate whether they match (a good fit) with a project (paid opportunities) (project.json attached).

Write a matching score function that calculates their likelihood to be picked based on the following data points:
- Industry
- Job title
- Location (max 100km)

Write a program that will read the full list of respondents and output the **names, distance and matching score** of matching respondents (within 100km), sorted by matching score.
Please refer to this [Wikipedia Article](https://en.wikipedia.org/wiki/Great-circle_distance) to calculate the distance. Remember to convert degrees to radians when calculating the distance. Please include some unit tests to cover your code and functions.

# Solution
## Provided by Md Mahbubur Rahman

### Summary
The solution has been developed as simple Node.js application using typescript and other open source npm packages. The project also includes automated unit testing along with the test coverage, viewable as html. The input data file is placed in data folder as well as the output data file whic is generated after finding the matching respondents.

Below are the data points and percentages distribution that has been used to calculate the scores for find a good match.:
- title match - 60%
- industry match - 20%
- distance match - 30%

The result is sorted by score and saved in the `matched_respondents.csv` file.
As per the requirement, respondents that are out of the location bounds (> 100 KM), gets discarded from the matching respondents list.

## Prerequisites

Make sure Node.js v14.4.0 or higher is installed on the machine running the application.

## Dependencies

- "@types/jest": "^25.2.3",
- "@types/node": "^14.0.11",
- "@types/string-similarity": "^3.0.0",
- "jest": "^26.0.1",
- "ts-jest": "^26.1.0",
- "ts-node": "^8.10.2",
- "typescript": "^3.9.5"
- "csv-writer": "^1.6.0",
- "csvtojson": "^2.0.10",
- "great-circle-distance": "^1.0.2",
- "string-similarity": "^4.0.1"

## Project structure

```
se-screener-mdmr
    |-- data
        |-- project.json
        |-- respondents_data_test.csv
        |-- respondents.json
        |-- matched_respondents.csv
    |-- src
        |-- app.ts
        |-- matching_engine_helper.ts
        |-- maching_engine.ts
    |-- tests
        |-- matching_engine.test.ts
        |-- matching_engin.test.ts
    |-- coverage
        |-- index.html
        ...
    |-- package.lock
    |-- node_modules
    ...
``` 

## Commands

### To run the application

- Generate `node_modules` folder in the project install application dependencies by running
```
npm install
```
- Parse `respondents_data_test.csv` file to generate `respondents_data.json` file in `/data` directory
```
npm parse-csv
```
- Runs the application and generates the matching respndents file as `matched_respondents.csv` in `/data` directory
```
npm start
```
## To run the tests
- Run the tests *without* generating any coverage directory
```
npm test
```
- Run the tests to generate the coverage directory for reveiwing the unit test coverage in `coverage/index.html` path as this generates html files in coverage folder
```
npm run test-cov
```
### Test coverage
```
 PASS  tests/matching_engine_helper.test.ts
 PASS  tests/matching_engine.test.ts
---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------|---------|----------|---------|---------|-------------------
All files                  |     100 |      100 |     100 |     100 |
 matching_engine.ts        |     100 |      100 |     100 |     100 |
 matching_engine_helper.ts |     100 |      100 |     100 |     100 |
---------------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        2.126 s
```
Some more tests can be added as part of functional validation such as files with bad and missing input data, files generated with empty values(no match found), etc which is not covered as part of the test automation.

Note: This development has solely been done by Md Mahbubur Rahman with help from online resources like stackoverflow etc.




