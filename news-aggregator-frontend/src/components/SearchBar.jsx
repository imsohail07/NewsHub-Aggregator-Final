import { useState } from "react";
import { FaSearch } from "react-icons/fa";
export default function SearchBar({ setQuery }){
  const [value, setValue] = useState("");
  const submit = (e)=>{
    e?.preventDefault();
    setQuery(value);
  };
  return (
    <form onSubmit={submit} className="mt-6">
      <div className="flex gap-2 items-center bg-white/3 backdrop-blur-sm rounded-xl p-2 border border-white/6">
        <FaSearch className="text-gray-300 ml-3" />
        <input value={value} onChange={e=>setValue(e.target.value)} placeholder="Search news, topics, companies..." className="flex-1 bg-transparent outline-none px-3 py-2 text-white" />
        <button type="submit" className="px-4 py-2 rounded-md bg-[#7c3aed]">Search</button>
      </div>
    </form>
  );
}
