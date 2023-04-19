import express from 'express'
import { getNotes, getNote, createNote } from './database.js'

const app = express()      // create the express app
app.use(express.json())   // since this app becomes a JSON application, I must include. This says any JSON body will accepted and passed to the req.body

 // create a get route to get the list of notes
 app.get("/notes", async (req, res) => {
    const notes = await getNotes()
    res.send(notes)
 })

 app.get ("/notes/:id", async (req, res) => {
    const id = req.params.id
    const note  = await getNote (id)
    res.send(note)
 })
    // POST example
 app.post("/notes", async (req, res) => {
    const {title, contents} = req.body
    const note = await createNote(title, contents)
    res.status(201).send(note)
 })
// error handling code from Exp
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })