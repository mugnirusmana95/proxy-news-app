import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.get('/proxy/everything', async (req, res) => {
  try {
    const apiKey = 'apiKey=039951eb647844c68c63c400c86eeb36';
    const target_api = 'https://newsapi.org/v2/';
    const apiUrl = `${target_api}${req.url.replace('/proxy/', '')}${req.url.includes('?') ? '&' : '?'}${apiKey}`;
    
    const response = await axios({
      url: apiUrl,
      method: 'get',
    });
    
    return res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Failed to fetch data from News API',
      details: error.message
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;