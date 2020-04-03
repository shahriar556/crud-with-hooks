import React, { useState, useEffect,useReducer } from 'react';
import Axios from 'axios'
import './style.css'

import Mdl from '../features/modal'
import View from '../features/view'

// IMPORT LOADING IMAGE 
import loadingPng from './img/loading.svg'
import { setServers } from 'dns';

const URL = 'https://jsonplaceholder.typicode.com/'
// const URL_PAGI = 'http://jsonplaceholder.typicode.com/posts?_start=0&_limit=9'


// pagi = posts?_start=0&_limit=9
// all posts = posts


const POST_GET = 'POST_GET';
const POST_CREATE = 'POST_CREATE';
const POST_UPDATE = 'POST_UPDATE';
const POST_DELETE = 'POST_DELETE';

const init = {
    post: []
}

const reducer = (state, action) => {
    switch(action.type){
        case POST_GET: {
            let {post} = state;
            post = action.payload;
            return {post}
        }
        case POST_CREATE: {
            let {post} = state;
            post = action.payload;
            return {post}
        }
        case POST_UPDATE: {
            let {post} = state;
            post = action.payload;
            return {post}
        }
        case POST_DELETE: {
            let {post} = state;
            post = action.payload;
            return {post}
        }
        default: return state;
    }
}




const StudentPortal = () => {

     const [showPost, setShowPost] = useState([]);
     const [title, setTitle] = useState("")
     const [body, setBody] = useState("")
     const [isModalOpen, setIsModalOpen] = useState(false)
     const [editable, setEditable] = useState(false)
     const [editablePost, setEditablePost] = useState(null)
     const [error,setError] = useState("");
     const [isLoading,setIsLoading] = useState(true);
 
     const [haveMsg,setHaveMsg] = useState(false)
     const [msg,setMsg] = useState("")
 
     const [pagiStart,setPagiStart] = useState(0);
     const [pagiLimit,setPagiLimit] = useState(9)
     const [postsLength,setPostsLength] = useState()

     const [search,setSearch] = useState("")




    const [{post},setPost] = useReducer(reducer, init);
     // GET POSTS WITH PAGINATION
     useEffect(() =>{
        setIsLoading(true);
        const getData = async () => {
            try{
                const {data} = await Axios.get(`${URL}posts?_start=${pagiStart}&_limit=${pagiLimit}&sort=latest`)
                setPost({type:POST_GET,payload:data})
                
                setError("")
                setIsLoading(false);
            }catch(e){
                setError("Network Error")
                setIsLoading(false);
            }
        }
        getData();
        
    }, [pagiStart]);

  
    

    // GET POSTS LENGTH
    useEffect(() =>{
        const loadPost = async () => {
            try{
                const {data} = await Axios.get(`${URL}posts`)
                setPostsLength(data.length)
            }catch(e){
                setError("Network Error")
            }
        }
        loadPost()
    }, [post]);



    
    useEffect(() =>{

            const searchHandle = () => {
                
                if(search){
                    let posts = post.filter(pst => {

                        let fltr = search.toLowerCase().trim();
                        // || pst.body.toLowerCase().indexOf(fltr) > -1
                        if (pst.title.toLowerCase().indexOf(fltr) > -1) {
                            return true;
                        } else {
                            return false
                        }
                     });
                    setShowPost(posts)
                }else{
                    setShowPost(post)
                }
            }

            searchHandle();
            
    },[search,post])


    const createPost = e => {
        e.preventDefault();
        setIsLoading(true);

        if(editable){

            const posts = post;
            const postt = posts.find(post => post.id === editablePost);
            postt.title = title;
            postt.body = body;

            setPost({type:POST_UPDATE,payload:posts})
            setTitle("")
            setBody("")
            setEditable(false)
            setEditablePost(null)
            setIsModalOpen(false)
            setIsLoading(false);

            setHaveMsg(true)
            setMsg("Post Updated Successfully!")
    
        }else{
            Axios.post(URL+"posts",
                    {
                    title: title,
                    body: body
                })
                .then(res => {
                    if(res.status == 201){
                    console.log(res);
    
                    const posts = [...post, {
                        userId: post[post.length - 1].id + 1,
                        id: post[post.length - 1].id + 1,
                        title: title,
                        body: body
                    }];

                    setPost({type:POST_CREATE,payload:posts})
                    setTitle("")
                    setBody("")
                    setIsModalOpen(false)

                    setHaveMsg(true)
                    setIsLoading(false);
                    setMsg("New Post Added Successfully!")
                    setPostsLength(postsLength + 1);
                    
                    }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }

    }

    const handleDelete = id => {
        setIsLoading(true);
        
        Axios.delete(URL+"posts/"+id)
            .then(res => {
                if(res.status == 200){
                    const posts = post.filter(post => post.id != id);
                    setPost({type:POST_DELETE,payload:posts})
                    setHaveMsg(true)
                    setIsLoading(false);
                    setMsg("Post Deleted Successfully!")
                    setPostsLength(postsLength - 1);
                }
        }).catch(e => console.log(e));
    }

    const changeHandler = e => {
        if(e.target.name === "title"){
            setTitle(e.target.value)
        }else if(e.target.name === "body"){
            setBody(e.target.value)
        }
    }

    const modalHandler = (isSubmitable,id) => {
        if(isSubmitable == 2){

            const postt = post.find(post => post.id === id);
            console.log(postt)
            setIsModalOpen(!isModalOpen)
            setEditable(true)
            setEditablePost(id)
            setTitle(postt.title)
            setBody(postt.body)


        }else{
            setIsModalOpen(!isModalOpen)
            setEditable(false);
        }
    }
    const modalCloseHandler = () => {
        setIsModalOpen(!isModalOpen)
        setEditable(false)
        setEditablePost(null)
        setTitle("")
        setBody("")
    }

    const pagiNext = (e) => {
        e.preventDefault();
        
        if(pagiStart < postsLength - pagiLimit){
            setPagiStart(pagiLimit + pagiStart)
        }

        
    }
    const pagiPrev = (e) => {
        e.preventDefault();
        if(pagiStart > 0){
            setPagiStart(pagiStart - pagiLimit)
        }
    }
    const paginatNum = (e,pagiNum) => {
        e.preventDefault();
          setPagiStart(pagiNum)
    }

    const changeSearchInput = e => {
        setSearch(e.target.value)
    }

       
        return (

            <div className="main_portal" onClick={()=>{setHaveMsg(false)}}>
                {isLoading && <div className='loading'>
                    <img src={loadingPng} />
                </div>}
                <div className={`alert_msg ${haveMsg ? "alertShow" : "alertHide"}`} onClick={()=>{setHaveMsg(false)}}>
                    <p>{msg}</p>
                    <span>x</span>
                </div>
                
                <div className="row">
                    <div className="col-lg-12 viw">
                        <button  className="btn btn-sm btn-info addPostBtn" onClick={() => modalHandler(1)}>Add Post</button>
                        

                        <Mdl 
                            isOpen={isModalOpen}
                            close={modalCloseHandler}
                            handleSubmit={createPost}
                            changeHandler={changeHandler}
                            title={title}
                            body={body}
                            editable={editable}
                        />
                        
                        
                        {error && <h2 className="viewPreText">{error}</h2>}

                        <View 
                            post={showPost}
                            error={error}
                            modalHandler={modalHandler}
                            handleDelete={handleDelete}
                            isLoading={isLoading}
                            pagiNext={pagiNext}
                            pagiPrev={pagiPrev}
                            handelSearch={changeSearchInput}
                            search={search}
                            postsLength={postsLength}
                            pagiStart={pagiStart}
                            pagiLimit={pagiLimit}
                            paginatNum={paginatNum}
                        />


                    </div>
                </div>

            </div>
        )
 
}

export default StudentPortal;