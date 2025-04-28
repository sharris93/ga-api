import express from 'express'

const router = express.Router()

router.get('/events', (req, res) => {
  return res.render('events.ejs')
})

router.get('/movies', (req, res) => {
  return res.render('movies.ejs')
})

router.get('/birds', (req, res) => {
  return res.render('birds.ejs')
})


export default router