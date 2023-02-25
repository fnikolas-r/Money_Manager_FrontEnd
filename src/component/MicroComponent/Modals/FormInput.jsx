import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Dialog} from "@headlessui/react";

export  default  function FormInput(props) {
    return <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{props.id?"Edit":"Add"} {props.name}</h3>
          </div>
          {props.children}
        </div>

      </div>

    </div>
}


