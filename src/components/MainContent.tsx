import React, { useState } from "react";
import IEpisode from "./IEpisode";
import episodes from "../episodes.json";
import { numberCorrector } from "../utils/numberCorrector";
import { htmlTagRemover } from "../utils/htmlTagRemover";

export function MainContent(): JSX.Element {
  const [mySearch, setMySearch] = useState<string>("");
  const [mySelected, setMySelected] = useState<string>("");
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
            setEpisodeToShow(
              showMySearch(episodes, e.target.value, mySelected)
            );
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
  const showMySearch = (
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
  const EpisodeList = (): JSX.Element => {
    return (
      <>
        {episodeToShow.map(
          (episode: IEpisode): JSX.Element => EpisodeItem(episode)
        )}
      </>
    );
  };

  // Function: DropDownItem (to create a drop-down item)
  // Parameter: EPISODE - type IEpisode
  // Return: Option JSX Element
  const DropDownItem = (episode: IEpisode): JSX.Element => {
    return (
      <option value={episode.name} key={episode.id}>
        S{numberCorrector(episode.season)}E{numberCorrector(episode.number)} -{" "}
        {episode.name}
      </option>
    );
  };
  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setMySearch("");
    if (e.target.value === "Choose from a drop-down list") {
      setMySelected("");
      setEpisodeToShow(episodes);
    } else {
      setMySelected(e.target.value);
      setEpisodeToShow(showMySearch(episodes, "", e.target.value));
    }
  };
  const DropDownList = (): JSX.Element => {
    return (
      <>
        <select onChange={handleSelection} value={mySelected}>
          <option>Choose from a drop-down list</option>
          {episodes.map(DropDownItem)}
        </select>
        <button
          onClick={() => {
            setEpisodeToShow(episodes);
            setMySearch("");
            setMySelected("");
          }}
        >
          See all episodes
        </button>
      </>
    );
  };

  // console.log for debugging
  console.log("My search is:", mySearch);
  console.log("MY selection is:", mySelected);
  console.log("There are ", episodeToShow.length, " matching searches.");

  return (
    <>
      <DropDownList />
      <br></br>
      <br></br>
      <SearchBar />
      <EpisodeList />
    </>
  );
}
