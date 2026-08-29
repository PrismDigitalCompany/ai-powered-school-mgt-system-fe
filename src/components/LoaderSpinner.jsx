import {University} from 'lucide-react'

const LoaderSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
       <div className="relative">
        <div className='animate-spin rounded-full h-20 w-20 border-2 border-blue-50 mx-automb-4 border-t-blue-500'/>
       <div className="absolute inset-0 flex items-center justify-center">
        <University className='w-6 h-6 text-blue-500'/>
       </div> 
       </div>
        <p className="mt-4  font-semibold text-gray-700">Loading...</p>
        </div>
    </div>
  )
}

export default LoaderSpinner