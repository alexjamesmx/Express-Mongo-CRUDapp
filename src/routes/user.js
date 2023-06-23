import express from "express"
import userSchema from "../models/user.js"

const router = express.Router()

router.post("/users", (req, res) => {
  const user = new userSchema(req.body)
  user
    .save()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json({ message: err })
    })
})

//Get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json({ message: err })
    })
})

//Get user by id
router.get("/users/:id", (req, res) => {
  userSchema
    .findById(req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json({ message: err })
    })
})
//Update user by id
router.put("/users/:id", (req, res) => {
  const { id } = req.params
  const { name, age, email } = req.body
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json({ message: err })
    })
})

//Delete user by id
router.delete("/users/:id", (req, res) => {
  const { id } = req.params
  userSchema
    .deleteOne({ _id: id })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json({ message: err })
    })
})

export default router
