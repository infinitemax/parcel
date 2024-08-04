"use client";
import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

const YtPlayer = () => {
  const playerRef = useRef<YouTubePlayer | null>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      controls: 0,
      rel: 0,
    },
  };

  const pause = () => {
    if (playerRef.current != null) {
      playerRef.current.pauseVideo();
    }
  };

  const play = () => {
    if (playerRef.current != null) {
      playerRef.current.playVideo();
    }
  };

  const [videoId, setVideoId] = useState<string>("Q_ReXuz3xww");
  const [videoUrl, setVideoUrl] = useState<string>("");

  const getVideoId = (url: string) => {
    const idArray = url.split("v=");

    const initialId = idArray[idArray.length - 1];

    const secondIdArray = initialId.split("&t=");

    setVideoId(secondIdArray[0]);
  };

  // set video play time

  const [minMusicTime, setMinMusicTime] = useState<number>(0);

  const [maxMusicTime, setMaxMusicTime] = useState<number>(0);

  const randomIntFromInput = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const printRandom = () => {
    console.log(randomIntFromInput(minMusicTime, maxMusicTime));
  };

  const passTheParcel = () => {
    const randomTime = randomIntFromInput(minMusicTime, maxMusicTime);

    console.log("duration will be: ", randomTime);

    const durationInMilliseconds = randomTime * 1000;
    play();
    setTimeout(() => {
      pause();
    }, durationInMilliseconds);
  };

  return (
    <div className="bg-slate-500 p-10 flex flex-col justify-center">
      <div className="flex flex-row gap-4 align-middle my-4">
        <label className="text-slate-100">YouTube url:</label>
        <input
          className="w-full p-2 bg-slate-200 rounded-md caret-pink-500"
          placeholder="Enter YouTube link..."
          onChange={(e) => setVideoUrl(e.target.value)}
        ></input>
        <button
          className="rounded-md bg-green-200 px-4 h-10"
          onClick={() => {
            getVideoId(videoUrl);
          }}
        >
          GO!
        </button>
      </div>

      <div className={`p-4 bg-white w-${opts.width} flex justify-center`}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onPause={pause}
        />
      </div>
      <div className="flex flex-row justify-center">
        <button
          className="px-4 py-2 bg-slate-300 m-2"
          onClick={(e) => {
            pause();
          }}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-slate-300 m-2"
          onClick={(e) => {
            play();
          }}
        >
          Play
        </button>
        <button
          className="px-4 py-2 bg-slate-300 m-2"
          onClick={(e) => {
            passTheParcel();
          }}
        >
          Pass the Parcel!
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="time-input">
          Minimum music:{" "}
          <input
            id="time-input"
            type="number"
            value={minMusicTime}
            onChange={(e) => {
              setMinMusicTime(parseInt(e.target.value));
            }}
          ></input>
        </label>
        <label htmlFor="time-input">
          Maximum music:{" "}
          <input
            id="time-input"
            type="number"
            value={maxMusicTime}
            onChange={(e) => {
              setMaxMusicTime(parseInt(e.target.value));
            }}
          ></input>
        </label>
        <button
          onClick={() => {
            printRandom();
          }}
        >
          Print random
        </button>
      </div>
    </div>
  );
};

export default YtPlayer;
