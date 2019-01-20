const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')

const app = express()

const config = {
  axios: {
    baseURL: process.env.API_URL || 'http://192.168.99.100:3333',
  },
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/assets/client/',
  }
}
const nuxt = new Nuxt(config)

function handleRequest(req, res) {
  console.log("IN New Nuxt Trial: ");
  // const isProduction = process.env.NODE_ENV === "development" ? false : true;
  // if (isProduction)
  //   res.set("Cache-Control", "public, max-age=150, s-maxage=150");

  try {
    nuxt.render(req, res);
    console.log(process.env.NODE_ENV);
  } catch (err) {
    console.error(err);
  }
}
  
app.use(handleRequest);
exports.nuxtApp = functions.https.onRequest(app)
