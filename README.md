# SSF Line Server

## How does your system work?
On startup, the system splits the file received by the parameter into multiple small files. According to the `src/config/fileConfig.js` configuration file, it decides how many lines each file will have, and how many files will be in each subdirectory. The system names each subdirectory and file according to the line number in the original file, creating kinda of an index.
Although the preprocess could be very time-consuming depending on the size of the original file, the system can have a consistent time to get any line when offered it by a web server. Another downside of this strategy is that it's necessary to have at least the same amount of free disk space as the size of the original file while processing the original file.

## How will your system perform with a 1 GB file? a 10 GB file? a 100 GB file?
|       | Running time to load | Requests          | Success Rate    | Fail Rate      | Average Response time |
|-------|----------------------|-------------------|-----------------|----------------|-----------------------|
|1 GB   | 00:02:17.88          | 74,648 (829.34/s) | 92.75% (69,243) | 7.24% (5,405)  | 10,285.13s            |
|10 GB  | 00:22:50.22          | 69,655 (773.83/s) | 92.35% (64,333) | 7.64% (5,322)  | 11,315.48s            |
|100 GB | 03:07:14.24          | 66,243 (736.01/s) | 87.94% (58,258) | 12.05% (7,985) | 12,238.29s            |

<sub>**Note**: 100k users performing the test for 60 seconds with random line index.

## How will your system perform with 100 users? 10000 users? 1000000 users?
|        | Requests          | Success Rate    | Fail Rate     | Average Response time |
|--------|-------------------|-----------------|---------------|-----------------------|
|100     |                   |                 |               |                       |
|10000   |                   |                 |               |                       |
|1000000 |                   |                 |               |                       |

<sub>**Note**: Performing the test for 60 seconds with random line index and 1GB file.

## What documentation, websites, papers, etc did you consult in doing this assignment?
- [4 ways to read file line by line in Node.js](https://geshan.com.np/blog/2021/10/nodejs-read-file-line-by-line/)
- [How to create a random .txt(Human readable text like ascii) file in linux](https://superuser.com/a/692180)
- [nacholibre/node-readlines](https://github.com/nacholibre/node-readlines)
- [k6 documentation](https://k6.io/docs/)

## What third-party libraries or other tools does the system use? How did you choose each library or framework you used?
### express
It's a lightweight framework used to build REST APIs. It's well documented and popular, with more than 10 years in the market with many applications around the web built using it. 

### n-readlines
This is a simple library but very useful. It offers a simple interface to iterate a file and identify a new line. Besides, it reads the file in chunks avoiding high memory usage. A red flag for this library is its last release was 3 years ago.

### chai 
Chai is a useful tool that offers an assertion library for the tests. It has many contributors, many years in the market and I have already had experience with it. I followed the Chai documentation and also used it together with Mocha, which offers a test structure for JavaScript.

### Grafana k6
Among the options that I researched to create loading tests, this one caught my eye because of its simplicity for a developer to create the tests. Using the same structure of the system (node) it was quick and easy to create some testing scenarios to evaluate the system's performance. Of course, it demands more study to understand each metric, but it was very straightforward to create the scenarios. Last but not least I think it would be nice to improve the load tests and the unit testing, creating more scenarios and organizing better the load tests.

## How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?
Around 15h. First I would prioritize the preprocess, because depending on the size of the file it takes a long time, maybe use another tool just to process the file in chunks asynchronously. After that, I would invest some time on the webserver, specifically in the infra part creating more than one instance for the system and adding a load balancer to them.

## If you were to critique your code, what would you have to say about it?


---

# Util commands

## Generating test files
```
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  10485760  > test_files/sample_10mb.txt
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  104857600  > test_files/sample_100mb.txt
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  1073741824  > test_files/sample_1gb.txt
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  10737418240  > test_files/sample_10gb.txt
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom  |  head  -c  107374182400  > test_files/sample_100gb.txt
```

## Loading file
```
npm run process-file [filePath]
```

## Start server
```
npm run start
```

## Running unit tests
```
npm run test
```

## Running load tests
```
cd k6
npm run test
```

## Build and run
```
./buid.sh
./run.sh [filePath]
```
