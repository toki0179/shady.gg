// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import { searchMusics } from 'node-youtube-music'
import ytdl from 'ytdl-core'
import { createWriteStream } from 'fs'

export default async function handler(request, response) {
    let res = await axios.get('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=toki0179&api_key=4c595110de5bc5862d20ec534ea6c73f&format=json')
    let track = res.data.recenttracks.track[0]
    let artist = track.artist['#text']
    let music = await searchMusics(`${track.name} by ${artist}`)
    let youtubeID = music[0].youtubeId

    // get video audio stream
    let stream = ytdl(`https://www.youtube.com/watch?v=${youtubeID}`, {
        filter: 'audioonly',
        quality: 'highestaudio'
    }).pipe(createWriteStream('public/audio.mp3')) 

    response.status(200).json({ track, artist })
  }