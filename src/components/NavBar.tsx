function NavBar() {
  return (
    <>
      <div className="flex justify-between px-4 shadow-lg">
        <div>
          <img
            className="h-[95px] w-[200px]"
            src="https://mjcc.gov.ma/wp-content/uploads/2021/12/mjcc_black.svg"
            alt="logo"
          />
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex justify-center items-center mr-[20px]">
            <li className="list-none m-0 p-0 text-blue-500 mr-7 ">
              Actualités
            </li>
            <li className="list-none m-0 p-0 text-blue-500 mr-7 ">
              Départements
            </li>
            <li className="list-none m-0 p-0 text-blue-500 mr-7 ">Province</li>
            <li className="list-none m-0 p-0 text-blue-500 mr-7 ">
              Appels d’offres et concours
            </li>
          </div>
          <div className="mr-4">
            <button className="px-3 py-1 rounded-lg text-orange-500 border-solid border-2 border-orange-500 bg-white hover:bg-orange-500 hover:text-white">
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
