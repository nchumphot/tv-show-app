import { useState } from "react";
import IEpisode from "./IEpisode";
import episodes from "../episodes.json";
import { numberCorrector } from "../utils/numberCorrector";
import { htmlTagRemover } from "../utils/htmlTagRemover";

export function MainContent(): JSX.Element {
  const [mySearch, setMySearch] = useState<string>("");
  const [episodeToShow, setEpisodeToShow] = useState<IEpisode[]>(episodes);
  const SearchBar = (): JSX.Element => {
    return (
      <>
        <input
          type="search"
          value={mySearch}
          placeholder="Search"
          onChange={(e) => {
            setMySearch(e.target.value);
            setEpisodeToShow(showMySearch(episodes,e.target.value));
          }}
        />
        <p>
          Displaying {episodeToShow.length}/{episodes.length} episodes
        </p>
      </>
    );
  };
  const EpisodeItem = (props: IEpisode): JSX.Element => {
    return (
      <section key={props.id}>
        <h2>
          {props.name} - S{numberCorrector(props.season)}E
          {numberCorrector(props.number)}
        </h2>
        <img src={props.image.medium} alt="" />
        <p>{htmlTagRemover(props.summary)}</p>
      </section>
    );
  };
  // Function: showMySearch
  // Parameter: EPISODES - an array of all episodes
  // Return: EPISODE_ARRAY - an array of episodes filtered by MY_SEARCH
  const showMySearch = (episodes: IEpisode[], mySearch: string): IEpisode[] => {
    const episodeArr = [];
    if (mySearch === "") {
      return episodes;
    } else {
      for (const episode of episodes) {
        if (episode.name.toLowerCase().includes(mySearch.toLowerCase())) {
          episodeArr.push(episode);
        } else if (
          episode.summary.toLowerCase().includes(mySearch.toLowerCase())) {
          episodeArr.push(episode);
        }
      }
      return episodeArr;
    }
  };
  const EpisodeList = (): JSX.Element => {
    return (
      <>
        {episodeToShow.map(
          (episode: IEpisode): JSX.Element => EpisodeItem(episode)
        )}
      </>
    );
  };

  // console.log for debugging
  console.log("My search is:", mySearch);
  console.log("There are ", episodeToShow.length, " matching searches.");

  return (
    <>
      <SearchBar />
      <EpisodeList />
    </>
  );
}
