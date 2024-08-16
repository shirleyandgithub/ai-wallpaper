"use client";

import { Wallpaper } from "@/types/wallpaper";
import { useState } from "react";
import { useEffect } from "react";
import WallpaperList from "./WallpaperList";

interface Props {
    wallpapers: Wallpaper[];
}

export default function({ wallpapers }: Props) {
    // const [wallpapers, setWallpapers] = useState <Wallpaper[] | null>(null);
    // const fetchWallpapers = async function () {
    //     const result = await fetch("/api/get-wallpapers");
    //     const {data} = await result.json();

    //     if(data) {
    //         setWallpapers(data);
    //     }
    // };

    // useEffect(() => {
    //     fetchWallpapers();
    // }, []);

    
    return (
    <section className="max-w-6xl mx-auto">
        <WallpaperList />
    </section>
    );
}
