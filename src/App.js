import React, {useState, useEffect} from 'react'
import servicesTable from './data'
import {AiFillCheckCircle, AiFillMinusCircle} from 'react-icons/ai'
import {WiDirectionLeft} from 'react-icons/wi'
import './App.css';
import Pagination from './pagination';
import useModal from './useModal'
import Modal from './modal'
import ReactTooltip from 'react-tooltip';
import jsonData from './data.json'

//application flow 
function App() {
  const [dataContainer, setDataContainer] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [selectItem, setSelectItem] = useState('id')
  const [selectedRow, setSelectedRow] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  const {toggle, visible} = useModal()


 useEffect(() => {
    setDataContainer(servicesTable)
  }, [searchInput]) 
 
 const handleSearchInput = (event) => {
  setSearchInput(event.target.value)
  //searchInput.length === 0 && setDataContainer(servicesTable)
}

const searchBtn = (event) => {
  event.preventDefault()
  let countrySearch

  if(selectItem === "id" || selectItem === "branches"){
    countrySearch = dataContainer.filter((item)=> item[selectItem] ===  parseInt(searchInput))
  } else if (selectItem === "status"){
    countrySearch = dataContainer.filter((item)=> item[selectItem] === (searchInput === 'true' ? true : false))
  }
 else {
    countrySearch = dataContainer.filter((item)=> item[selectItem] ===  searchInput)
  }
 setDataContainer(countrySearch)
  }

//Get current post
const indexOfLastPage = currentPage * postsPerPage
const indexOfFirstPage = indexOfLastPage - postsPerPage
const currentData = dataContainer.slice(indexOfFirstPage, indexOfLastPage)


//change page
const paginate = (pageNumber) => setCurrentPage(pageNumber)

return (
    <div className="App">
      <section className="navbar">
        <div class="container">
                <div class="row">
                   
                         <select onChange={(e)=>{
                            setSelectItem(e.target.value)
                         }}>
                           
                           <option value="id">ID</option>
                           <option value="service">Services</option>
                           <option value="trademark">Trademark</option>
                           <option value="branches">Branches</option>
                           <option value="country">Country</option>
                           <option value="status">Status</option>
                         </select>
                   
                   
                        <input type="search" placeholder="Search..." onChange={handleSearchInput}/>
                   
                    
                        
                        <button className='searchBtn' onClick={searchBtn}>Search</button>
                   
                </div>
          </div>
      </section>
     
      <section className="table">
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Trademark</th>
              <th>Branches</th>
              <th>Country</th>
              <th>St</th>
              <th>Action</th>
            </tr> 
          </thead>
  
          <tbody>
              {currentData.map( (i,index) => {
                  return <tr key={index}> 
                            <td>{i.id}</td>
                            <td>{i.service}</td>
                            <td>{i.trademark}</td>
                            <td>{i.branches}</td>
                            <td>{i.country}</td>
                            <td>{i.status ? <AiFillCheckCircle className="true-icon"/> : <AiFillMinusCircle className="false-icon"/>}</td>
                            <td className="action-column" key={index} onMouseOver={()=> setSelectedRow(index)} onMouseLeave={()=> setSelectedRow(null)}>
                            
                            <Modal   id={i.id} service={i.service} trademark={i.trademark} branches={i.branches} country={i.country} status={i.status}  
                              currentData={currentData} visible={visible} toggle={toggle}/>
                              {selectedRow === index && (
                              <button type="submit" onClick={toggle}> 
                                Edit
                              </button> 
                              )
                              
                            }
                            
                            {/* {jsonData.map((i,index)=>{
                              return (
                              <p>{i.id}</p>,
                              <p>{i.service}</p>,
                              <p>{i.trademark}</p>,
                              <p>{i.branches}</p>,
                              <p>{i.country}</p>
                              )
                            })} */}
                            {selectedRow === index && (
                              <div className="tooltip-container"> 
                                
                                <ReactTooltip />
                                <p className="tootip-text" data-type="info" place="top" data-tip="tooltip"><WiDirectionLeft /></p>
                              </div> 
                              )
                            }
                            
                            </td>
                          </tr>
              })} 
          </tbody>
    
        </table>
      </section>
    <div class="container">
        <div class="row">
          <div class="col">
          
          </div>
          <div class="col">
          <Pagination postsPerPage={postsPerPage} totalPosts={dataContainer.length}  paginate={paginate}  />
        
          </div>
          <div class="col">
          
          </div>
        </div>
      </div>
            
    </div> 
  );
}

export default App;
