// Main entry point of your app
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import StreamerGrid from '../components/StreamerGrid'
import styles from '../styles/Home.module.css'


const Home = () => {
  // State
  const [favouriteChannels, setFavouriteChannels] = useState([])
  
  useEffect(() => {
    console.log("Fetching Channels...")
    fetchChannels()
  }, [])

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

      //set channel string in the Dashboard
      await setChannel(value)

      event.target.elements.name.value = ""
    }
    
  }

  const setChannel = async channelName => {
    try {
      const currentStreamers = favouriteChannels.map(channel => channel.display_name.toLowerCase())

      const streamerList = [...currentStreamers, channelName].join(",")

      const path = `https://${window.location.hostname}`

      const response = await fetch(`${path}/api/database`, {
        method: 'POST',
        body: JSON.stringify({
          key: 'CHANNELS',
          value: streamerList
        })
      })

      if (response.status === 200) {
        console.log(`Set ${channelName} in DB`)
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  const fetchChannels = async () => {
    try {
      const currentStreamers = favouriteChannels.map(channel => channel.display_name.toLowerCase())

      //const streamerList = [...currentStreamers, channelName].join(",")

      const path = `https://${window.location.hostname}`

      const response = await fetch(`${path}/api/database`, {
        method: 'POST',
        body: JSON.stringify({
          action: 'GET_CHANNELS',
          key: 'CHANNELS'
        })
      })
      console.log(response)
      if (response.status === 404) {
        console.log('Channels key could not be found')
      }

      const json = await response.json()

      if (json.data) {
        const channelNames = json.data.split(',')
        console.log('CHANNEL NAMES: ', channelNames)

        const channelData = []

        for await (const channelName of channelNames) {
          console.log("Getting twitch data for: ", channelName)

          const channelResp = await fetch(`${path}/api/twitch`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: channelName })
          })

          const json = await channelResp.json()

          if (json.data){
            channelData.push(json.data)
            console.log(channelData)
          }
        }

        setFavouriteChannels(channelData)
      }
    } catch (error) {
      console.warn(error.message)
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