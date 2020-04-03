import React from 'react';


const PortalList = ({post,modalHandler,handleDelete}) => {
    return (
        <div className="list_view"> 
            <h3>List View</h3>

            <ul className="list-group">

                {post.map(({id,title,body},indx) => 
                <li className={`list-group-item d-flex justify-content-between list-group-item-${indx%2===0?"info":"light"}`} key={id}>
                    <p style={{width: "39px"}}>{id}</p>
                    <p className="title">{title}</p>
                    <p className="body">{body}</p>
                    <div className="action">
                        <button onClick={() => handleDelete(id)} className="btn btn-sm btn-danger">Delete</button>
                        <button onClick={() => modalHandler(2,id)} className="btn btn-sm btn-success mr-2">Edit</button>
                    </div>
                </li>
                )}
            </ul>
        </div>
    )
}

export default PortalList;