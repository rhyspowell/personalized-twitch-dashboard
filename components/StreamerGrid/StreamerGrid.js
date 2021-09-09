import React from 'react'
import Image from 'next/image'
import styles from '../../styles/StreamerGrid.module.css'

const StreamerGrid = ({ channels }) => {
  return (
    <div>
      <p>Hello Streamer Grid</p>
    </div>
  )
}
//const StreamerGrid = ({ channels })

//const renderGridItem = channel => (
//  <div key={channel.id} className={styles.gridItem}>
//    <Image Layout="fill" src={channel.thumbnail_url} />
//    <div classname={styles.gridItemContent}>
//      <p>{channel.display_name}</p>
//      {channel.is_live && <p> Live Now!</p>}
//      {!channel.is_live && <p> Offline</p>}
//    </div>
//  </div>

//  return (
//    <div>
//      <h2>{`My Personal Twitch Dashboard`}</h2>
//      {channels.map(renderGridItem)}
//    </div>
//  )
//)



export default StreamerGrid