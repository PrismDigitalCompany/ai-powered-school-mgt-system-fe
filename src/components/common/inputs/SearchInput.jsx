import { Search } from "lucide-react"

const SearchInput = ({value, placeholder, onChange, }) => {
  return (
    <div className="relative">
       <div className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-500">
        <Search className="w-5 h-5"/>
       </div>
       <input
       value={value}
       placeholder={placeholder ? "Search.....": ""}
       onChange={(event)=> onChange(event.target.value)}
       className="w-full rounded border-txt-grey-600/10 bg-gray-500/10
        pl-9 pr-3 py-2 text-sm text-gray-200
          placeholder:text-txt-grey-400/20 
          focus:outline-none focus:ring-2
           focus:ring-blue-500 focus:border-blue-500"
       />
    </div>
  )
}

export default SearchInput