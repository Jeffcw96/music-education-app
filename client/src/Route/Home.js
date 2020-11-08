import React from 'react'
import MainPage from '../MainPage.js'
import Plan from '../HomePage/Plans.js'
export default function Home() {
    return (
        <div className="home-page-container">
            <MainPage />
            <Plan />
        </div>
    )
}
