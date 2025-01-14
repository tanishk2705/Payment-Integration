import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Dashboard = () => {
        const [balance,setBalance] = useState(0)
        const [username,setUsername] = useState('-')
        const navigate = useNavigate();

        const fetchData = async () => {
                if(!localStorage.getItem("token")){
                        alert("You cant access dashboard please login first")
                        navigate("/signin")
                        
                }
                const config = {
                        headers : {
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                        }
                }

                try{
                const res = await axios.get('http://localhost:3000/api/v1/me',config)
                // Yaha pas gadbad hoga
                setUsername(res.data.name[0].toUpperCase())
                setBalance(parseInt(res.data.balance))
                 }
                catch(err){
                console.log(`Error fetching data: ${err}`)
                }
        }

        useEffect(()=>{
                fetchData()
        },[])

        return <div>
                <AppBar name={username}/>
                <div className="mt-8">
                        <Balance value={balance}/>
                        <Users/>
                </div>
        </div>

}
