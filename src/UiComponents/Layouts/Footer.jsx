import React from 'react'
// import snagLogo from "../assets/snag.png";
// import snagLogo from "../../src/assets/snag.png";
import snagLogo from "../../assets/snag.png";

const Footer = () => {
  return (
  <footer className="w-full py-2">
  <div className="flex items-center justify-center gap-2 text-sm text-gray-500" style={{width:"200px",margin:"20px auto",borderRadius:"8px",padding:"4px"}}>
    <span style={{textAlign:'center'}}>Powered by</span>
    <img style={{width:"40px"}} src={snagLogo} alt="Snag" className="w-5 h-5" />
    <span>Snag</span>
  </div>
</footer>


  )
}

export default Footer