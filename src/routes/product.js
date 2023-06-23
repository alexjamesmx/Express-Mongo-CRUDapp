import express from "express"
import productSchema from "../models/product.js"

const router = express.Router()

//Get all products
router.get("/products", (req, res) => {
  productSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }))
})
//Get product by id
router.get("/products/:id", (req, res) => {
  productSchema
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }))
})
//Save product
router.post("/products", (req, res) => {
  const product = productSchema(req.body)
  product
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }))
})
//UPDATE product by id
router.put("/products/:id", (req, res) => {
  productSchema
    .updateOne({ _id: req.params.id }, { $set: req.body })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }))
})
//Delete product by id
router.delete("/products/:id", (req, res) => {
  productSchema
    .deleteOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }))
})
export default router
