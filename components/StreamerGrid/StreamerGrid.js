import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from '../../styles/StreamerGrid.module.css'

const StreamerGrid = ({ channels }) => {
  //render method
  const renderGridItem = channel => (
    <div key={channel.id} className={styles.gridItem}>
      <button onClick={removeChannelAction(channel.id)}>X</button>
      <Image layout="fill" src={channel.thumbnail_url} />
      <div className={styles.gridItemContent}>
        <p>{channel.display_name}</p>
        {channel.is_live && <p>❤️ Live Now!</p>}
        {!channel.is_live && <p>😭 Offline</p>}
      </div>
    </div>
  )

  const removeChannelAction = channelId => async () => {
    console.log("Removing channel with channel ID: ", channelId)

    const filteredChannels = channels.filter(channel => channel.id != channelId)

    setChannels(filteredChannels)

    const joinedChannels = filteredChannels.map(channel => channel.display_name.toLowerCase()).join(",")

    await setDBChannels(joinedChannels)
  }

  const renderNoItems = () => (
    <div className={styles.gridNoItems}>
    <p>Add a streamer and get to see thier beauty here</p>
    </div>
  )

  // useEffects
  useEffect(() => {
    console.log('Channels: ', channels)
  }, [channels])
  
  return (
    <div>
      <h2>{`My Personal Twitch Dashboard`}</h2>
      {channels.length > 0 && channels.map(renderGridItem)}
      {channels.length === 0 && renderNoItems()}
    </div>
  )
}

const setDBChannels = async channels => {
  try {
    const path = `https://${window.location.hostname}`

    const response = await fetch(`${path}/api/database`, {
      method: 'POST',
      body: JSON.stringify({
        key: `CHANNELS`,
        value: channels
      })
    })

    if (response.status === 200) {
      console.log(`Set ${channels} in DB.`)
    }
  } catch (error) {
    console.warn(error.message)
  }
}

export default StreamerGrid