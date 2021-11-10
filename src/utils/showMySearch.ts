import IEpisode from "../components/IEpisode";

// Function: showMySearch
// Parameter: EPISODES - an array of all episodes
// Return: EPISODE_ARRAY - an array of episodes filtered by MY_SEARCH
export const showMySearch = (
  episodes: IEpisode[],
  mySearch: string,
  mySelected: string
): IEpisode[] => {
  const episodeArr = [];
  if (mySelected === "") {
    // Nothing selected fromt he drop-down list
    if (mySearch === "") {
      // Empty search bar
      return episodes;
    } else {
      // Search bar used
      for (const episode of episodes) {
        if (episode.name.toLowerCase().includes(mySearch.toLowerCase())) {
          episodeArr.push(episode);
        } else if (
          episode.summary.toLowerCase().includes(mySearch.toLowerCase())
        ) {
          episodeArr.push(episode);
        }
      }
      return episodeArr;
    }
  } else {
    // An episode is selected from the drop-down list
    const indexToShow: number = episodes.findIndex(
      (episode) => episode.name === mySelected
    );
    episodeArr.push(episodes[indexToShow]);
    return episodeArr;
  }
};
