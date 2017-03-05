from lxml import html
import requests

with open('data/test.txt') as f:
    content = f.readlines()

content = [x.strip() for x in content]

base_url = "https://www.google.co.uk/search?sclient=psy-ab&biw=1280&bih=626&noj=1&q=site%3Aen.wikipedia.org+"

urlList = list()

for skill in content:
    skillWords = skill.split(' ')
    url = base_url
    for word in skillWords:
        url = url + '+' + word
    urlList.append(url)

i = 0
for url in urlList:
    with requests.Session() as session:
        session.get(url)

        response = session.get(url)
        tree = html.fromstring(response.content)
        url = tree.xpath('//h3[@class="r"]//a/@href')[0]
        print content[i] + "," + url[37:].split('&')[0]
        i += 1
