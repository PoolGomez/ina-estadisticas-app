
export default function AppYoutube() {

    const categories = ["All", "Music", "Gaming", "News", "Sports", "Education"];
    const videos = Array.from({ length: 12 }, (_, i) => ({
        title: `Video ${i + 1}`,
        thumbnail: "https://via.placeholder.com/300",
      }));

  return (
    <div className="flex flex-col h-screen">
      
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">YouTube Clone</div>
      <input
        type="text"
        placeholder="Search"
        className="bg-gray-800 text-white rounded-lg p-2 w-1/3"
      />
      <div className="flex gap-4">
        <button className="bg-red-600 px-4 py-2 rounded-lg">Login</button>
        <button className="bg-blue-600 px-4 py-2 rounded-lg">Sign Up</button>
      </div>
    </nav>



      <div className="flex flex-grow">
        
        <div className="bg-gray-800 text-white p-4 w-64">
        {categories.map((category, index) => (
            <div
            key={index}
            className="py-2 px-4 rounded-lg hover:bg-gray-700 cursor-pointer"
            >
            {category}
            </div>
        ))}
        </div>

        <div className="flex-grow bg-gray-900">
          
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {videos.map((video, index) => (
                <div key={index} className="bg-gray-800 text-white rounded-lg p-4">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded-lg w-full"
                />
                <h3 className="mt-2 text-lg">{video.title}</h3>
                </div>
            ))}
            </div>

        </div>
      </div>
    </div>
  )
}
