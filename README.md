# asc-search

This is a simple prototype of a web crawler that fetches data of a particular app from both App Store from Apple and Google Play from Google. Presents at VanHackathon April, 2017.

The challenge proposed was:

```
Appsamurai - App Store Crawler

The best performance indicator of a mobile application is the category ranking and
overall ranking inside an app store. The main stores are Google Play and Apple App Store,
and there are several sub categories inside those stores such as social networking,
shopping, games etc.

Your challenge is to crawl the app stores to get 1. Overall Ranking (If exists) and
2. Category Ranking of a mobile app for the selected Country, once the user enters 
their app name or their store link of the app.

For example I have an Android mobile app named " My Talking Tom". There will be a 
basic user interface where I will enter my app name and get today's United States
rankings as: Games Free = 36, Overall = 92.

Bonus: Get also app details: icon, screenshots, description. 
```

It consists of a single page where you first specify the store you want to fetch the app data, then enter its name and hit the 'Search' button.

It returns the following information:

<ul>
    <li>Icon: The app icon.</li>
    <li>App: The app name.</li>
    <li>Description: The app description limited to 512 characters.</li>
    <li>Overall: The app's general ranking position in the specified store.</li>
    <li>Category: The app's category name and its ranking position for this.</li>
</ul>

# Links

Heroku: https://asc-search.herokuapp.com/

Video: TODO - por link do video aqui

# Technologies used

<ul>
    <li>HTML 5</li>
    <li>CSS 3</li>
    <li>JavaScript</li>
    <li>NodeJS v6.10.0</li>
    <li>Express v4.15.2</li>
    <li>Cheerio v0.22.0</li>
    <li>Request v2.81.0</li>
</ul>

# Contact

Luiz Guilherme Paro (lg_paro@hotmail.com)

Willian Fuertes Batista (wfuertes@gmail.com)
