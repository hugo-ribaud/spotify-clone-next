import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log('You picked the playlist : ', playlistId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div>
      <div className='h-screen p-5 space-y-4 overflow-y-scroll text-xs text-gray-500 border-r border-gray-900 scrollbar-hide lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] md:inline hidden pb-36'>
        <button className='flex items-center pl-2 space-x-2 hover:text-white'>
          <HomeIcon className='w-5 h-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center pl-2 space-x-2 hover:text-white'>
          <SearchIcon className='w-5 h-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center pl-2 space-x-2 hover:text-white'>
          <LibraryIcon className='w-5 h-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        <button className='flex items-center pl-2 space-x-2 hover:text-white'>
          <PlusCircleIcon className='w-5 h-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center pl-2 space-x-2 hover:text-white'>
          <HeartIcon className='w-5 h-5 text-blue-500' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center pl-2 space-x-2 hover:text-white'>
          <RssIcon className='w-5 h-5 text-green-500' />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        {/*Playlist*/}
        {playlists.map((playlist) => (
            <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='pl-2 cursor-pointer hover:text-white'>{playlist.name}</p>
        ))}
       
      </div>
    </div>
  );
}

export default Sidebar;
