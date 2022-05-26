import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom";
import {ComponentType} from "react";
import {useAppSelector} from "../store/configureStore";
import {toast} from "react-toastify";

interface Props extends RouteProps{
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    roles?: string[];
}

export default function PrivateRoute({ component: Component, roles, ...rest }: Props) {
    const {user} = useAppSelector(state => state.account);
    
    return (
        <Route
            {...rest}
            render={ props => {
                    if (!user) {
                        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> 
                    }
                    
                    if (roles && !roles?.some(r => user.roles?.includes(r))) {
                        toast.error('Not authorised to access this area');
                        return <Redirect to={{ pathname: "/catalog" }} />
                    }
                    
                    return <Component {...props} />
                }
            }
        />
    );
}