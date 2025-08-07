import axios from 'axios'
const apiKey = process.env.YOUTUBE_API

export async function getYouTubeData(videoId: string) {
   const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`

   try {
      const response = await axios.get(apiUrl)
      const item = response.data.items[0]

      if (item) {
         const title = item.snippet.title
         const thumbnails = item.snippet.thumbnails // Contains various thumbnail sizes (default, medium, high, etc.)
         return { title, thumbnails }
      } else {
         return null // Video not found
      }
   } catch (error: any) {
      console.error('Error fetching YouTube data:', error.message)
      return null
   }
}
