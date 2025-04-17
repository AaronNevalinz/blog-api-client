import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Tags() {
  const {tags} = useContext(AppContext)
  return (
    <div className=''>
        <div className=" max-w-2xl z-50 overflow-x-auto mt-2 items-center whitespace-nowrap mx-auto pb-4  no-scrollbar flex justify-between">
            <IoIosArrowBack />
            <div className="flex gap-x-3">
                {
                  tags.map((tag, index)=>
                    <Link to={`/feed/tag/${tag.id}`} key={index} className="capitalize cursor-pointer bg-slate-300 px-4 rounded-full">{tag.name}</Link>
                  )
                }
            </div>
            <IoIosArrowForward />
        </div>
    </div>
  )
}