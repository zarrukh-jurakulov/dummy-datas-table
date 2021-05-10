import React from "react";
import ReactDOM from "react-dom";

import {AiFillCheckCircle, AiFillMinusCircle} from 'react-icons/ai'

const Modal = ({id, service, trademark, branches, country, status, visible, toggle}) =>
  visible
    ? ReactDOM.createPortal(
  
          <div className="modal-overlay">
             <div className="modal">
          <div className="modal-pop" role="dialog" aria-modal="true">
            <div key={id}>
                <p>ID : <span>{id}</span></p>
                <p>Service : <span>{service}</span></p>
                <p>Trademark :<span>{trademark}</span></p>
                <p>Branches : <span>{branches}</span></p>
                <p>Country : <span>{country}</span></p>
                <p>Status : {status ? <AiFillCheckCircle className="true-icon"/> : <AiFillMinusCircle className="false-icon"/>}</p>
            </div>
          <div className='modal-btn-container'>
            <button className='modal-button' type="button" onClick={toggle}>
              Close
            </button>
          </div>
            
          </div> 
          </div>
        </div>,
         document.body
         )
       : null;

       export default Modal