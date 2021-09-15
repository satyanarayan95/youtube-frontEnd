import React, { useState, useEffect } from 'react'
import Post from './Post';


import { FetchedVideos, fetchVideoByTitle, getVideoDetails, saveVideo } from "./service"

export default function Home() {
    const [input, setInput] = useState("");
    const [filterInput,setFilterInput]=useState("");
    const [videos, setVideos] = useState([]);
    const [updatedVideos,setUpdatedVideos] = useState([])

    useEffect(() => {

        (async () => {
            const data = await FetchedVideos();
            setVideos(()=>data);
            //setUpdatedVideos(()=>data);
        })()
    }, [])

    useEffect(()=>{
        setUpdatedVideos(videos)
    },[videos])
    

    const searchRes = async (url) => {
        const res = await getVideoDetails(url);
        let videObj = {
            title: res.snippet.title,
            likes: res.statistics.likeCount,
            dislikes: res.statistics.dislikeCount,
            views: res.statistics.viewCount,
            comments: res.statistics.commentCount,
        }
        const savedVideo = await saveVideo(videObj)
        console.log(savedVideo);
        setInput("");
    }
    const handleInput = (e) => {
        let value = e.target.value;

        setInput(value);
    }

    const handleFilterInput= async (e)=>{
        let value = e.target.value;
        setFilterInput(value);
        let res = await fetchVideoByTitle(value);
        setUpdatedVideos(res);
        console.log(res);
    }


    return (
        <div className="bg-green-200 h-screen w-screen flex flex-col items-center ">
        <div className="p-8 w-3/5">
                <div className="bg-white flex items-center justify-between rounded-full shadow-xl h-12 ">
                    <input className="rounded-l-full w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Paste url of the video" value={input}
                        onChange={(e) => handleInput(e)} />

                    <div className="p-4 flex flex-end">
                        <button onClick={() => searchRes(input)} className="bg-blue-500 text-white rounded-full p-6 hover:bg-blue-400 focus:outline-none w-16 h-12 flex items-center justify-center">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-8 w-3/5">
                <div className="bg-white flex items-center rounded-full shadow-xl h-12 ">
                    <input className="rounded-full w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none" id="filter" type="text" placeholder="video title" value={filterInput}
                        onChange={(e) => handleFilterInput(e)} />

                </div>
            </div>
            {updatedVideos.length === 0 ? <></> : 
                updatedVideos.map((vidObj)=>(
                    <Post key={vidObj._id} vidObj={vidObj} />
                ))
            }
        </div>
    )
}
