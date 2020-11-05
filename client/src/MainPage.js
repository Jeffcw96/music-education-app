import React from 'react'
import Main from './main.jpg'
import Nav from './Nav.js'


export default function MainPage() {
    const specialCharOne = {
        color: '#e74c3c',
        fontSize: '2.8rem'
    }
    const specialCharThree = {
        color: "#f1c40f",
        fontSize: '2.5rem'
    }

    const specialCharLast = {
        color: "#00cec9",
        fontSize: '2.5rem'
    }

    return (
        <div className="main-section section">
            <Nav />
            <div className="main-container">
                <div className="main-img">
                    <img src={Main} alt="main photo" ></img>
                </div>
                <div className="main-desp">
                    <h1><span style={specialCharOne}>L</span>earn your <span className="icon">🎶</span><br /><span >F</span>avour𝄞te mus𝄞c <span style={specialCharThree}>𝄞</span>nstrument <br /><span style={specialCharLast}>W</span>𝄞th our <span style={specialCharLast}>S</span>erv𝄞ce Today !!</h1>
                    <ul className="instructment-icon">
                        <li>🎹</li>
                        <li>🎻</li>
                        <li>🎷</li>
                        <li>🎺</li>
                        <li>🎸</li>
                        <li>🥁</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
