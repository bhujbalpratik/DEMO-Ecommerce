import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"
import { useState } from "react"

const SmallProduct = ({ product }) => {
  const [zIndex, setZindex] = useState("-z-10")
  const handleClick = () => {
    setZindex("z-10")
    setTimeout(() => {
      setZindex("-z-10")
    }, 1000)
  }
  return (
    <div className="w-[20rem] ml-[2rem] p-3" onClick={handleClick}>
      <div className={`relative ${zIndex}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full rounded z-0"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              &#8377; {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  )
}

export default SmallProduct
