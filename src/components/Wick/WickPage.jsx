import React from 'react'
import './WickPage.css'


const WickPage = () => {
  return (
    <>
    <div className="banner">
        <div className="content">
            <div className="thenav">
              <div className='bar'>
                <div className="logo-container">
                <img src="/Logo-light.png" alt="" />
                </div>

                <ul className="nav-links">
                    <li>Home</li>
                    <li>Pricing</li>
                    <li>Movies</li>
                    <li>Series</li>
                    <li>Collection</li>
                    <li>FAQ</li>
                </ul>


                <div className="icon-container">
                     <div className="search">
                     <img src="/search.png" alt="" />
                     </div>
                     <div className="bells">
                     <img src="/bells.png" alt="" />
                     </div>
                     <div className="user">
                     <img src="/user.png" alt="" />
                     </div>
                     <div className="sun">
                     <img src="/sun.png" alt="" />
                     </div>
                </div>
              </div>
            </div>
            <div className="thecontent"></div>
        </div>
    </div>
    </>
  )
}

export default WickPage