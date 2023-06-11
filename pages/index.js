import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import axios from 'axios'
import { searchMusics } from 'node-youtube-music'
import config from '@/config.json'

const inter = Inter({ subsets: ['latin'] })

export default function Shady({
    track,
    artist,
    youtubeID,
    youtubeLink
})
{
  return (
    <>
      <Head>
        <title>Shady</title>
        <meta name="description" content="Hey there, I'm a full stack developer!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://feds.ventryshield.net/?url=https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Furbanlegendsonline.com%2Fwp-content%2Fuploads%2F2019%2F02%2Fthe_shadowy_hat.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet"></link>
        <Script src="/setWidth.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js" integrity="sha512-pumBsjNRGGqkPzKHndZMaAG+bir374sORyzM3uulLV14lN5LyykqNk8eEeUlUkB3U0M4FApyaHraT65ihJhDpQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      </Head>
      <main className={styles.profileBackground}>
        <div>
          <div className={styles.main}>
          <img id="profile" className={styles.profile} src="https://feds.ventryshield.net/?url=https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Furbanlegendsonline.com%2Fwp-content%2Fuploads%2F2019%2F02%2Fthe_shadowy_hat.jpg" />
            <div className={styles.profileContainer}>
                <h1>Shady</h1>
                <h3 className={styles.quoteText}>“You can be the ripest, juiciest peach in the world, and there's still going to be somebody who hates peaches.”</h3>
                <h3 className={styles.quoteAuthor}>― Dita Von Teese</h3>
                <h3 className={styles.quoteText}>Shady's Listening to: <code id="track-name" className={styles.code}>{track.name} by {artist}</code></h3>
                <h3>Listen to at: <a className={styles.linkButton} href={youtubeLink}>YouTube</a></h3>
            </div>
            <div id="buttons" className={styles.buttons}>
                <a className={styles.button} href="https://discord.gg/ftx" target="_blank"><img className={styles.icon} src="/discord-mark-blue.svg" />Discord</a>
                <a className={styles.button} href="https://github.com/toki0179/" target="_blank"><img className={styles.icon} src="/github-mark-white.svg" />Github</a>
                <a className={styles.button} href="https://www.youtube.com/@Toki-on9ju" target="_blank"><img className={styles.icon} src="/youtube.svg" />YouTube</a>
                <a className={styles.button} href="https://twitter.com/toki0279" target="_blank"><img className={styles.icon} src="/twitterBlue.svg" />Twitter</a>
            </div>
          </div>
        </div>
        {/* <iframe id="audio" src='http://localhost:3000/audio.mp3' width="0" height="0" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
        <script src="/autoUpdate.js"></script> */}
      </main>
    </>
  )
}

export async function getStaticProps() {
  let res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=toki0179&api_key=${config.apiKey}&format=json`)
  let track = res.data.recenttracks.track[0]
  let artist = track.artist['#text']
  let music = await searchMusics(`${track.name} by ${artist}`) 
  let youtubeID = music[0].youtubeId 
  let youtubeLink = `https://www.youtube.com/watch?v=${youtubeID}`

  return {
      props: {
          track,
          artist,
          youtubeID,
          youtubeLink
      },

      revalidate: 60
  }
}