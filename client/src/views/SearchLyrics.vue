<template>
  <div>
    <cv-form @submit.prevent="search" class="search-form">
      <cv-search
        label="Search Lyrics"
        placeholder="Search for lyrics"
        @input="updateQuery">
      </cv-search>
      <span style="font-size:small">
        Powered by <a href="https://genius.com/">Genius</a>
      </span>

      <br><br>

      <span>
        <cv-button>Search</cv-button>
      </span>
    </cv-form>

    <br><br>

    <div class="search-results">
      <cv-loading
        class="loader"
        :active="isLoading"
        :overlay="true">
      </cv-loading>

      <div class="song" v-for="song of results" :key="song.result.id">
        <div class="song-thumb">
          <img :src="song.result.song_art_image_thumbnail_url" alt="thumb">
        </div>
        <div class="song-title">
          <h4>
            {{ song.result.full_title }}
          </h4>
          <div>
            by <a :href="song.result.primary_artist.url">
              {{ song.result.primary_artist.name }}
            </a>
          </div>
        </div>
        <div class="song-select">
          <cv-button @click="selectSong(song)" kind="secondary">
            Select
          </cv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiClient from '../ApiClient';

export default {
  name: "SearchLyrics",
  data() {
    return {
      query: '',
      results: [],
      isLoading: false
    }
  },
  methods: {
    updateQuery(q) {
      this.query = q;
    },
    async search() {
      this.isLoading = true;

      try {
        this.results = await ApiClient.search(this.query);
      } catch( ex ) {
        console.warn( ex );
      }

      this.isLoading = false;
    },
    selectSong( song ) {
      this.$router.push({
        name: 'practice',
        query: {
          songId: song.result.id
        }
      });
    }
  }
}
</script>

<style scoped>
  .search-form {
    margin: auto;
  }

  .search-results {
    position: relative;
  }

  .song {
    margin: auto;
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr 4fr 1fr;
    margin-bottom: 1em;
  }

  .song-thumb img {
    width: 150px;
  }

  .song-title * {
    text-align: left;
  }
</style>