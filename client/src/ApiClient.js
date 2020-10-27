import axios from 'axios';

const defaultPort = 3000;
const defaultHost = 'localhost';
const defaultProtocol = 'http';
const baseURL = `${defaultProtocol}://${defaultHost}:${defaultPort}/`;

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