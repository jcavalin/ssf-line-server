# SSF Line Server

## How does your system work?
On startup, the system splits the file received by the parameter into multiple small files. According to the `src/config/fileConfig.js` configuration file, it decides how many lines each file will have, and how many files will be in each subdirectory. The system names each subdirectory and file according to the line number in the original file, creating kinda of an index.
Although the preprocess could be very time-consuming depending on the size of the original file, the system can have a consistent time to get any line when offered it by a web server. Another downside of this strategy is that it's necessary to have at least the same amount of free disk space as the size of the original file while processing.

## How will your system perform with a 1 GB file? a 10 GB file? a 100 GB file?
|        | Time to load | Requests             | Success Rate     | Fail Rate      | Average Response time |
|--------|--------------|----------------------|------------------|----------------|-----------------------|
| 1 GB   | 00:01:51.90  | 117,664 (1,872.95/s) | 99.97% (117,663) | 0.02% (31)     | 3.658s                |
| 10 GB  | 00:24:59.99  | 118,178 (1,873.27/s) | 99.98% (118,156) | 0.01% (22)     | 3.712s                |
| 100 GB | 03:07:14.24  | 126,371 (2,009.70/s) | 99.98% (126,358) | 0.01% (13)     | 4.262s                |

<sub>**Note**: 100k users performing the test for 60 seconds with random line index.

## How will your system perform with 100 users? 10000 users? 1000000 users?
| Users     | Requests             | Success Rate      | Fail Rate     | Average Response time |
|-----------|----------------------|-------------------|---------------|-----------------------|
| 100       | 6,000 (99.42/s)      | 100.00% (6,000)   | 0.00% (0)     | 0.002s                |
| 1,000     | 60,000 (990.45/s)    | 100.00% (60,000)  | 0.00% (0)     | 0.003s                |
| 10,000    | 486,116 (7,908.50/s) | 100.00% (486,116) | 0.00% (0)     | 0.206s                |
| 100,000   | 117,664 (1,872.95/s) | 99.97% (117,663)  | 0.02% (31)    | 3.658s                |
| 1,000,000 | N/A                  | N/A               | N/A           | N/A                   |

<sub>**Note**: Performing the test for 60 seconds with random line index and 1GB file.

<sub>**Note2**: Due to hardware limitations, it was not possible to run the 1kk users scenario.

## What documentation, websites, papers, etc did you consult in doing this assignment?
- [4 ways to read file line by line in Node.js](https://geshan.com.np/blog/2021/10/nodejs-read-file-line-by-line/)
- [How to create a random .txt(Human readable text like ascii) file in linux](https://superuser.com/a/692180)
- [nacholibre/node-readlines](https://github.com/nacholibre/node-readlines)
- [chaijs API Reference](https://www.chaijs.com/api/)
- [k6 documentation](https://k6.io/docs/)
- [How To Scale Node.js Applications with Clustering](https://www.digitalocean.com/community/tutorials/how-to-scale-node-js-applications-with-clustering)
- [Node.js cluster documentation](https://nodejs.org/api/cluster.html)

## What third-party libraries or other tools does the system use? How did you choose each library or framework you used?
### express
It's a lightweight framework used to build REST APIs. It's well documented and popular, with more than 10 years in the market with many applications around the web built using it. 

### n-readlines
This is a simple library but very useful. It offers a simple interface to iterate a file and identify a new line. Besides, it reads the file in chunks avoiding high memory usage. A red flag for this library is its last release was 3 years ago.

### chaijs 
Chai is a useful tool that offers an assertion library for the tests. It has many contributors, many years in the market and I have already had experience with it. I followed the Chai documentation and also used it together with Mocha, which offers a test structure for JavaScript.

### Grafana k6
Among the options that I found to create loading tests, this one caught my eye because of its simplicity for a developer to create the tests. Using the same structure of the system (node) it was quick and easy to create some testing scenarios to evaluate the system's performance. Of course, it demands more study to understand each metric and how to configure each test properly, but it was very straightforward to create the scenarios.

## How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?
Around 17h. First I would prioritize the preprocess, because depending on the size of the file it takes a long time, maybe use another tool just to process the file in chunks asynchronously. After that, I would invest some time on the webserver, specifically in the infra part creating more than one instance for the system and adding a load balancer to them. Last but not least I think it would be nice to improve the load tests and the unit testing, creating more scenarios and organizing better the load tests.

## If you were to critique your code, what would you have to say about it?
In my opinion, it would be better to use a database to store the data of the file, which could be SQL or NoSQL. For this scenario I think a NoSQL would fit better since there is no relation between the data and the key is well established. The database could improve the reliability of storing and getting the data. Besides, node is not the best choice when processing large files, so changing it to another language could improve the time to preprocess the file.
Other than that, the system is not prepared to fail to recover, if something goes wrong while processing the file, all the progress will be lost.
Other important thing is lack of the logs, it would be helpful to have proper logs to identify any issue.
Finally, I would like to find another solution instead of just parsing the file line by line, maybe preprocessing and identifying the offsets of each line could be a solution.

---

# Util commands

### Generating test files
```
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  10485760  > test_files/sample_10mb.txt
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  104857600  > test_files/sample_100mb.txt
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  1073741824  > test_files/sample_1gb.txt
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  10737418240  > test_files/sample_10gb.txt
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  107374182400  > test_files/sample_100gb.txt
```

### Loading file
```
npm install
npm run process-file [filePath]
```

### Start server
```
npm install
npm run start
```

### Running unit tests
```
npm install
npm run test
```

### Build and run
```
./buid.sh
./run.sh [filePath]
```

### Get line from web server
```
curl 'http://127.0.0.1/lines/1' -H 'User-Agent: curl' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8' -H 'Accept-Language: en-US,en;q=0.5'  -H 'Accept-Encoding: gzip, deflate, br' -H 'Connection: keep-alive'
```