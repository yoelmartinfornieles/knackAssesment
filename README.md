# KNACK CODING EXERCISE

> This is the implementation of the answer to the knack coding exercise by Yoel Martin Fornieles.
> See the 'coding_excercise_instructions.md' file for the requirements of the exercise.

## Considerations

I consider an object a duplicate when it got the same keys and values than another one. This could be further discussed and approve within the team.

I consider that, for the duplicate objects, the _id field is the only one negligible (as the id field is the only one that cannot be a duplicate, being unique in the db).

I consider the object in the mock_application.json file as the model for the knack object. This could be defined in a model within the team, but right now is the only info I got.

## Install

```sh
npm i
```

### Dependencies
  "chai": "^4.3.7",
  "mocha": "^10.2.0"

### devDependencies

  "eslint": "^8.37.0",
  "eslint-config-airbnb-base": "^15.0.0",
  "eslint-plugin-import": "^2.27.5"

## Usage

```sh
npm start
```

-- the app will take as default values the following:

const filename = 'resources/mock_application.json';

const paramsToSanitize = [['objects', 'fields'], ['scenes', 'views']];

const outputFilename = 'sanitized_application.json';

This values can be modified from the index.js file.

The sanitized version of the mock_application.json file will be saved inside the 'output' directory. However, a sample can be found in the root of the project.

## Run tests

```sh
npm test
```

The tests can be located in the './src/test' directory.
Mocha have been used for the implementation of the tests.

## ToDos

- Work further in the error control (if the app would be an endpoint, add the error_codes, send more explicit error messages)
- Decide when this app will be run (from a design perspective, is not the same to check for duplicates after the creation of the objects, with a cron on an scheduled maintenance, etc...)
- Define what a duplicate is for our work team.

## Author

👤 **Yoel Martin Fornieles**

- Github: [@yoelmartinfornieles](https://github.com/yoelmartinfornieles)
- LinkedIn: [@Yoel Martin Fornieles](https://www.linkedin.com/in/yoel-martin/)
