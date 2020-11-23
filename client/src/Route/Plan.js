import React from 'react'
import Nav from '../Nav.js'
import { useParams } from 'react-router-dom'

export default function Plan() {
    const { id } = useParams();
    return (
        <div>
            <Nav />
            <div>{id}</div>
        </div>
    )
}
