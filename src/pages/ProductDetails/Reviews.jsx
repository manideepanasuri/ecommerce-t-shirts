import { useContext } from "react"
import { productsContext } from "../../context/Products/Products"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUser } from "@fortawesome/free-regular-svg-icons";


export default function Reviews(props) {
  
  const { renderStars } = useContext(productsContext);
  return (
    <div className="mb-3">
    <div className="flex justify-between text-xl" >
      <h2 className="font-semibold text-gray-700">
      <FontAwesomeIcon className="mr-3 text-2xl" icon={faCircleUser} />
        {props.data.name}
      </h2>
      <span className="flex"> {renderStars(props.data.rating)} </span>
    </div>
    <div className="text-gray-500 ml-3">
      <p>
        {props.data.comment}
      </p>
    </div>
    </div>
  )
}
