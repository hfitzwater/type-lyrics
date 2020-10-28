import axios from 'axios';

const defaultProtocol = 'http';
const defaultHost = process.env.API_HOST || `${defaultProtocol}://localhost`;
const defaultPort = process.env.API_PORT || 3000;
const baseURL = `${defaultHost}:${defaultPort}/`;

const client = axios.create({
  baseURL
});

export default class ApiClient {
  static async search( query ) {
    const songs = await client.get(`search/${query}`)
      .then(resp => resp.data.songs);

    return songs;
  }

  static async getSong( songId ) {
    const lines = await client.get(`song/${songId}`)
      .then(resp => resp.data.lines);
    
    return lines;
  }
}