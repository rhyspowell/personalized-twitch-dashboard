// Main entry point of your app
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home = () => {

    // Render Methods
    const renderForm = () => {
        <div className={styles.formContainer}>
            <form>
                <input id="name" placeholder="Twitch channel Name" type="text" required />
                <button type="submit">Add Streamer</button>
            </form>
        </div>
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>🎥 Personal Twitch Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.inputContainer}>
        {renderForm()}
      </div>
    </div>
  )
}

export default Home