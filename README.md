# sliceTestRepo

Steps to run app:-

1 . Clone app from git hub open cmd and run 
        Git Clone https://github.com/Singh-Lovepreet/sliceTestRepo.git
2. Open terminal and change directory to project directory .
    
3. Run following cmd( docker build -t nodeapp . ) in terminal .

4 . Run docker -compose up 

App start running now ……

Open postman to test the api:-

1 . First api :-http://127.0.0.1:7007/word/foo
 
Get api to get count of particular word 


2 . Second Api:-http://127.0.0.1:7007/word/foo

Put api :- its will update the count of word by one if it exists or create it with count 1 if not exist
