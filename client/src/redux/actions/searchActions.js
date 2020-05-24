import {
  loadMoreSoundcloudTracks,
  searchSoundcloudTracks
} from "./soundcloudActions";
import { loadMoreSpotifyTracks, searchSpotify } from "./spotifyActions";
import store from "../store";

export function setQuery(query) {
  return {
    type: "SET_QUERY",
    payload: query
  };
}

export function setTrackResults(source, tracks) {
  return {
    type: "SET_TRACK_RESULTS",
    source,
    payload: tracks
  };
}

export function setMoreTrackResults(source, tracks) {
  return {
    type: "SET_MORE_TRACK_RESULTS",
    source,
    payload: tracks
  };
}

export function setArtistResults(source, artists) {
  return {
    type: "SET_ARTIST_RESULTS",
    source,
    payload: artists
  };
}

export function addToSearchHistory(query) {
  return {
    type: "ADD_TO_SEARCH_HISTORY",
    payload: query
  };
}

export function removeFromSearchHistory(query) {
  return {
    type: "REMOVE_FROM_SEARCH_HISTORY",
    payload: query
  };
}

export const searchForMusic = query => dispatch => {
  const user = store.getState().user;
  const requests = [];

  if (user.soundcloud.isConnected) {
    requests.push(searchSoundcloudTracks);
  }

  if (user.spotify.isConnected) {
    requests.push(searchSpotify);
  }

  return Promise.all(requests.map(request => dispatch(request(query))));
};

export const loadMoreTrackResults = (source, next) => dispatch => {
  if (!next) return Promise.reject("No more results");

  if (source === "soundcloud") {
    return dispatch(loadMoreSoundcloudTracks(next));
  } else if (source === "spotify") {
    return dispatch(loadMoreSpotifyTracks(next));
  }
};
