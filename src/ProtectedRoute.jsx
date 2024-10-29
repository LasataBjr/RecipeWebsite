import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, isLoggIn}) => {
    return isLoggIn ? children : <Navigate to='/Login'/>;

}
export default ProtectedRoute;