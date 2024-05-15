import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  if (!user.username) {
    return (
      <>
        {toast.error("Login to access this page!")}
        {history.push("/")}
      </>
    );
  } else {
    return children;
  }
};

export default ProtectedRoute;
