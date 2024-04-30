import React, { useRef } from "react";
import axios from "axios";
const AddApp = function () {
  const name = useRef();
  const  points_earned= useRef();
  const image = useRef();

   const handleSubmit = async function (e) {
    e.preventDefault();
     console.log({
       name: name.current.value,
       points_earned: points_earned.current.value,
       image: image.current.value,
     });

     const formData = new FormData();
     formData.append("name", name.current.value);
     formData.append("points_earned", points_earned.current.value);
     formData.append("image", image.current.files[0]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create_app/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      console.log(response.status);

      if (response.status === 201) {
        alert("App Added!!");
      }
    } catch (error) {
      // Authentication failed, display error message
     
        alert("Bad Request!!");
      
    }
  }
  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 justify-center h-screen dark">
        <div className="flex flex-col items-center justify-center h-screen dark">
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              Add Android App
            </h2>

            <form
              className="flex flex-col"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <input
                ref={name}
                placeholder="App Name"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />

              <input
                ref={points_earned}
                placeholder="Points Earned"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="number"
                min="1"
                max="100"
              />
              <label
                htmlFor="appImage"
                className="text-white text-base font-bold my-2 mx-1"
              >
                App Image:
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
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddApp;
