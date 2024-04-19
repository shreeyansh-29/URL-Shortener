import React, {useEffect, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import axios from "axios";
const shortId = require("shortid");

function LinkResult({inputValue}) {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios(
        `https://api.shrtco.de/v2/shorten?url=${inputValue}`
      );
      console.log(res);
      setShortenLink(res.data.result.full_short_link);
      try {
        const resp = await axios.post("http://localhost:5000/api/short", {
          longUrl: inputValue,
          shortUrl: res.data.result.full_short_link,
        });
        console.log(resp, "ress");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <p className="noData">Something Went Wrong</p>;
  }

  return (
    <>
      {shortenLink && (
        <div className="result">
          <span>{shortenLink}</span>

          <CopyToClipboard onCopy={() => setCopied(true)} text={shortenLink}>
            <button
              className={copied ? "copied" : ""}
              onClick={() => {
                alert("Copied");
                setShortenLink("");
              }}
            >
              Copy to clipboard
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
}

export default LinkResult;
