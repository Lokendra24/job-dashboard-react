import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios'
import JobCard from "./components/JobCard";

export default function App() {
    const [ids,setIds]=useState([])
    const [pageData,setPageData]=useState(6)
    const [showButton,setShowButton]=useState(true)

    let count=0

  useEffect(()=>{
    ( async ()=>{
      const res = await axios.get('https://hacker-news.firebaseio.com/v0/jobstories.json')
      setIds(res.data)
    }
    )();
  },[])

  return (
    <div className="App">
      <h1>Hacker News Job Board</h1>
      {
        ids.map((d) => {
          count=count+1
          return ( count<=pageData && <JobCard id={d} key={d} setShowButton={setShowButton} /> )
        } )
      }
      { (!showButton && pageData<60) && <button onClick={()=> setPageData(pageData+6) } >{!showButton ? "Load More" : "Loading" }</button>}
    </div>
  );
}
