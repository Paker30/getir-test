# getir-test

This is an API which solves getir's backend test.

## Where is the API

The api has been deployed at heroku under this url ```https://serene-reaches-37796.herokuapp.com```

In order to make sure the API is listening hit this endpoint to get the version

```https://serene-reaches-37796.herokuapp.com/version```

### Example of request

In order to request records you must make a POST request to this url

```https://serene-reaches-37796.herokuapp.com/records```

With this body

```json
{
    "startDate": "2016-01-26",
    "endDate": "2016-02-02",
    "minCount": 2700,
    "maxCount": 3000
}
```

Date format must follow this pattern YYYY-MM-DD

## Install the project

In order to install the project run this command

```bash
npm i
npm start
```

The API would be listing under port 3000 in your localmachine

### Testing

If you want to execute the test run this command

```bash
npm run test
```

### Environment variables

|Name|Default value|Description|
|----|------------|------------|
|PORT| 3000       |Port in which the API listen|
|MONGO_URI|```mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true```|Default mongo connection|
