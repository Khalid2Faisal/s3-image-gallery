import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

import { useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  console.log(location.pathname);

  let navigate = useNavigate();

  const actions = {
    onHome: () => {
      navigate("/");
    },
    onNewImage: () => {
      navigate("/newImage");
    },
  };

  return (
    <div className="bg-teal-50">
      <div className="p-2">
        <NavBar {...actions} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
