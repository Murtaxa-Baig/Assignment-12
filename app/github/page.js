"use client"
import React from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import style from '@/styles/github/github.module.css'

export default function Github() {

    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState('')
    const [followers, setFollowers] = useState([])
    const [err, setErr] = useState(null)
    const getUserData = async () => {
        try {
            let responce = await axios.get(`https://api.github.com/users/${userName}`)
            setUserData(responce.data)
            console.log("Console responce", responce.data);
            setUserName('')
            setErr(null)
            setFollowers([])
        }
        catch (error) {
            setErr('User name is invalid')
            setUserName('')
            setUserData(null)
            setFollowers([])
        }
    }
    const fecthUserFollowers = async () => {
        let responce = await axios.get(userData.followers_url)
        console.log(responce.data)
        setFollowers(responce.data)

    }
    console.log("foolower console", followers)

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
                {err && <p>{err}</p>} <br />
                <button
                    onClick={getUserData}
                    className={`mt-2 ${style.btn}`}
                >Search</button>
            </div>
            {
                userData &&

                <div className={style.displayDiv}>
                    <p><img src={userData?.avatar_url} alt="" className={style.profile_img} /></p>
                    <p>UserNAme: {userData?.login}</p>
                    <p>Name: {userData?.name}</p>
                    <p>Bio: {userData?.bio}</p>
                    <p><button
                        onClick={fecthUserFollowers}
                        className={style.follower_btn}
                    >Followers: </button>{userData?.followers}</p>
                    <p>Following: {userData?.following}</p>
                    <p>Public repo: {userData?.public_repos}</p>
                    <p>Created at: {userData?.created_at}</p>
                </div>
            }

            <div className='container mt-2'>
                <div className="row">
                    {
                        followers.length > 0 &&
                        followers.map((item, index) => {
                            return (
                                <>
                                    <div
                                        key={index}
                                        className={`col-md-2 col-sm-6 m-2 p-2 ${style.card}`}>
                                        <img src={item.avatar_url} alt="" className={style.followerImg} />
                                        <p className='mt-2'>{item.login}</p>
                                    </div>

                                </>
                            )
                        })
                    }
                </div>
            </div >

        </>
    )
}
