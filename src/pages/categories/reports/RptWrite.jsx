import React from 'react';
import { useContext, useState } from "react";
import axios from "axios";
import {Context } from '../../../context/Context';

const RptWrite = () => {
    const [desc, setDesc] = useState("");
  const [title, setTitle] = useState(""); 

  const [file, setFile] = useState(null);
  const { user } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      userId:user._id,
      title,
      desc
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/reports", newPost);
      window.location.reload();
    } catch (err) {}
  };
    return (
        <div className="write container"> 
      {file && (
        <img className="writeImg" style={{height: '200px', width: '200px'}} src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        {/* <div className="writeFormGroup"> */}
          <textarea
            placeholder="Tell description"
            type="text"
            // className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea> <br />
        {/* </div> */}
        {/* <button className="writeSubmit" type="submit"> */}

        <button  type="submit">
          Publish
        </button>
      </form>
    </div>
    );
};

export default RptWrite;