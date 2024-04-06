import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai"
import { FaHeart } from "react-icons/fa"
import { Link } from "react-router-dom"
const MobileNavigation = () => {
  const [active, setActive] = useState(0)
  const { userInfo } = useSelector((state) => state.auth)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
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
        <Link to={userInfo ? "/profile" : "/login"}>
          <li className="text-white w-16 flex flex-col text-center p-4 items-center">
            {!userInfo && <AiOutlineUserAdd size={30} />}
            {userInfo && <AiOutlineUser size={30} />}
          </li>
        </Link>
      </ul>
    </div>
  )
}
export default MobileNavigation
