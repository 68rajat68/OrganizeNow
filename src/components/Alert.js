import React from 'react'

export default function Alert(probs) {

    const capitalize=(word)=>{
        if(word === 'danger') word="error";
        const lower=word.toLowerCase();
        return word.charAt(0).toUpperCase()+lower.slice(1);
    }

  return (
    <div style={{height:'45px' , marginTop:"60px"}}>
        {probs.alert && <div style={{height:"40px", paddingTop:"6px"}} className={`alert alert-${probs.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(probs.alert.type)}</strong>: {probs.alert.msg}
            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
        </div>}
    </div>
  )
}
