import React from 'react'
import PopoverDesktop from './_desktop';
import PopoverMobile from './_mobile';

export function Navigation({setConfig, config}){
    return(
        <>
            <PopoverDesktop setConfig={setConfig} config={config}/>
            <PopoverMobile setConfig={setConfig} config={config}/>
        </>
    )
}

export default Navigation;