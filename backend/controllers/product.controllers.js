import { Product } from "../models/product.models.js"
import { errorHandler } from "../utils/errorHandler.js"

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields

    // Validation
    switch (true) {
      case !name:
        return next(errorHandler(500, "Name is required"))
      case !brand:
        return next(errorHandler(500, "Brand is required"))

      case !description:
        return next(errorHandler(500, "Description is required"))

      case !price:
        return next(errorHandler(500, "Price is required"))

      case !category:
        return next(errorHandler(500, "Category is required"))

      case !quantity:
        return next(errorHandler(500, "Quantity is required"))
    }

    const product = new Product({ ...req.fields })
    await product.save()
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const updateProductDetails = async (req, res, next) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields

    // Validation
    switch (true) {
      case !name:
        return next(errorHandler(500, "Name is required"))
      case !brand:
        return next(errorHandler(500, "Brand is required"))

      case !description:
        return next(errorHandler(500, "Description is required"))

      case !price:
        return next(errorHandler(500, "Price is required"))

      case !category:
        return next(errorHandler(500, "Category is required"))

      case !quantity:
        return next(errorHandler(500, "Quantity is required"))
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    )

    await product.save()

    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const removeProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const fetchAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 })

    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const fetchProducts = async (req, res, next) => {
  try {
    const pageSize = 6

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize)

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    })
  } catch (error) {
    next(error)
  }
}

export const fetchTopProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4)
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const fetchNewProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5)
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const fetchProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      return res.json(product)
    } else {
      next(errorHandler(404, "product not found"))
    }
  } catch (error) {
    next(error)
  }
}

export const addProductReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )

      if (alreadyReviewed) {
        next(errorHandler(400, "Product already reviewed"))
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }

      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      res.status(201).json({ message: "Review added" })
    } else {
      next(errorHandler(404, "Product not found"))
    }
  } catch (error) {
    next(error)
  }
}
