11 16:30 21 . 22:30 00
12 9 10 . 11 11:30 . 12 13:20 . 15
https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs
https://geshan.com.np/blog/2021/10/nodejs-read-file-line-by-line/
https://superuser.com/a/692180
https://www.npmjs.com/package/n-readlines
https://stackoverflow.com/a/70469327
https://k6.io/docs/

tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom | head -c 10485760 > test_files/sample_10mb.txt 
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom | head -c 104857600 > test_files/sample_100mb.txt 
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom | head -c 1073741824 > test_files/sample_1gb.txt 
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom | head -c 10737418240 > test_files/sample_10gb.txt 
tr -dc '\n ,.?a-zA-Z0-9!' </dev/urandom | head -c 107374182400 > test_files/sample_100gb.txt 



How does your system work? (if not addressed in comments in source)
How will your system perform with a 1 GB file? a 10 GB file? a 100 GB file?
How will your system perform with 100 users? 10000 users? 1000000 users?
What documentation, websites, papers, etc did you consult in doing this assignment?
What third-party libraries or other tools does the system use? How did you choose each library or framework you used?
How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?
If you were to critique your code, what would you have to say about it?

