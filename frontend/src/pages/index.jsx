import React from 'react'
import { Switch, Route } from 'react-router-dom'; 

import Dashboard from './Dashboard/index.jsx';
import Landing from './Landing/index.jsx';

export function Routers(){
    return(
        <Switch>
            <React.Suspense fallback={<Loading/>}>
                <Route path="/" exact={true} component={Landing}/>
            </React.Suspense>
        </Switch>
    )
}

export default Routers;