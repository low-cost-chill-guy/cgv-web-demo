// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, createRef, useEffect } from "react";
import Avatars from "./Avatars";
// import "./SignIn.css"; // You can choose to keep this import or use the embedded styles

const SignIn = ({ handleSignIn }) => {
  const [username, setUsername] = useState("");
  const [moderator, setModerator] = useState(false);
  const [avatar, setAvatar] = useState({});
  const [loaded, setLoaded] = useState(false);
  const inputRef = createRef();

  useEffect(() => {
    setLoaded(true);
    inputRef.current.focus();
  }, [loaded]); // eslint-disable-line

  return (
    <>
      {/* Embedded CSS */}
      <style>
        {`
          /* CGV Theme CSS */
          :root {
            --cgv-red: #b30000;
            --cgv-dark-red: #b30000;
            --cgv-gold: #d4af37;
            --cgv-dark: #1a1a1a;
            --cgv-gray: #333333;
            --cgv-light-gray: #f1f1f1;
          }

          .cgv-container {
            background-color: var(--cgv-dark);
            color: white;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
            padding: 30px;
            max-width: 500px;
            width: 90%;
            border: 2px solid var(--cgv-red);
          }

          .cgv-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .cgv-title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
          }

          .cgv-logo {
            background-color: var(--cgv-red);
            color: white;
            font-weight: bold;
            font-size: 15px;
            padding: 5px 5px;
            border-radius: 4px;
            letter-spacing: 2px;
          }

          .cgv-form {
            width: 100%;
          }

          .cgv-section {
            margin-bottom: 20px;
          }

          .cgv-label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: var(--cgv-gold);
          }

          .cgv-input {
            width: 100%;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid var(--cgv-gray);
            background-color: var(--cgv-gray);
            color: white;
            font-size: 16px;
          }

          .cgv-input:focus {
            border-color: var(--cgv-red);
            outline: none;
            box-shadow: 0 0 0 2px rgba(188, 32, 23, 0.3);
          }

          .cgv-avatar-container {
            background-color: var(--cgv-gray);
            border-radius: 4px;
            padding: 15px;
            margin-top: 10px;
          }

          .cgv-avatar-grid {
            display: flex;
            // grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            gap: 10px;
          }

          .cgv-divider {
            height: 1px;
            background: linear-gradient(to right, transparent, var(--cgv-red), transparent);
            margin: 20px 0;
          }

          .cgv-checkbox-container {
            display: flex;
            align-items: center;
            margin: 10px 0;
          }

          .cgv-checkbox {
            margin-right: 10px;
            accent-color: var(--cgv-red);
          }

          .cgv-checkbox-label {
            color: white;
          }

          .cgv-button {
            background-color: var(--cgv-red);
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .cgv-button:hover {
            background-color: var(--cgv-dark-red);
          }

          .cgv-button:disabled {
            background-color: var(--cgv-gray);
            cursor: not-allowed;
          }

          .cgv-overlay {
            background-color: rgba(0, 0, 0, 0.8);
          }
        `}
      </style>

      <div className="modal pos-absolute top-0 bottom-0">
        <div className="modal__el cgv-container">
          <div className="cgv-header">
            <h1 className="cgv-title">라이브에 입장하세요!</h1>
            <div className="cgv-logo">CGV Premiere Live</div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="cgv-form"
          >
            <fieldset>
              <div className="cgv-section">
                <label htmlFor="name" className="cgv-label">
                  닉네임을 입력하세요
                </label>
                <input
                  name="name"
                  id="name"
                  ref={inputRef}
                  type="text"
                  className="cgv-input"
                  placeholder="Type here..."
                  autoComplete="off"
                  value={username}
                  onChange={(e) => {
                    e.preventDefault();
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="cgv-divider"></div>
              <div className="cgv-section">
                <div className="cgv-label">아바타를 선택하세요</div>
                <div className="cgv-avatar-container">
                  <div className="avatars pos-relative cgv-avatar-grid">
                    <Avatars
                      currentAvatar={avatar?.name}
                      handleAvatarClick={(avatar) => {
                        setAvatar(avatar);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="cgv-divider"></div>
              {/* <div className="cgv-checkbox-container">
                <input
                  type="checkbox"
                  id="moderator"
                  name="moderator"
                  className="cgv-checkbox"
                  checked={moderator}
                  onChange={(e) => {
                    setModerator(e.target.checked);
                  }}
                />
                <label htmlFor="moderator" className="cgv-checkbox-label">Join as moderator</label>
              </div>
              <div className="cgv-divider"></div> */}
              <button
                onClick={(e) => {
                  handleSignIn(username, moderator, avatar);
                }}
                className="cgv-button"
                disabled={!username}
              >
                라이브 입장하기
              </button>
            </fieldset>
          </form>
        </div>
        <div className="modal__overlay cgv-overlay"></div>
      </div>
    </>
  );
};

export default SignIn;
