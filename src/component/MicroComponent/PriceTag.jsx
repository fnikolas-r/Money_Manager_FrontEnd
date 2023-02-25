import Stats from "./Stats.jsx";

export default function PriceTag(props) {
    return <div className="p-10 overflow-y-auto">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>

      <dl className="mt-5 flex gap-5 snap-x snap-mandatory ">
            {props.stats.map((item)=>{
                return <div key={item.rekening} className="snap-center">
                    <Stats key={item.rekening} {...item}/>
                </div>
            })}
      </dl>
                </div>
}