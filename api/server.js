import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express()

app.use(express.static(path.join(__dirname, '../client/build')))

dotenv.config()

const supabase = createClient(process.env.DATABASE_URL, process.env.DATABASE_KEY)

app.get('/', (req, res) => {
  //res.send('Quote Database')
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(process.env.port, () => {
  console.log(`Listen on ${process.env.port}`)
})
