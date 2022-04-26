import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ViewLoading from "../View/ViewLoading";
const NoRoutes = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(-1)
    }, []);

    return(<>
        {<ViewLoading/>}
    </>)
}
export default NoRoutes;