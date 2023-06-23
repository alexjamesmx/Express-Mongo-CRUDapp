import express from "express"
import moongose from "mongoose"
// require("dotenv").config()

import userRoutes from "./routes/user.js"
import productRoutes from "./routes/product.js"
import { getCredentials, getToken } from "./utils/headers.js"
import { signToken, verifyToken, validateExpiration } from "./utils/token.js"
import { getUser } from "./utils/users.js"

const app = express()

const PORT = process.env.PORT || 3000
const MONGODB = process.env.MONGODB_URI

//middleware

function token_validate(req, res, next) {
  try {
    const token = getToken(req)
    const payload = verifyToken(token)

    validateExpiration(payload)

    next()
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
}

app.use(express.json())
app.post("/api/token", (req, res) => {
  try {
    const { username, password } = getCredentials(req)
    const user = getUser(username, password)
    const token = signToken(user)

    res.send({ token })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
app.use("/api", token_validate)
//how to implement token authorization for all routes in userRoutes and productRoutes

//add token authorization to all routes in userRoutes and productRoutes
// app.use("/api", token, userRoutes, productRoutes)

app.use("/api", userRoutes, productRoutes)

moongose
  .connect(MONGODB)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err)
  })

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
