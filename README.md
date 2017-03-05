Project
=======
Gregor Thomson - University of Glasgow

This is a collaborative project with Amazon Development Centre to investigating whether auto-generated tags can accurately represent jobs to aid job recommendations. Job Tagger is a prototype system used to suggest skill for a given job description. Input a job description and Job Tagger will return five suggested skills needed for that job.


**JobTagger** - Web application for the prototype system

**SkillVectorGenerator** - Creates a Word2Vec word embedding vector for each skill

**WikipediaPopularity** - Finds the average daily views for each skills wikipedia page using Wikipedia PageViews API

**WikiScrape** - scrapes Google for Wikipedia pages for each skill

**WordSkillSimilarity** - Finds words similar for each skill using Word2Vec word embeddings
