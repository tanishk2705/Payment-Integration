import { Button } from "./Button";

export const Users = () => {
  return (
    <>
      <div className="font-bold text-lg mt-6">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search Users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>Tanishk Gupta</div>
    </>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between">
      <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
          {/* {user.} */}First name
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <div>Fisrt Name Last name</div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button />
      </div>
    </div>
  );
}
