const AndroidApp = function ({ name, points_earned,image,handleDownload }) {
  return (
    <>
      <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">
        <img
          className="h-48 bg-white rounded-xl"
          src={`https://saurabhss402.pythonanywhere.com${image}`}
          alt="Your Image"
        />
        <div className="flex flex-col ">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold">{name}</span>
            </div>
            <span className="font-bold  text-green-800">{points_earned}</span>
          </div>
          <div className="flex flex-row justify-end">
            <span className="font-bold  text-black">Points</span>
          </div>

          <button
            onClick={function () {
              handleDownload(Number(points_earned));
            }}
            className="hover:bg-blue-400 text-gray-50 bg-blue-600 m-2 py-2 rounded-md"
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
};
export default AndroidApp;