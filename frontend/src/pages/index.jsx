import React from 'react'
import { Switch, Route } from 'react-router-dom'; 
import Error from '../components/utils/Error.jsx';
import Loading from '../components/utils/Loading.jsx';
import Landing from './Landing/index.jsx';

export function Routers(){
    try{
        return(
            <Switch>
                <React.Suspense fallback={<Loading/>}>
                    <Route path="/" exact={true} component={Landing}/>
                </React.Suspense>
            </Switch>
        )
    }catch(e){
        return(<Error error={e}/>)
    }
    
}

export default Routers;