import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom"
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Dashboard} from "./pages/Dashboard"
import {SendMoney} from "./pages/SendMoney"
import axios from 'axios'




function App() {
  console.log("App page")
  const [validToken,setValidToken] = useState(false)

  const fetchData = async () => {
     const config = {
        headers : {
           'Authorization' : 'Bearer '+localStorage.getItem("token")
        }
     };

     try {
      const res = await axios.get('https://payment-wallet-5wix.onrender.com/api/v1/me',config)
      if(res.data.valid){
        setValidToken(true)
      }

     } catch (err) {
        console.log(`Error fetching data: ${err}`)
     }
  }

  useEffect(() => {
    fetchData()
  },[])
  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={validToken?<Dashboard/>:<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/> 
            <Route path="/signin" element={<Signin/>}/> 
            <Route path="/dashboard" element={<Dashboard/>}/> 
            <Route path="/send" element={<SendMoney/>}/> 
         </Routes>
      </BrowserRouter>
    </>
    
  )

}

export default App
