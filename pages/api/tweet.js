import { Client } from "twitter-api-sdk";
const client = new Client(process.env.NEXT_PUBLIC_BEARER_TOKEN);

export default async function handler(req, res) {
  console.log(req.query, req.params)
  if (req.method === "GET") {
    const params = {
      "tweet.fields": "author_id",
      expansions: "author_id",
      "user.fields": "created_at,profile_image_url,name,username",
    };
    const tweet = await client.tweets.findTweetById(
      req?.query?.id,
      params
    );
    console.log(tweet.data.text);
    res.status(200).json(tweet);
  }
}
