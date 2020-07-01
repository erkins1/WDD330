#web scraping
import bs4
import requests
#from selenium import webdriver

def getSoup(url):
    res = requests.get(url)
    res.raise_for_status()
    soup = bs4.BeautifulSoup(res.text, 'html.parser')

##    wd = webdriver.Chrome("/Users/geoff/Downloads/Programs/chromedriver_win32/Chromedriver")
##    wd.get(url)
##
##    html_page = wd.page_source
##    wd.quit()
##    soup = bs4.BeautifulSoup(html_page, 'html.parser')
##    print(soup)
    return soup

def saveLighthouse(subURL):
    #print("made it to save lighthouses")
    fullURL = baseURL + subURL
    #print(fullURL)
    lighthouseSoup = getSoup(fullURL)
    i = 0
    lighthouseOutput = ""
    for element in lighthouseSoup.find_all(class_="MsoNormal"):
        i = i + 1
        if i > 33:
            #print(element.span.text)
            lighthouseOutput += element.span.text + "&&"
    print(lighthouseOutput[:-2].replace('\r', '').replace('\n', ''))


baseURL = 'https://uslhs.org/national_archives/'

soup = getSoup(baseURL + 'states_files/michigan_page2.htm')

#right side id: "_x0000_s1442"
#left side id: "_x0000_s1459"
#leftSide = soup.select("#_x0000_s1442")
#rightSide = soup.select("#_x0000_s1459")

i = 0
for element in soup.find_all(class_="MsoNormal"):
    #the first 5 are not helpful
    i = i + 1 
    if i > 5 and element.text != "Return to States Menu":
        #print(element.span.a.text)
        subURL = element.span.a['href'][3:]
        try:
            saveLighthouse(subURL)
        except:
            print("Bad Link")
        

#print(soup.select("#_x0000_s1442 > v:fill > v:shadow > v:path > v:textbox > div > p:nth-child(1) > span:nth-child(1) > a"))
