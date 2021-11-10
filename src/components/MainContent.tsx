import React, { useEffect, useState } from "react";
import IEpisode from "./IEpisode";
import { numberCorrector } from "../utils/numberCorrector";
import { htmlTagRemover } from "../utils/htmlTagRemover";
import { showMySearch } from "../utils/showMySearch";

export function MainContent(): JSX.Element {
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [mySearch, setMySearch] = useState<string>("");
  const [mySelected, setMySelected] = useState<string>("");
  const [episodeToShow, setEpisodeToShow] = useState<IEpisode[]>(episodes);
  // Fetching data from API
  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch(
        "https://api.tvmaze.com/shows/22036/episodes"
      );
      const jsonBody: IEpisode[] = await response.json();
      setEpisodes(jsonBody);
      setEpisodeToShow(jsonBody);
    };
    fetchEpisodes();
  }, []);

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
        {props.image !== null && <img src={props.image.medium} alt="" />}
        <p>{htmlTagRemover(props.summary)}</p>
      </section>
    );
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
    setMySearch(""); // When the drop-down is used, set mySearch to an empty string
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
      <div className="grid-container">
        <EpisodeList />
      </div>
    </>
  );
}
