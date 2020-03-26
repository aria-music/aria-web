import { stateContainer, playlistContainer } from './container'

export default {
  theme: localStorage.color ? localStorage.color : "pink lighten-2",
  searchData: {},
  // searchContents: localStorage.searchContents ? '' : localStorage.searchContents,
  playingData: stateContainer,
  playingTitle: "",
  nowState: "paused",
  queue: [],
  stopEvents: false,
  subQueue: false,
  playlists: playlistContainer,
  focusedPlaylist: {},
  focusedPlaylistName: "",
  volume: localStorage.volume ? Number(JSON.parse(localStorage.volume)) : 100,
  aria: undefined,
  ws: undefined,
  addr: 'aria.gaiji.pro'
}
