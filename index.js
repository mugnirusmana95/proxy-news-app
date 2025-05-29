import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.get('/proxy/everything', async(req, res, next) => {
  try {
    const apiKey = 'apiKey=039951eb647844c68c63c400c86eeb36'
    const target_api = `https://newsapi.org/v2/`;
    const api = await axios({
      url:target_api + req.url?.replace('/proxy/','') + `&${apiKey}`,
      method: 'get',
    })
    return res.status(api?.status).send(api?.data);
  } catch (error) {
    return res.status(400).send({
        method: 'get',
        url: req.url,
        error
    })
  }
})

app.listen(4000, () => {
  console.log('Proxy server running on port 4000')
})