import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(({path, component: Component, exact}) =>
                    <Route
                        element={<Component/>}
                        path={path}
                        exact={exact}
                        key={path}
                    />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(({path, component: Component, exact}) =>
                    <Route
                        element={<Component/>}
                        path={path}
                        exact={exact}
                        key={path}
                    />
                )}
            </Routes>
    );
};

export default AppRouter;