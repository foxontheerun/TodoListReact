import {useState} from "react";
import React from "react";


const UploadFile = () => {
    const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  return (
    <div className="App">
        <form>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default UploadFile;