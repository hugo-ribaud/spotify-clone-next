import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
    "from-orange-500",
    "from-teal-500",
    "from-gray-500",
    "from-cyan-500",
];

function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId]);

    useEffect(() => {
        spotifyApi
            .getPlaylist(playlistId)
            .then((data) => {
                setPlaylist(data.body);
            }).catch((err) => {
                console.log('Something went wrong!', err);
        })
    }, [spotifyApi, playlistId]);
    
    return (
        <div className="flex-grow h-screen overflow-y-scroll">
            <header className="absolute top-5 right-8">
                <div className="flex items-center p-[1px] pr-2 space-x-3 text-sm text-white bg-gray-900 rounded-full cursor-pointer hover:bg-gray-700 opacity-90 hover:opacity-80">
                    <img className="rounded-full w-7 h-7" src={session?.user.image} alt="profile picture" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon onClick={() => signOut()} className="w-5 h-5"/>
                </div>
            </header>

            <section className={`flex items-end space-x-7 h-80 bg-gradient-to-b to-black ${color} text-white p-8`}>
                <img className="shadow-2xl h-44 w-44" src={playlist?.images?.[0].url} alt="playlist picture" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">{playlist?.name}</h1>
                </div>
            </section>
            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center
