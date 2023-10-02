"use client"
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import style from '@/styles/github/github.module.css'

export default function Github() {

    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState('')
    const [err, setErr] = useState(null)
    const getUserData = async () => {
        try {
            let responce = await axios.get(`https://api.github.com/users/${userName}`)
            setUserData(responce.data)
            console.log("Console responce", responce.data);
            setUserName('')
            setErr(null)
        }
        catch (error) {
            setErr('User name is invalid')
            setUserName('')
            userData(null)
        }
    }

    return (
        <>
            <div className={style.main}>
                <h1>
                    Enter Github userName
                </h1>
                <input
                    type='text'
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    className={style.inputField}
                />
                {err && <p>{err}</p> }
                <h1>
                    <button
                        onClick={getUserData}
                        className={style.btn}
                    >Click for detail</button>
                </h1>
            </div>
            {
                userData &&

                <div className={style.displayDiv}>
                    <p>UserNAme: {userData?.login}</p>
                    <p>Name: {userData?.name}</p>
                    <p>Followers: {userData?.followers}</p>
                    <p>Following: {userData?.following}</p>
                    <p>Public repo: {userData?.public_repos}</p>
                    <p>Created at: {userData?.created_at}</p>
                </div>
            }
        </>
    )
}
