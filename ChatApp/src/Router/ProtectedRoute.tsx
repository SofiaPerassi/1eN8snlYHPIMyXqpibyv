
import React, { FC, PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";


interface ProtectRouteProps {

isProtected?: boolean;
isAllowed?: boolean;
redirectTo?: string;

}


export const ProtectedRoute: FC <PropsWithChildren<ProtectRouteProps>> = ({

redirectTo,
isAllowed,
children,

}) => {

if (!isAllowed) {

if (redirectTo) {

return <Navigate to={redirectTo} replace />;

} else {
return null;
}

}


return isAllowed ? <>{children}</> : null;

};