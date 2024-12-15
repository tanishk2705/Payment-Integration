import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"

export const Signup = () => {
        const [firstName,setFirstName] = useState("")
        const [lastName,setLastName] = useState("")
        const [password,setPassword] = useState("")
        const [userName,setUserName] = useState("")

        return(
                <div className="bg-slate-300 h-screen flex justify-center">
                        <div className="flex flex-col justify-normal">
                                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                                        <Heading label={"sign up"}/>
                                        <SubHeading label={"Enter your information to create an account"}/>
                                        <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="Jhon" label={"First Name"}/>
                                        <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"}/>
                                        <InputBox onChange={(e) => setUserName(e.target.value)} placeholder="xyz@gmail.com" label={"Email"}/>
                                        <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"}/>

                                        <div className="pt-4">
                                                <Button onClick={async () => {
                                                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                                                firstName,
                                                                lastName,
                                                                userName, //may be username
                                                                password
                                                        })
                                                        localStorage.setItem("token",response.data.token) // don't know how response looks like
                                                }} label={"Sign up"}/>
                                                <BottomWarning label={"Alredy have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                                        </div>
                                </div>

                        </div>
                </div>
        )
}