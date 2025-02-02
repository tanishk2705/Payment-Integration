import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users,setUsers] = useState([])
  const [filter, setFilter] = useState("")

  const getUsersList = async () => {
    const response = await axios.get("https://payment-wallet-5wix.onrender.com/api/v1/user/bulk?filter="+filter)
    setUsers(response.data.users)
  }

  // Assignment: Debouncing
  useEffect(() => {
     getUsersList()
  } ,[filter])

  
  
  
  return (
    <>
      <div className="font-bold text-lg mt-6">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value)
          }}
          type="text"
          placeholder="Search Users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>{users.map((user) => <User key={user._id} user={user}/>)}</div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
          {user.firstName[0]}
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <div>{user.firstName} {user.lastName}</div>
      </div>

      <div className="flex flex-col justify-center h-full">
         <Button onClick={(e) => {
             navigate("/send?id="+user._id+"&name="+user.firstName)
         }} label={"Send Money"} /> 
      </div>
    </div>
  );
}
