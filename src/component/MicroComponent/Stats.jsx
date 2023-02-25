/* This example requires Tailwind CSS v2.0+ */
import { faArrowDown, faArrowUp, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Stats(props) {
  return (
    <div
      className="-z-20 relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden w-[35vw]"
    >
      <dt>
        <div className="absolute bg-indigo-500 rounded-md p-3">
          <i className="h-6 w-6 text-white" aria-hidden="true">
            <FontAwesomeIcon icon={props.icon ?? faMoneyBill} />
          </i>
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 truncate">{props.name}</p>
      </dt>
      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">{new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(props.total)}
          <span className="text-sm">
            {props.total > 0 ? (
              <i className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true">
                <FontAwesomeIcon icon={faArrowUp} />
              </i>
            ) : (<i className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true">
              <FontAwesomeIcon icon={faArrowDown} />
            </i>)}

            {/*<span className="sr-only">{props.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>*/}
            {/*{props.change}*/}
          </span>
        </p>
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              {' '}
              View all<span className="sr-only"> {props.name} stats</span>
            </a>
          </div>
        </div>
      </dd>
    </div>
  )
}
