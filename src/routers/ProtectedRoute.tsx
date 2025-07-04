import { useEffect, type FC, type JSX, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
    const token = localStorage.getItem("token");
    //console.log(phone)
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    return children;
}

export default ProtectedRoute;