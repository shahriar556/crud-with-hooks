import React, {useState} from 'react';

import PortalList from  './portalList'
import PortalGrid from  './portalGrid'
import PortalTable from './portalTable'

const PortalView = ({post,error,handleDelete,modalHandler,pagiNext,pagiPrev,handelSearch,search,pagiStart,postsLength,pagiLimit,paginatNum}) => {

    const [viewStatus, setViewStatus] = useState("1");

    const handleViewChange = vn => {
        setViewStatus(vn)
    }

    const pagiNum = [];
    for(let i = 0 ; i < postsLength / pagiLimit; i++){
        const res = <li key={i} className={`page-item ${ pagiStart == pagiLimit * i  && "active" }`}>
            <a className="page-link" onClick={e => paginatNum(e,pagiLimit * i)} href="#">{i + 1}</a>
            </li>

        pagiNum.push(res)
    }


    return (
        <div className="col-lg-12 viw">
            <div className="d-flex justify-content-end">
            <button onClick={() => handleViewChange("1")} className={`btn btn-${viewStatus === "1" ? "success" : "info"} mr-2`}>List View</button>
            <button onClick={() => handleViewChange("2")} className={`btn btn-${viewStatus === "2" ? "success" : "info"} mr-2`}>Grid View</button>
            <button onClick={() => handleViewChange("3")} className={`btn btn-${viewStatus === "3" ? "success" : "info"} mr-2`}>Table View</button>
            </div>

            <input type="text" 
                value={search} 
                onChange={handelSearch} 
                className="search" 
                placeholder="Search by Title"
            />

            

            {viewStatus === "1" && 
                <PortalList 
                post={post} 
                error={error}
                modalHandler={modalHandler}
                handleDelete={handleDelete}
            />
            }
            {viewStatus === "2" && 
            <PortalGrid 
                post={post} 
                error={error}
                modalHandler={modalHandler}
                handleDelete={handleDelete}
            />}
            {viewStatus === "3" && 
            <PortalTable 
                post={post} 
                error={error}
                modalHandler={modalHandler} 
                handleDelete={handleDelete}
            />
            }

            <nav aria-label="Page navigation example" className="mt-4 pr-4 viewNavigation">
                <ul className="pagination">

                    <li className={`page-item ${pagiStart <= 0 && "disabled"}`}>
                        <a className="page-link" onClick={pagiPrev} href="#">Previous</a>
                    </li>
                    {pagiNum}
                    <li className={`page-item ${pagiStart + pagiLimit >= postsLength && "disabled"}`}>
                        <a className="page-link" onClick={pagiNext} href="#">Next</a>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default PortalView;