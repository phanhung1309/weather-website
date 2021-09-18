console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('.weatherForm')
const addressSearch = document.querySelector('.addressSearch')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    const address = addressSearch.value

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `${data.location}`
                messageTwo.textContent = `Location time: ${data.localTime}`
                messageThree.textContent = `Observed at ${data.observation_time}: ${data.weather_desc}. It is currently ${data.currentTemperature} degrees out. It feels like ${data.feelslike} degrees out. 
                The humidity is ${data.humidity}%. The Ultraviolet (UV) index is ${data.uv_index}`
            }
        })
    })
})