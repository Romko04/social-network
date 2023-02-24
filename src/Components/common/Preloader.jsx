import React from "react";
import preloader from '../../img/preloader.gif'
import './Preloader.css'
const Preloader = (props) => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <img src={preloader} alt="preloader" className="preloader__img" />
            </div>
        </div>
    )
}
export default Preloader