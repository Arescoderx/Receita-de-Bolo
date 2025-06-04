import { createBrowserRouter } from "react-router-dom"

import App from "./App.jsx"
import PaginaErro from "./pages/PaginaErro.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"

const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        errorElement: <PaginaErro />,
        children:[
            {
                path:"/",
                element:<Login />
            },
            {
                path:"/login",
                element:<Login />
            },
            {
                path:"/register",
                element:<Register />
            },
        ]
    }
])

export default router;