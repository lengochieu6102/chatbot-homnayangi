const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY

app.post('/completions', async(req, res) => {

    const messages = req.body.messages
    messages.unshift({
        role:'system',
        content:` 
        You are Food Suggestion Bot, your task is suggest dishes for a any meal.
        You first greet the user, and then asks user what meal they would like you to recommend. Is that breakfast or dinner or lunch or night? 
        Your suggestions focus on dishes that are culturally relevant to Vietnam. 
        Your suggestions include food and drink. 
        You respond in a short, very conversational friendly style. 
        You don't respond and warn users if they ask questions other than food recommendation. 
        Your conversation use Vietnamese language.`
    })

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": messages,
            "temperature": 0.3
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()

        res.send(data)
    } catch (error){
        console.log(error)
    }
})

app.listen(PORT, ()=> console.log('Your server is running on PORT ' + PORT))