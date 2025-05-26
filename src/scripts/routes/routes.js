import LoginPage from "../pages/home/loginPage";
import RegisterPage from "../pages/home/register-page";
import HomePage from "../pages/home/home-page";
import OfflinePage from "../pages/home/offline-page";
import UploadPage from "../pages/upload/upload-page";
import AboutPage from "../pages/about/about-page";

const routes = {
  "/": new LoginPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/home": new HomePage(),
  "/upload": new UploadPage(),
  "/about": new AboutPage(),
  "/offline": OfflinePage,
};

export default routes;
