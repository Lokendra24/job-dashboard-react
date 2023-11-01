import axios from "axios";
import React, { useEffect, useState } from "react";
import '../css/Jobcard.css'

function JobCard({ id,setShowButton }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const date = new Date(data?.time);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      setData(res.data);
      console.log(res.data)
      setLoading(false);
      setShowButton(false)
    })();
  }, [id]);
  return (
    <>
      { !loading && (
        <div className="jobcard_container" >
          { !data.url && <h4>{data?.title}</h4>}
          { data.url && <a href={data.url} target="_blank" rel="noopener" ><h4>{data?.title}</h4></a>}
          <div className="owner_date_time" >
            <p>By {data?.by}</p>
            <p>
              {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`},{" "}
              {`${date?.getHours()}:${date?.getMinutes()} PM`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default JobCard;
