import React from 'react'

const PortalGrid = ({post,error,modalHandler,handleDelete}) => {
    return (
        <div className="grid_view">
            <h3>Grid View</h3>
            <div className="row">
        
                {post.map(({id,title,body},indx) =>
                <div className="col-sm-4" style={{    padding: "5px"}} key={id}>
                    <div className={`item list-group-item-${indx%2===0?"info":"success"}`}>
                        <h5><strong>{id}</strong> {title}</h5>
                        <p>{body}</p>
                        <div className="btngroup">
                        <button  className="btn btn-sm btn-success mr-2" onClick={() => modalHandler(2,id)}>Edit</button>
                        <button  className="btn btn-sm btn-danger" onClick={() => handleDelete(id)}>delete</button>
                        </div>
                    </div>
                </div>
                )}
        
            </div>
        </div>
    
    )
}

export default PortalGrid;