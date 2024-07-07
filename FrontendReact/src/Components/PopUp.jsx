import {useRef} from "react"

const PopUp = function ({handleSubmit}) {

  const image=useRef()


  return (
    <>
  
      <div  className="fixed inset-0  bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
      
          <div className="flex flex-col items-center justify-center h-screen dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-200 mb-4">
                Upload Screenshot
              </h2>

              <form
                className="flex flex-col"
                onSubmit={function(event){handleSubmit(event,image.current.files[0])}}
                encType="multipart/form-data"
              >
                <label
                  htmlFor="appImage"
                  className="text-white text-base font-bold my-2 mx-1"
                >
                  Screenshot:
                </label>
                <input
                  ref={image}
                  placeholder="Resume"
                  className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="file"
                />

                <button
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
       
      </div>
    </>
  );
};

export default PopUp;