import React, {useEffect, useState} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UrlTable = ({flag}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      setData([]);
      const res = await axios.get("http://localhost:5000/api/short");
      setData(res.data);
    })();
  }, [flag]);

  const handleClick = async (e) => {
    try {
      await axios.get(`http://localhost:5000/api/short/${e}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: "80%",
      }}
    >
      <table
        className="table table-striped table-responsive"
        style={{backgroundColor: "white"}}
      >
        <thead>
          <tr>
            <th>Full Url</th>
            <th>Short Url</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length !== 0 &&
            data.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>
                    <a href={ele.full} target="_blank">
                      {ele.full}
                    </a>
                  </td>
                  <td>
                    <a
                      href={ele.short}
                      target="_blank"
                      onClick={() => handleClick(ele._id)}
                    >
                      {ele.short}
                    </a>
                  </td>
                  <td>{ele.clicks}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default UrlTable;
