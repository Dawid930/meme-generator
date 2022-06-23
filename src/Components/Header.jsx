import React from "react"
import image from "../Images/troll-face.png"

export default function Header() {
    return (
        <header className="header">
            <img 
                src= {image}
                className="header--image"
                alt="trollface"
            />
            <h2 className="header--title">My Meme Generator</h2>

        </header>
    )
}