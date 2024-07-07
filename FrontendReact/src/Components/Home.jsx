import { Link } from "react-router-dom";

const Home = function () {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-800 justify-center h-screen dark">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-6xl lg:text-9xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Better Data
          </span>
        </h1>

        <div className="flex m-12 gap-20">
          <Link to="/adminLogin">
          
              <div className="relative overflow-hidden w-60 h-40 rounded-3xl cursor-pointer text-2xl font-bold bg-blue-600">
                <div className="z-10 absolute w-full h-full peer"></div>
                <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-blue-400 transition-all duration-500"></div>

                <div className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-blue-400 transition-all duration-500">
                  LOGIN
                </div>

                <div className="w-full h-full items-center justify-center flex uppercase">
                  Admin
                </div>
              </div>
         
          </Link>

          <Link to="/userLogin">
            <div className="relative overflow-hidden w-60 h-40 rounded-3xl cursor-pointer text-2xl font-bold bg-blue-600">
              <div className="z-10 absolute w-full h-full peer"></div>
              <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-blue-400 transition-all duration-500"></div>

              <div className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-blue-400 transition-all duration-500">
                LOGIN
              </div>

              <div className="w-full h-full items-center justify-center flex uppercase">
                User
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
