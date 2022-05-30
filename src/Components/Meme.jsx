import React, { useCallback, useEffect, useRef, useState } from "react"
import downloadjs from "downloadjs"
import html2canvas from "html2canvas"
import image from "../Images/troll-face.png"


export default function Meme() {

    const memeImg = useRef(null)

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = useState([])
    

    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }


    const handleCaptureClick = useCallback(async () => {
        const canvas = await html2canvas(memeImg.current, {allowTaint : true, useCORS : true})
        const dataURL = canvas.toDataURL('image/jpg')
        downloadjs(dataURL, 'download.jpg', 'image/jpg')
    }, [])
    

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme" ref={memeImg}>
                <img name='memeimg' src={meme.randomImage} className="meme--image" alt="memeimg"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <div className="downloadButton">
                <button
                    className="download--button"
                    onClick={handleCaptureClick}>
                    Download meme
                </button>
            </div>
            <div className="disclaimer">
                <p>Pictures are provided by third party (https://imgflip.com). I do not take any resposibility for security related risks.</p>
                <img src= {image} className="disclaimer--trollface" alt="trollface"/>
            </div>
        </main>
    )
}
