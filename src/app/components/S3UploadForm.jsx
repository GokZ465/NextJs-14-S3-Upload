"use client";

import { useState } from "react";

  

const UploadForm = () => {

  const [file, setFile] = useState(null);

  const [objectKey, setObjectKey] = useState("");

  const [uploading, setUploading] = useState(false);

  const [retrieving, setRetrieving] = useState(false);

  const [error, setError] = useState(null);

  

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

  };

  

  const handleObjectKeyChange = (e) => {

    setObjectKey(e.target.value);

  };

  

  const handleUpload = async (e) => {

    e.preventDefault(); // Prevent the default form submission

    if (!file) return;

  

    setUploading(true);

    setError(null);

  

    try {

      const response = await fetch("/api/s3-upload", {

        method: "POST",

        body: new FormData().append("file", file),

      });

  

      const data = await response.json();

      console.log(data.status);

    } catch (error) {

      console.error(error);

      setError("Error uploading file. Please try again.");

    } finally {

      setUploading(false);

    }

  };

  

  const handleRetrieve = async (e) => {

    e.preventDefault(); // Prevent the default button click

    if (!objectKey) return;

    setRetrieving(true);

    setError(null);

    try {

      const response = await fetch(`/api/s3-upload?objectKey=${objectKey}`, {

        method: "GET",

        headers: {

          "Content-Type": "application/octet-stream", // Add this header

        },

      });

      if (response.ok) {

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = objectKey;

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);

      } else {

        console.error(`Error retrieving file: ${response.statusText}`);

        setError(`Error retrieving file: ${response.statusText}`);

      }

    } catch (error) {

      console.error(error);

      setError("Error retrieving file. Please try again.");

    } finally {

      setRetrieving(false);

    };

  };

  return (

    <>

      <h1>Upload and Retrieve Files from S3 Bucket</h1>

  

      <form>

        <div>

          <label>Upload File <input type="file" accept="image/*" onChange={handleFileChange} />

          </label>

          <button type="button" onClick={handleUpload} disabled={!file || uploading}>

            {uploading ? "Uploading..." : "Upload"}

          </button>

        </div>

  

        <div>

          <label>Retrieve File (Object Key): <input type="text" value={objectKey} onChange={handleObjectKeyChange} />

          </label>

          <button type="button" onClick={handleRetrieve} disabled={!objectKey || retrieving}>

            {retrieving ? "Retrieving..." : "Retrieve"}

          </button>

        </div>

      </form>

  

      {error && <p style={{ color: "red" }}>{error}</p>}

    </>

  );

};

  

export default UploadForm;