const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

//route for getting the response scrap 

app.get('/results', (req, res) => {
    axios('https://www.theguardian.com/uk')
        .then(response => {
            const scraps = findScrap('.fc-item__title', response)
            res.json(scraps)
        }).catch(err => console.log(err))

})
//function for finding the scrap
const findScrap = (className, response) => {
    const html = response.data
    const htie = cheerio.load(html)
    const scraps = []
    htie(className, html).each(function () {
        //this = object that executing the code 
        const element = htie(this).text()
        scraps.push({ element: element })
    })
    console.log(scraps)
    return scraps
}



app.listen(9006, () => console.log("server is running"))