Project
=======
Gregor Thomson - University of Glasgow

This is a collaborative project with Amazon Development Centre to investigating whether auto-generated tags can accurately represent jobs to aid job recommendations. Job Tagger is a prototype system used to suggest skill for a given job description. Input a job description and Job Tagger will return five suggested skills needed for that job.


**JobTagger** - Web application for the prototype system

**SkillVectorGenerator** - Creates a Word2Vec word embedding vector for each skill

**WikipediaPopularity** - Finds the average daily views for each skills wikipedia page using Wikipedia PageViews API

**WikiScrape** - scrapes Google for Wikipedia pages for each skill

**WordSkillSimilarity** - Finds words similar for each skill using Word2Vec word embeddings



**Running the Programs**

_JobTagger_

An example of running from the command line is as follows:
```sh
$ mongod
```
In other terminal:
```sh
$ npm install
$ node index.js
```
Goto http://localhost:8080/ and it will take you to the index page of the website.

_SkillVectorGenerator_

Run the following in the command line:
```sh
$ npm install
$ node skillVector.js
```
_WikipediaPopularity_

Run the following in the command line:
```sh
$ npm install
$ node popularWiki.js
```
_WikiScrape_

Run the following in the command line:
```sh
$ python scrapeWiki.py
```
_WordSkillSimilarity_

Run the following in the command line:
```sh
$ npm install
$ node word2vec.js
```
