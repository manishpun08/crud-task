import GuestRoutes from "./GuestRoutes";
import LoginRoutes from "./LoginRoutes";

const applicationRoutes = [...GuestRoutes, ...LoginRoutes];

export default applicationRoutes;
