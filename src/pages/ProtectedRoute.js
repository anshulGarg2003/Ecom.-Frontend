import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  console.log(user);

  if (!user.username) {
    history.push("/");
    return null;
  } else {
    return children;
  }
};

export default ProtectedRoute;
