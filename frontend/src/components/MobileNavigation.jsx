import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai"
import { useLogoutMutation } from "../redux/api/usersApiSlice"
import { logout } from "../redux/features/auth/authSlice"
import { FaHeart } from "react-icons/fa"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
const MobileNavigation = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      toast.success("User logout successfully")
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="bg-gray-950 max-h-[5rem] px-6 w-[100vw] rounded-xl z-50">
      <ul className="flex flex-wrap gap-1 items-center justify-center">
        <Link to={"/"}>
          <li className="text-white  w-16 flex flex-col text-center p-4 items-center">
            <AiOutlineHome size={30} />
          </li>
        </Link>
        <Link to={"/shop"}>
          <li className="text-white  w-16 flex flex-col text-center p-4 items-center">
            <AiOutlineShopping size={30} />
          </li>
        </Link>
        <Link to={"/cart"}>
          <li className="text-white  w-16 flex flex-col text-center p-4 items-center">
            <AiOutlineShoppingCart size={30} />
          </li>
        </Link>
        <Link to={"/favorite"}>
          <li className="text-white  w-16 flex flex-col text-center p-4 items-center">
            <FaHeart size={30} />
          </li>
        </Link>
        {!userInfo && (
          <Link to={"/login"}>
            <li className="text-white w-16 flex flex-col text-center p-4 items-center">
              <AiOutlineUserAdd size={30} />
            </li>
          </Link>
        )}
        {userInfo && (
          <li
            onClick={toggleDropdown}
            className="text-white w-16 flex flex-col text-center p-4 items-center"
          >
            <AiOutlineUser size={30} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          </li>
        )}
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-4 space-y-2 bg-white text-gray-600 -top-20`}
          >
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={toggleDropdown}
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </ul>
    </div>
  )
}
export default MobileNavigation
