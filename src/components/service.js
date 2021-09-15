import axios from "axios";
import getVideoId from "get-video-id";

export const YTinstance = axios.create({
  method: "GET",
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "statistics,snippet",
    key: "AIzaSyA9Rv_FLMHDXWAoF0H6R55IgQjTDGYoMhk",
  },
});
export const APIinstance = axios.create({
  method: "GET",
  baseURL: "http://localhost:5000",
 
});

export const getVideoDetails = async function (url) {
  let vid_obj = getVideoId(url);
  let vid_id = vid_obj.id;
  const res = await YTinstance.get("/videos", {
    params: {
      id: vid_id,
    },
  });
  return res.data.items[0];
};

export const saveVideo = async function (vidObj){
   const res =  await APIinstance.post("/video",vidObj);
   return res;
}

export const FetchedVideos = async function (){
    const res =  await APIinstance.get("/videos");
    return res.data;
 }

 export const fetchVideoByTitle = async function(title){
   const res= await APIinstance.get(`/video/${title}`)
   return res.data;
 }