/*import React, { useState, useEffect } from "react";
import "./Videoconferencias.css";
import { useNavigate } from "react-router-dom";
import conf from "../imagen/Virtual-Meeting.webp";
import { FaCopy } from "react-icons/fa";

const Videoconferencias = () => {
  const [RoomCode, setRoomCode] = useState("");
  const [generatedRoomCode, setGeneratedRoomCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Generar un RoomCode automáticamente al cargar el componente
    const generateRoomCode = () => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setGeneratedRoomCode(code);
    };
    generateRoomCode();
  }, []);

  const submitCode = (e) => {
    e.preventDefault();
    navigate(`/room/${RoomCode}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRoomCode).then(() => {
      alert("Room code copied to clipboard!");
    });
  };

  return (
    <>
      <div className="log-videocall">
        

        <form action="" onSubmit={submitCode}>
          <label className="label">Enter the room code</label>
          <input
            className="input"
            type="text"
            required
            placeholder="Enter the room code"
            value={RoomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button type="submit" className="button-sb-code">
            Enter Room
          </button>


          <div className="generated-code-container">
          <label className="label">Generated Room Code</label>
          <div className="input-container">
            <input
              className="input"
              type="text"
              value={generatedRoomCode}
              readOnly
            />
            <FaCopy className="copy-icon" onClick={copyToClipboard} />
          </div>
        </div>
        </form>

        
        

        
        <div className="img">
          <img src={conf} alt="Conference" />
        </div>
      </div>
    </>
  );
};

export default Videoconferencias;*/

import React, { useState } from "react";
import "./Videoconferencias.css";
import { useNavigate } from "react-router-dom";
import conf from "../imagen/Virtual-Meeting.webp";
import { FaCopy } from "react-icons/fa";

const Videoconferencias = () => {
  const [RoomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const submitCode = (e) => {
    e.preventDefault();
    navigate(`/room/${RoomCode}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RoomCode).then(() => {
      alert("Room code copied to clipboard!");
    });
  };

  return (
    <>
      <div className="log-videocall">
        

        <form action="" onSubmit={submitCode}>
          <label className="label">Enter the room code</label>
          <input
            className="input"
            type="text"
            required
            placeholder="Enter the room code"
            value={RoomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button type="submit" className="button-sb-code">
            Enter Room
          </button>

          
        </form>

       
        <div className="img">
          <img src={conf} alt="Conference" />
        </div>
      </div>
    </>
  );
};

export default Videoconferencias;

