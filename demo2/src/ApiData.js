import React, { useEffect, useState } from "react";
import axios from "axios";
import  "./App.css";

function ApiData() {
  const [posts, setPosts] = useState([]);
  const baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  useEffect(() =>{
    const getPosts = async  () =>{
      const {data: res} = await axios.get(baseUrl)
      setPosts(res)

    };
    getPosts();
   
  },[])

  const addItem = async() =>{
    const post = {title: "new post", body: "new"}
    await axios.post(baseUrl, post)
    setPosts([post, ...posts])
  }
  
  const deleteHandler = async(post) =>{
    await axios.delete(baseUrl + "/" + post.id + post.title);
    setPosts(posts.filter((p) =>p.id !== post.id))
  };

  return (
    <>
    <h1>Total number of List : {posts.length}</h1>
    <button onClick={addItem}>Add Record</button>
    <table>
      <thead>
        <tr>
        <th>UserId</th>
        <th>User title</th>
        <th>Delete Operation</th>
        </tr>
        <tbody>
          {posts.map((post) =>
            <tr key={post.id}>
             {/* Changes required bellow  */}
            <td>{post.id}</td>
            <td>{post.title}</td>

            <td><button onClick={deleteHandler}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </thead>
    </table>
    </>
  )

}
export default ApiData;
