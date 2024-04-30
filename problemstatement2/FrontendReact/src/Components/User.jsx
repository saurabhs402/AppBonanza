const User=function({name,points_earned,tasks_completed}){

    return (
      <div className="flex  items-center justify-center">
        <div className="w-68 rounded-lg border-2 border-indigo-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-center">
            <img
              src="https://www.svgrepo.com/show/65453/avatar.svg"
              alt="SVG Image"
              className="w-20 h-20"
            />
          </div>
          <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {name}
          </h2>

          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col">
              <p className="text-white font-bold"> Points Earned </p>
              <p className="text-white"> {points_earned} </p>
            </div>
            <div className="flex flex-col">
              <p className="text-white font-bold"> Tasks Completed </p>
              <p className="text-white"> {tasks_completed} </p>
            </div>
          </div>
        </div>
      </div>
    );


}
export default User;