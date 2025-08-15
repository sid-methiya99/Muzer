export function MainContent() {
   return (
      <div className="flex items-center flex-col gap-2 justify-center mx-auto py-12 md:py-24 lg:py-32">
         <div>
            <h1 className="text-white text-5xl font-bold tracking-tighter">
               Let Your Fans Choose the Beat
            </h1>
         </div>
         <div className="flex flex-col items-center md:text-xl">
            <span className="text-gray-400">
               Empower your audience to curate your music stream.
            </span>
            <span className="text-gray-400">
               Connect with fans like never before.
            </span>
         </div>
         <div className="flex items-center gap-2 mx-auto mt-2">
            <button className="text-xs font-medium  text-white  bg-purple-600 px-3 py-2 rounded-md cursor-pointer">
               Get Started
            </button>
            <button className="text-xs font-medium border-purple-300 bg-white text-purple-400 hover:bg-purple-500 cursor-pointer px-3 py-2 rounded-md hover:text-gray-600">
               Learn More
            </button>
         </div>
      </div>
   )
}
