import React from "react";

export default function Post({ vidObj }) {
  return (
          <div className="flex flex-col items-center justify-center bg-white text-gray-500 text-lg max-w-md m-2 rounded-md shadow-lg">
          <li className="max-w-md text-center" style={{listStyle:"none"}}>
          <ul className="text-red-600 font-serif font-bold truncate ... px-2"> {vidObj.title}</ul>
          </li>
          <li className="max-w-md text-center flex text-sm  space-x-2" style={{listStyle:"none"}}>
          <ul> Likes : <span className="text-gray-600 font-bold"> {vidObj.likes}</span> </ul>
          <ul> Dislikes : <span className="text-gray-600 font-bold">{vidObj.dislikes}</span>  </ul>
          <ul> Comments : <span className="text-gray-600 font-bold"> {vidObj.comments}</span> </ul>
          <ul> Views : <span className="text-gray-600 font-bold">{vidObj.views}</span>  </ul>
        </li>
          </div>
        );
      }
      
      