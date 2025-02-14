'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Coordinates {
  x: string;
  y: string;
}

export default function Home() {
  const [image, setImage] = useState(false);
  const [coord, setCoords] = useState<Coordinates | null>(null);
  const [coordYes, setYesCoords] = useState<Coordinates | null>(null);

  const [response, setResponse] = useState('No');
  const [responseYes, setYesResponse] = useState('Yes');

  const timerId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {

        //Creating a timeout
        timerId.current = setTimeout(() => {
            setYesResponse("Yes");
        }, 5000);
        

        return () => {
            //Clearing a timeout
            timerId.current ? clearTimeout(timerId.current) : null;
        };
    }, [responseYes]);

  const handleNoBtn = () => {
    const x = Math.random() * 60;
    const y = Math.random() * 60;

    setCoords({ x: `${x}%`, y: `${y}%` });

    const phrases = [
      "Wrong button ❌",
      "Are you sure 🤔?",
      "But what if 🫣?",
      "You're breaking my heart 💔",
      "Pwetty please 🥺👉👈",
      "Can't catch up? 😂"
    ]

    const randomIndex = Math.floor(Math.random() * phrases.length);
    setResponse(phrases[randomIndex]);
  }


  const handleYesBtn = () => {
    const x = Math.random() * 60;
    const y = Math.random() * 60;

    setYesCoords({ x: `${x}%`, y: `${y}%` });

    const phrases = [
      "❓????????❓",
      "⬆️ Raise your standards ⬆️",
      "I'm suprised you are seeing this 😧",
      "I'm not sure what you're doing 🤷",
      "You're not supposed to be here 🤷",
      "You can do better than this 😂",
      "Don't settle for less 🤨",
    ]

    const randomIndex = Math.floor(Math.random() * phrases.length);
    setYesResponse(phrases[randomIndex]);

    // setImage(!image);
  }

  return (
    <div className="container">
      <section>
        <div>
          <p>♡ Will you be my ACM Valentine? ♡</p>
        </div>
        <div className="img-container">
          {image ? (
            <Image src="/heppi.gif" alt="cat spinning with sparkles" width={270} height={200} className="cat" />

          ) : (
            <Image src="/please.gif" alt="two animals asking each other to be their valentine gif" width={340} height={200} priority />
          )}
        </div>
        <div className="button-section">
          <Link href='/success'>
            <button
              className="yes-button button-base button-green"
              onMouseOver={handleYesBtn} onMouseOut={handleYesBtn}
              style={coordYes ? { position: 'absolute', top: coordYes.x, right: coordYes.y } : undefined}
            >
              {responseYes}
            </button>
          </Link>
          <button className='no-button button-base button-red' style={coord ? { position: 'absolute', top: coord.x, right: coord.y } : undefined}
            onClick={handleNoBtn} onMouseOver={handleNoBtn}
          >{response}</button>
        </div>
      </section>
    </div >
  );
}
