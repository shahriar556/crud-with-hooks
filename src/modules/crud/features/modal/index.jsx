import React from 'react';
import './style.css'



  
const Mdl = ({isOpen,editable,handleSubmit,changeHandler,title,body,close}) => {

    
        return (
            <div className={`modal_cont ${isOpen ? "db" : "dn"}`}>
                <div className="mdl">
                    <div className="header">
                        <h3>{editable ? "Edit Post" : "Add Post"}</h3>
                    </div>

                    <form action="" method="POST" onSubmit={handleSubmit}>
                        <div className="cont_body">
                            <div className="form-group">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    className="form-control" 
                                    value={title}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Body</label>
                                <textarea  
                                    name="body" 
                                    className="form-control"
                                    onChange={changeHandler} 
                                    value={body}
                                />
                            </div>
                        </div>
                        <div className="footer">
                            <button type="button" style={{backgroundColor: "#c34646"}} onClick={close}>Close</button>
                            <button type="submit" style={{backgroundColor: "#358835"}}>{editable ? "Edit" : "Add"}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
  }
  
 export default Mdl;
