'use client'
import React, { useRef } from 'react'
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube'


const YtPlayer = () => {

  const playerRef = useRef<YouTubePlayer | null>(null)

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {

    playerRef.current = event.target;
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      controls: 0,
    },
  };

  const pause = () => {
    if (playerRef.current != null) {
      playerRef.current.pauseVideo()
    }
  }
  
  const play = () => {
    if (playerRef.current != null) {
      playerRef.current.playVideo()
    }
  }


  return (

    <div className='bg-slate-500 p-10 flex justify-center'>

      <button className='px-4 py-2 bg-slate-300 m-2' onClick={(e) => {pause()}}>
        Pause
      </button>
      <button className='px-4 py-2 bg-slate-300 m-2' onClick={(e) => {play()}}>
        Play
      </button>

      <div className='p-4 bg-white'>
        <YouTube videoId="Q_ReXuz3xww" opts={opts} onReady={onPlayerReady} onPause={pause} />
      </div>
    </div>


  )
}

export default YtPlayer