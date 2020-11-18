import React from 'react'
import MainPage from '../MainPage.js'
import Plan from '../HomePage/Plans.js'
import Nav from '../Nav.js'
export default function Home() {
    return (
        <>
            <Nav />
            <div className="home-page-container">
                <MainPage />
                <Plan />
            </div>
        </>
    )
}
