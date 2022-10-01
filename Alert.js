import React, { useEffect } from 'react'

const Alert = ({type,msg, removeAlert, list}) => {
  useEffect (() =>{
    const timeout = setTimeout(()=>{
      removeAlert()
    }, 4000) // alert will dissapear after 4 seconds
    return () => clearTimeout(timeout)
}, [list]) // adding list tothe dependancy array - so every time the list is changes we get a new set of timeout//
  return (
   <p className={`alert alert-${type}`}>
    {msg}
    </p>
  )
}

export default Alert
