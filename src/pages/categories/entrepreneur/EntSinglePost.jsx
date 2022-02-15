import React from 'react';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {Context} from "../../../context/Context"

const EntSinglePost = () => {
    const loc = useLocation();
    const path = loc.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);

    const [locationRange, setLocationRange] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [startUpType, setStartUpType] = useState("");
    const [productType, setProductType] = useState("");
    const [contact, setContact] = useState("");
    const [startUpName, setStartUpName] = useState("");
    const [desc, setDesc] = useState("");

    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
          const res = await axios.get("/entrepreneur/" + path);
          setPost(res.data);
          setLocationRange(res.data.locationRange);
          setPrice (res.data.price); 
          setQuantity(res.data.quantity);
          setContact(res.data.contact);
          setStartUpType (res.data.startUpType)
          setProductType (res.data.productType)
          setStartUpName (res.data.startUpName)
          setDesc(res.data.desc);
        };
        getPost();
      }, [path]);
    
      const handleDelete = async () => {
        try {
          await axios.delete(`/entrepreneur/${post._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };
    
      const handleUpdate = async () => {
        try {
          await axios.put(`/accommodations/${post._id}`, {
            username: user.username,
            locationRange,
            desc, price, quantity, contact, startUpName, startUpType, productType
          });
          setUpdateMode(false)
        } catch (err) {}
      };
    
  
    return (
        <div>
        <div className="singlePostWrapper">
   {post.photo && (
     <img src={PF + post.photo} alt="" className="singlePostImg" />
   )}
   {updateMode ? (
     <input
       type="text"
       value={startUpName}
       className="singlePostTitleInput"
       autoFocus
       onChange={(e) => setStartUpName(e.target.value)}
     />
   ) : (
     <h1 className="singlePostTitle">
       {startUpName}
       {post.username === user?.username && (
         <div className="singlePostEdit">
           <i
             className="singlePostIcon far fa-edit"
             onClick={() => setUpdateMode(true)}
           ></i>
           <i
             className="singlePostIcon far fa-trash-alt"
             onClick={handleDelete}
           ></i>
         </div>
       )}
     </h1>
   )}
   <div className="singlePostInfo">
     <span className="singlePostAuthor">
       Author:
       <Link to={`/${post.username}`} className="link">
         <b> {post.username}</b>
       </Link>
     </span>
     <span className="singlePostDate">
       {new Date(post.createdAt).toDateString()}
     </span>
   </div>
   {updateMode ? (
       <div>
           <textarea
       className="singlePostDescInput"
       value={desc}
       onChange={(e) => setDesc(e.target.value)}
     />

           <textarea
       className="singlePostDescInput"
       value={locationRange}
       onChange={(e) => setLocationRange(e.target.value)}
     />

           <textarea
       className="singlePostDescInput"
       value={price}
       onChange={(e) => setPrice(e.target.value)}
     />

           <textarea
       className="singlePostDescInput"
       value={quantity}
       onChange={(e) => setQuantity(e.target.value)}
     />

           <textarea
       className="singlePostDescInput"
       value={startUpType}
       onChange={(e) => setStartUpType(e.target.value)}
     />

        <textarea
       className="singlePostDescInput"
       value={productType}
       onChange={(e) => setProductType(e.target.value)}
     />

           <textarea
       className="singlePostDescInput"
       value={contact}
       onChange={(e) => setContact(e.target.value)}
     />
       </div>
     
     
   ) : (
       <div>
           <p>{startUpName}</p>
          <p className="singlePostDesc">{desc}</p>
          <p>{locationRange}</p>
          <p>{price}</p>
          <p>{quantity}</p>
          <p>{contact}</p>
          <p>{startUpType}</p>
          <p>{productType}</p> 
       </div>
     
   )}
   {updateMode && (
     <button className="singlePostButton" onClick={handleUpdate}>
       Update
     </button>
   )}
 </div>
   </div>
    );
};

export default EntSinglePost;