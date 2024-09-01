import React from 'react'
import LoadingSpinner from './LoadingSpinner';


export default function Alert(probs) {

    const capitalize=(word)=>{
        if(word === 'danger') word="error";
        const lower=word.toLowerCase();
        return word.charAt(0).toUpperCase()+lower.slice(1);
    }

  return (
    <div style={{height:'50px' , marginTop:"65px"}}>
      {probs.loading===true ? <LoadingSpinner msg={probs.msg}/> : probs.alert && <div style={{height:"50px", paddingTop:"10px"}} className={`alert alert-${probs.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(probs.alert.type)}</strong>: {probs.alert.msg}
            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
        </div>}
    </div>
  )
}
