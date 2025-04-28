import express from 'express'

const router = express.Router()

router.get('/events', (req, res) => {
  return res.render('index.ejs')
})

router.get('/movies', (req, res) => {
  return res.render('movies.ejs')
})


export default router