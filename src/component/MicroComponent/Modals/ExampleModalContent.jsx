import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Dialog} from "@headlessui/react";

export  default  function ExampleModalContent(props) {
    return <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <FontAwesomeIcon icon={faCheck} className="h-6 w-6 text-green-600"/>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
                      pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                    </p>
                  </div>
                </div>
              </div>
}