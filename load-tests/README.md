# SSF Line Server load tests

### Running load tests
```
npm install
npm run test
```
<sub>**Note**: It's necessary to install k6: https://k6.io/docs/get-started/installation/

Or use the container:

```
docker-compose up --build
```

### Tests available
```
k6 run scenarios/getAnyLine.js --vus 100000 --duration 60s
k6 run scenarios/getAnyLineOneFile.js --vus 100000 --duration 60s
k6 run scenarios/getFirstLine.js --vus 100000 --duration 60s
k6 run scenarios/getLastLine.js --vus 100000 --duration 60s
```
<sub>**Note**: Depending on the size of the file, you may change the `maxLineIndex` variable in the `getAnyLine.js` scenario to the last line of the processed file.