import { downloadAndUploadImage } from "@/lib/s3";
import { insertWallpaper } from "@/models/wallpaper";
import { getOpenAIClient } from "@/services/openai"
import { Wallpaper } from "@/types/wallpaper";
import { ImageGenerateParams } from "openai/resources/images.mjs";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/types/user";
import { insertUser } from "@/models/user";
import { saveUser } from "@/services/user";

export const maxDuration = 60;

export async function POST(req: Request) {
    const {description} = await req.json();
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
        return Response.json({
            code: -2,
            message: "user not login",
        });
      }

    // save user
    const user_email = user.emailAddresses[0].emailAddress;
    const nickname = user.firstName;
    const avatarUrl = user.imageUrl;
    const userInfo: User = {
      email: user_email,
      nickname: nickname || "",
      avatar_url: avatarUrl,
    };

    await saveUser(userInfo);

    console.log("description: ", description);

    const client = getOpenAIClient();

    const img_size = "1792x1024";
    const llm_name = "dall-e-3";
    const llm_params: ImageGenerateParams = {
        prompt: `generate a desktop wallpaper about: ${description}`,
        model: llm_name,
        n: 1,
        quality: "hd",
        response_format: "url",
        size: img_size,
        style: "natural",
    };
    
    const result = await client.images.generate(llm_params);

    console.log("generate wallpaper result 0816: ", result);

    const raw_img_url = result.data[0].url;
    
    if (!raw_img_url) {
      return Response.json({
        code: -1,
        message: "generate wallpaper failed",
      });
    }

    const img_name = encodeURIComponent(description);
    const s3_img = await downloadAndUploadImage(
      raw_img_url,
      process.env.AWS_BUCKET || "aiwallpaper-shirley",
      `wallpapers/${img_name}.png`
    );
    
    const img_url = s3_img.Location;
    const created_at = (new Date()).toISOString();
    
    const wallpaper: Wallpaper = {
        user_email: user_email,
        img_description: description,
        img_size: img_size,
        img_url: img_url,
        llm_name: llm_name,
        llm_params: JSON.stringify(llm_params),
        created_at: created_at,
      };

      await insertWallpaper(wallpaper);
      console.log("insertWallpaper done");

    // return Response.json({
    //     code: 0,
    //     message: "ok",
    //     data: {
    //         img_url: "https://img1.baidu.com/it/u=4247035446,2400096902&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=640"
    //     }
    // })
    return Response.json({
        code: 0,
        message: "ok",
        data: wallpaper,
    })
}