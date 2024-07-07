import AndroidApp from './AndroidApp'
import User from './User';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PopUp from './PopUp';

const UserApps=function(){
  const [apps, setApps] = useState([]);
  const [name,setName]=useState();
  const [points_earned,setPointsEarned]=useState(0)
  const [tasks_completed, setTasksCompleted] = useState(0);
  const[visible,setVisible]=useState(false)

  
  const navigate = useNavigate(); 

 

  function handleDownload(points){
    console.log(points)

 

    const data = {
      points_earned:points_earned+points,
      tasks_completed:tasks_completed+1
    };

    // Send PATCH request to update user profile

    console.log(data)
    axios
      .patch("http://localhost:8000/api/user/update/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send JWT token in the Authorization header
          "Content-Type": "application/json", // Specify JSON content type
        },
      })
      .then((response) => {
        console.log("User profile updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });

       setPointsEarned(points_earned + points);
       setTasksCompleted(tasks_completed + 1);
       setVisible(true);



  }

  async function handleSubmit(event,file){
     event.preventDefault();

     console.log(file)
     const formData = new FormData();
     formData.append("file", file);

     try {
       const response = await axios.post(
         "http://127.0.0.1:8000/api/upload/",
         formData,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
             "Content-Type": "multipart/form-data"
           },
         }
       );
       alert("File uploaded successfully:");
       console.log("File uploaded successfully:", response.data);
     } catch (error) {
       console.error("Error uploading file:", error);

     }
      setVisible(false)
   };
   
    
  

  


  useEffect(() => {

      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token from local storage
        if (!token) {
          // Handle case where token is not found
          throw new Error("Token not found");
        }

        // Set the request headers with the JWT token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Make a GET request to the backend API endpoint
        axios
          .get("http://127.0.0.1:8000/api/user/profile/", config)
          .then((response) => {
            // Update state with the fetched apps
            console.log(response.data);
            console.log(response.data);
            setName(response.data.username);
            setPointsEarned(response.data.points_earned)
            setTasksCompleted(response.data.tasks_completed)
          })
          .catch(function(error){ navigate('/userLogin') 
          console.error("Error fetching apps:", error)});

        // Handle the response data (user profile data)

        // Process the user profile data as needed
      } catch (error) {
        // Handle errors
        navigate("/userLogin");
        console.error("Error fetching user profile:", error);
      }



    // Fetch apps from Django API using axios
    axios.get("http://127.0.0.1:8000/api/get_apps/") // Replace '/api/get_apps/' with your actual API endpoint
      .then((response) => {
        // Update state with the fetched apps
        console.log(response.data)
        setApps(response.data);
      })
      .catch(function(error){  
       navigate('/userLogin')
       console.error("Error fetching apps:", error)});

  }, []); // Empty dependency array ensures the effect runs only once after the component mounts


   
  return (
    <>
      <div className="flex flex-wrap h-screen overflow-y-auto flex-col basis-1 items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-800 justify-center h-screen dark">
        <User
          name={name}
          points_earned={points_earned}
          tasks_completed={tasks_completed}
        />

        <h1 className="m-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            App Hub
          </span>
        </h1>

        <div className="flex m-12 gap-8">
          {apps.map(function (value) {
            return (
              <AndroidApp
                key={value.name}
                name={value.name}
                points_earned={value.points_earned}
                image={value.image}
                handleDownload={handleDownload}
              />
            );
          })}
        </div>
      </div>

      {visible && <PopUp handleSubmit={handleSubmit} />}
    </>
  );
}

export default UserApps;