const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather', 
    name: 'Hung Phan'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About', 
    name: 'Hung Phan'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text.',
    name: 'Hung Phan'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, {weather_desc, currentTemperature, feelslike, humidity, uv_index} = {}) => {
        if (error) {
            return res.send({ error })
        }
        return res.send({
          location,
          weather_desc,
          currentTemperature,
          feelslike,
          humidity,
          uv_index
        })
    })
})

})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404!',
    msg: 'Help article not found',
    name: 'Hung Phan'
  })
} )

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    msg: 'Page not found',
    name: 'Hung Phan'
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})