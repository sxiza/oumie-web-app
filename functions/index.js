const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')

const app = express()

const config = {
    dev: false,
    buildDir: process.env.NODE_ENV ? '.nuxt' : '../functions/nuxt',
    build: {
        publicPath: '/assets/client/',
    }
}
const nuxt = new Nuxt(config)

function handleRequest(req, res) {
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
    nuxt.renderRoute('/').then(result => {
        res.send(result.html)
    }).catch(e => {
        res.send(e)
    })
}
app.get('*', handleRequest)
exports.nuxtApp = functions.region('europe-west1')
                        .https.onRequest(app)
