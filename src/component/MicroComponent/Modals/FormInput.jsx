import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Dialog} from "@headlessui/react";
import { useSelector } from "react-redux";


export  default  function FormInput(props) {
  const {modalInputOpen} = useSelector(state => state.component)
  const {name,detail} = modalInputOpen;
  function capitalizeFirstLetter(string) {
    var str2 = string.replace("_"," ")
    return str2.toUpperCase()
}
    return <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{capitalizeFirstLetter(name)}</h3>
            {name.includes("delete") && detail && detail.name ? <h5>Dengan Nama : {detail.name}</h5> : <></>}
          </div>
          {props.children}
        </div>

      </div>

    </div>
}


