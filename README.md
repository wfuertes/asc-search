# asc-search

This is a simple prototype of a web crawler that fetches data of a particular app from both App Store from Apple and Google Play from Google. Presents at VanHackathon April, 2017.

It consists of a single page where you first specify the store you want to fetch the app data, then enter its name and hit the 'Search' button.

It returns the following information:

<ul>
    <li>Icon: The app icon.</li>
    <li>App: The app name.</li>
    <li>Description: The app description limited to 512 characters.</li>
    <li>Overall: The app's general ranking position in the specified store.</li>
    <li>Category: The app's category name and its ranking position for this.</li>
<ul>

# Technologies used

NodeJS v6.10.0

Express v4.15.2

Cheerio v0.22.0

Request v2.81.0

# Contact

Luiz Guilherme Paro (lg_paro@hotmail.com)

Willian Fuertes Batista (wfuertes@gmail.com)
