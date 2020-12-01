import React from 'react'
import Facebook from './images/facebook.png'
import Instagram from './images/instagram.png'
import Twitter from './images/twitter.png'
import Youtube from './images/youtube.png'

export default function Footer() {
    return (
        <footer>
            <div className="follow-us">
                <p>Follow Us</p>
                <ul className="social-icon">
                    <li><a href="/"><img src={Facebook} alt="facebook" /></a></li>
                    <li><a href="/"><img src={Instagram} alt="Instagram" /></a></li>
                    <li><a href="/"><img src={Twitter} alt="Twitter" /></a></li>
                    <li><a href="/"><img src={Youtube} alt="Youtube" /></a></li>
                </ul>
            </div>
            <div className="copy-right">
                Copyright © 2020 JeffDevsLife. All Rights Reserved
            </div>
        </footer>

    )
}
