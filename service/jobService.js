const axios = require("axios");
const redis = require("redis");

const client = redis.createClient({
  url: "redis://localhost:6379",
  socket: {
    connectTimeout: 5000,
  },
});

client.connect().catch((err) => console.log(err));

const getJobs = async (req, res) => {
  const searchTerm = req.query.search;

  try {
    const comments = await client.get(searchTerm);

    if (comments)
      res
        .status(200)
        .send({ message: "success from cache", data: JSON.parse(comments) });
    else {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${searchTerm}`
      );
      client.setEx(searchTerm, 600, JSON.stringify(response.data));
      res
        .status(200)
        .send({ message: "success from api", data: response.data });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getJobsPost = async (req, res) => {
  const searchTerm = req.query.search;
  try {
    const posts = await client.get(searchTerm);

    if (posts)
      res
        .status(200)
        .send({ message: "success from cache", data: JSON.parse(posts) });
    else {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${searchTerm}`
      );
      client.setEx(searchTerm, 600, JSON.stringify(response.data));
      res
        .status(200)
        .send({ message: "success from api", data: response.data });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getJobsAlbum = async (req, res) => {
  const searchTerm = req.query.search;

  try {
    const album = await client.get(searchTerm);

    if (album)
      res
        .status(200)
        .send({ message: "success from cache", data: JSON.parse(album) });
    else {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?userId=${searchTerm}`
      );
      client.setEx(searchTerm, 600, JSON.stringify(response.data));
      res
        .status(200)
        .send({ message: "success from api", data: response.data });
    }
  } catch {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { getJobs, getJobsPost, getJobsAlbum };
