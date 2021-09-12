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
        {channel.is_live && <p> Live Now!</p>}
        {!channel.is_live && <p> Offline</p>}
      </div>
    </div>
  )

  const removeChannelAction = channelId => () => {
    console.log("Removing channel...")
    setChannels(channels.filter(channel => channel.id != channelId))
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



export default StreamerGrid