import { getWallpapers } from "@/models/wallpaper";

export async function GET(req: Request) {
    console.log("into get wallpapers");
    const wallpapers = await getWallpapers(1, 1);
    console.log("get wallpapers:", wallpapers);
    return Response.json({
        code: 0,
        message: "ok",
        data: wallpapers,
    });
}