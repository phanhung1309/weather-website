console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('.weatherForm')
const addressSearch = document.querySelector('.addressSearch')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const address = addressSearch.value

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `Location: ${data.location}`
                messageTwo.textContent = `${data.weather_desc}. It is currently ${data.currentTemperature} degrees out. It feels like ${data.feelslike} degrees out. 
                The humidity is ${data.humidity}%. The Ultraviolet (UV) index is ${data.uv_index}`
            }
        })
    })
})