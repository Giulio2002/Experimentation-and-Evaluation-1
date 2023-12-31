// import express from 'express'
// import path from 'path'
// import cors from 'cors'
// import bodyParser from 'body-parser'
// import dotenv from 'dotenv'
// import mongo from 'mongodb'
var express = require('express')
var path = require('path')
var cors = require('cors')
var bodyParser = require('body-parser')
var dotenv = require('dotenv')
var mongo = require('mongodb')


const app = express()
const PORT = 7666
dotenv.config()

const MongoClient = mongo.MongoClient

const url = process.env.MONGO_URL
MongoClient.connect(process.env.MONGO_URL, function (err, db) {
    if (err) throw err
    const dbo = db.db('mydb')
    dbo.createCollection('surveys', function (err, res) {
        if (err) throw err
        console.log('Collection created!')
        db.close()
    })
})

const metric = []
// Directory where your static files are located
const staticDirPath = path.join(__dirname, 'public')

// npm install body-parser --save
app.use(cors())
app.use(express.static(staticDirPath)) // Serve static files
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Fallback for any other GET request
app.get('/survey', (req, res) => {
    res.sendFile(path.join(staticDirPath, 'start.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(staticDirPath, 'home.html'))
})

// Get the lists
app.get('/metrics', async (req, res) => {
    // read the entire surveys collection and send it back to the client in the response
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("mydb");
    //     dbo.collection("surveys").find({}).toArray(function(err, result) {
    //         if (err) throw err;
    //         db.close();
    //     });
    // })
    // do the above with async/await
    const client = await MongoClient.connect(url)
    const dbo = client.db('mydb')
    const result = await dbo.collection('surveys').find({}).toArray()
    client.close()
    res.json(result)
})

app.post('/metrics', async (req, res) => {
    // do the above with async/await
    const client = await MongoClient.connect(url)
    const dbo = client.db('mydb')
    console.log(req.body)
    const result = await dbo.collection('surveys').insertOne(req.body)
    client.close()
    res.json(result)
    console.log(result)
})

app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(
            'Server is Successfully Running, and App is listening on port ' +
                process.env.PORT
        )
    } else {
        console.log("Error occurred, server can't start", error)
    }
})
