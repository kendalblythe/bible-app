import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.scripture.api.bible/v1',
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json',
    'api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
});
