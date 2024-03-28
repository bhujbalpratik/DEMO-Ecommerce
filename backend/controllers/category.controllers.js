import { errorHandler } from "../utils/errorHandler.js"
import { Category } from "../models/category.models.js"

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body

    if (!name) {
      return next(errorHandler(400, "Name is required"))
    }

    const existingCategory = await Category.findOne({ name })

    if (existingCategory) {
      return next(errorHandler(400, "Already Exist"))
    }

    const category = await new Category({ name }).save()
    res.json(category)
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body
    const { categoryId } = req.params

    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
      return next(errorHandler(404, "Category not found"))
    }

    category.name = name

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (req, res, next) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId)
    res.json(removed)
  } catch (error) {
    next(error)
  }
}

export const listCategory = async (req, res, next) => {
  try {
    const all = await Category.find({})
    res.json(all)
  } catch (error) {
    next(error)
  }
}

export const readCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id })
    res.json(category)
  } catch (error) {
    next(error)
  }
}
