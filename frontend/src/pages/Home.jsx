import { Link, useParams } from "react-router-dom"
import { useGetProductsQuery } from "../redux/api/productApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Header from "../components/Header"
import Product from "./Products/Product"
import SmallProduct from "./Products/SmallProduct"

const Home = () => {
  const { keyword } = useParams()
  const { data, isLoading, isError } = useGetProductsQuery({ keyword })

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="hidden justify-between items-center md:flex">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="hidden justify-center flex-wrap mt-[2rem] md:flex">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              className="flex flex-wrap justify-center mt-[2rem] md:hidden"
              style={{ zIndex: 1 }}
            >
              {data.products.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Home
