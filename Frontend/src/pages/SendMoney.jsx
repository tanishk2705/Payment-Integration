import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"

export const SendMoney = () => {

        const getBalance = async () => {
                const config = {
                        headers : {
                                'Authorization': 'Bearer '+localStorage.getItem('token')
                        }
                }
                
                console.log("Token being sent:", localStorage.getItem('token'));
                const response = await axios.get("http://localhost:3000/api/v1/me",config)
                setBalance(Math.floor(response.data.balance))
                console.log('API Response:', response.data);
                console.log('Balance Value:', response.data.balance);
        }

        useEffect(()=>{
                getBalance()
        },[])

        
        const [searchParams] = useSearchParams()
        const name = searchParams.get("name") || "Unknown"
        const id = searchParams.get("id")
        const [amount,setAmount] = useState(0)
        const [balance,setBalance] = useState(0)

        

        return <div className="flex justify-center h-screen bg-gray-100">
                 <div className="h-full flex flex-col justify-center">
                        <div className="border h-min text-card-foreground man-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                                <div className="flex flex-col space-y-1.5 p-6">
                                     <h2 className="text-3xl font-bold text-center ">Send Money</h2>
                                </div>
                                <div className="p-6">
                                        <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                                        <span className="text-2xl text-white">{name[0]?.toUpperCase() || "U"}</span>
                                                </div>
                                                <div className="flex-col">
                                                   <h3 className="text-1xl font-semibold">{name}</h3>
                                                   <h3 className="text-1xl font-semibold">current balance: {balance}</h3>

                                                </div>
                                                
                                        </div>
                                        <div className="space-y-4">
                                                <div className="space-y-2">
                                                        <label htmlFor="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >Amount (in Rs)</label>
                                                        <input onChange={(e) => {
                                                                setAmount(e.target.value)
                                                        }} 
                                                        type="number" id="amount" placeholder="Enter amount" className="felx h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/>
                                                </div>
                                                <button
                                                 onClick={ async () => {
                                                        try{
                                                        // pata nahi next line kyu
                                                        const inputPlaceholder = document.getElementById("amount")
                                                        if(amount>0){
                                                        const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                                                                to : id,
                                                                amount
                                                        },{
                                                                headers : {
                                                                        Authorization : "Bearer "+localStorage.getItem("token")
                                                                }
                                                        })
                                                        setAmount(0)
                                                        inputPlaceholder.value="Enter amount";
                                                        getBalance();
                                                        alert("transfer succesfull")
                                                        console.log(localStorage.getItem("token"));
                                                        }
                                                        else{
                                                                alert("please enter a valid to transfer money, transfer invalid")
                                                                inputPlaceholder.value='Enter amount'
                                                        }
                                                }
                                                catch(err){
                                                        console.log(err)
                                                }
                                                 }}
                                                 className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                                                 >Initiate Transer</button>
                                                 <BottomWarning label={"go back to "} buttonText={"dashboard"} to={"/dashboard"} />
                                        </div>
                                </div>

                        </div>

                 </div>
             </div>
}
