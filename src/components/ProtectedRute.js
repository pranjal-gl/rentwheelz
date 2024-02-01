import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ child }) => {
    const {isLoggedIn} = useSelector((state)=>state.user.value);
    console.log(isLoggedIn);
    if (!isLoggedIn) { // if the user is not logged in
        return <Navigate to="/login" replace />;
    }
    return child // else render the expected component
};
export default ProtectedRoute;