import { Outlet,useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import URLShortener from './UrlShortner/UrlPage';

const Layout = () => {
  const location = useLocation();
  return (
    <div className="bg-gradient-to-br from-PrimaryColor-200  via-PrimaryColor-400 to-PrimaryColor-800  overflow-x-hidden w-screen h-screen ">
      <NavBar />
      {location.pathname === '/' ? <URLShortener /> : <Outlet />}
     
    </div>
  );
};

export default Layout;
