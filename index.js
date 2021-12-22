import { promises as fs } from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LATEST_IMAGES_YOUTUBE1 = "%{{latest_images_youtube1}}%";
const LATEST_IMAGES_YOUTUBE2 = "%{{latest_images_youtube2}}%";
const LATEST_IMAGES_YOUTUBE3 = "%{{latest_images_youtube3}}%";

async function handler() {
  try {
    const markdownTemplate = await fs.readFile("./README.md.tpl", {
      encoding: "utf-8",
    });

    const responseYoutube = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.CHANNELID}&maxResults=10&order=date&type=video&key=${process.env.API_KEY}`
    );

    const youtubeItems = responseYoutube.data.items;

    // YOUTUBE
    const youtubePost1 = `<a href="https://www.youtube.com/watch?v=${youtubeItems[0].id.videoId}" target='_blank'>
 <img width='30%' src="${youtubeItems[0].snippet.thumbnails.high.url}" alt="${youtubeItems[0].snippet.title}" />
</a>`;
    const youtubePost2 = `<a href="https://www.youtube.com/watch?v=${youtubeItems[1].id.videoId}" target='_blank'>
 <img width='30%' src="${youtubeItems[1].snippet.thumbnails.high.url}" alt="${youtubeItems[1].snippet.title}" />
</a>`;
    const youtubePost3 = `<a href="https://www.youtube.com/watch?v=${youtubeItems[2].id.videoId}" target='_blank'>
 <img width='30%' src="${youtubeItems[2].snippet.thumbnails.high.url}" alt="${youtubeItems[2].snippet.title}" />
</a>`;

    const newMarkdown = markdownTemplate
      // YOUTUBE
      .replace(LATEST_IMAGES_YOUTUBE1, youtubePost1)
      .replace(LATEST_IMAGES_YOUTUBE2, youtubePost2)
      .replace(LATEST_IMAGES_YOUTUBE3, youtubePost3);

    await fs.writeFile("./profile/README.md", newMarkdown);
  } catch (error) {
    console.log("Ocurrió un error " + error);
  }
}

handler();
