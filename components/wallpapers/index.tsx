"use client";

import { Wallpaper } from "@/types/wallpaper";
import { useState } from "react";
import { useEffect } from "react";


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
    // <section className="max-w-6xl mx-auto">
    //     <WallpaperList />
    // </section>
    <section>
  <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
    <div className="mb-8 text-center md:mb-12">
    <h2 className="text-3xl font-bold md:text-5xl">全部壁纸</h2>
    <p className="mt-4 text-[#636262] sm:text-sm md:text-base">
        一共100条由 AI 生成的壁纸
    </p>
    </div>
    <ul className="mb-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:mb-16">
        {wallpapers&&
        wallpapers.map((wallpaper:Wallpaper, idx:number)=>{
            return (
                <li className="grid gap-8 border border-solid border-[#dfdfdf] bg-white p-8 md:p-10">
                <img src={wallpaper.img_url} alt=""/>

                    <div className="flex w-full flex-col items-start gap-5 p-0">
                        <div>{wallpaper.img_description}</div>
                        <div className="flex">
                            <img src={wallpaper.user_avatar} alt="" className="mr-4 h-10 w-10" />
                            <div className="flex flex-col">
                                <h6 className="font-bold">{wallpaper.user_nickname}</h6>
                                <p className="text-sm text-[#636262]">{wallpaper.img_size}</p>
                            </div>
                        </div>
                    </div>
                 </li>
            );
        })}
    </ul>
    <a href="#" className="flex justify-center font-bold text-black">Check all reviews</a>
  </div>
</section>
    );
}
