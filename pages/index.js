// Main entry point of your app
import React, { useState } from 'react'
import Head from 'next/head'
import StreamerGrid from '../components/StreamerGrid'
import styles from '../styles/Home.module.css'


const Home = () => {
  // State
  const [favouriteChannels, setFavouriteChannels] = useState([])
  
  // Actions
  const addStreamChannel = async event => {
    // Prevent the page from redirecting
    event.preventDefault()

    const { value } = event.target.elements.name

    if (value) {
      console.log("Value: ", value)

      //Call twitch search API
      const path = `https://${window.location.hostname}`
      console.log("call the api")
      const response = await fetch(`${path}/api/twitch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: value })
      })
      const json = await response.json()

      console.log("Jason Data: ", json)
      setFavouriteChannels(prevState => [...prevState, json.data])

      event.target.elements.name.value = ""
    }
    
  }

  // Render Methods
  const renderForm = () => (
    <div className={styles.formContainer}>
      <form onSubmit={addStreamChannel}>
        <input id="name" placeholder="Twitch channel Name" type="text" required />
        <button type="submit">Add Streamer</button>
      </form>
    </div>
  )


  return (
    <div className={styles.container}>
      <Head>
        <title>🎥 Personal Twitch Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.inputContainer}>
        {renderForm()}
        <StreamerGrid channels={favouriteChannels} setChannels={setFavouriteChannels} />
      </div>
    </div>
  )
}

export default Home