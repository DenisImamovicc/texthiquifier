import express from "express"
import fetch from 'node-fetch';
import cors from "cors"

const flickrapikey = "904552878bd72bf5143028f71ca3411e"
const allowedserver="http://127.0.0.1:8080"
const api = express();
const port = 5000;
const flickrapi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrapikey}&text=Star+wars&extras=url_m&per_page=20&format=json&nojsoncallback=1`

//Fetches none specified json data from flickrapi with the flickrapi and returns data,if res is status 200, in json form of photo array containing x amount of picture/s.
function getExternaldata(req,res) {
    fetch(flickrapi)
    .then(res => res.json())
    .then(rawData => {
        const filteredData = res.status(200).send(rawData.photos.photo)
        return filteredData
    });
}

//.use() method allows a server,allowedserver,to fetch data from this API without our beloved cors being in the way :).
api.use(cors({
    origin:allowedserver
}))

api.listen(port, () =>
    console.log(port, `Api live at http://localhost:${port}`)
)

//Creates /PHOTOS API route and responds to requests made by allowed servers by calling getExternaldata() function.
api.get("/PHOTOS", (req,res) => {
    getExternaldata(req,res)
})