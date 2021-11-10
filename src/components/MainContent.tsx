import React, { useEffect, useState } from "react";
import IEpisode from "./IEpisode";
import { numberCorrector } from "../utils/numberCorrector";
import { htmlTagRemover } from "../utils/htmlTagRemover";

export function MainContent(): JSX.Element {
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [mySearch, setMySearch] = useState<string>("");
  const [mySelected, setMySelected] = useState<string>("");
  const [episodesToShow, setEpisodesToShow] = useState<IEpisode[]>([]);

  // Fetching data from API
  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
      const jsonBody: IEpisode[] = await response.json();
      setEpisodes(jsonBody);
      setEpisodesToShow(jsonBody);
    };
    fetchEpisodes();
  }, []);

  const SearchBar = (): JSX.Element => {
    return (
      <>
        <input
          type="search"
          value={mySearch}
          placeholder="Search..."
          onChange={(e) => {
            setMySearch(e.target.value);
            setEpisodesToShow(filterEpisodes(e.target.value, ""));
          }}
        />
        <p>
          Displaying {episodesToShow.length}/{episodes.length} episodes
        </p>
      </>
    );
  };
  const EpisodeItem = (props: IEpisode): JSX.Element => {
    return (
      <div key={props.id}>
        <h2>
          {props.name} - S{numberCorrector(props.season)}E
          {numberCorrector(props.number)}
        </h2>
        {props.image !== null && (
          <img src={props.image.medium} alt="" className="center" />
        )}
        <p>{htmlTagRemover(props.summary)}</p>
      </div>
    );
  };

  const filterEpisodes = (mySearch: string, mySelected: string): IEpisode[] => {
    return episodes
      .filter((item) => {
        // filter by search
        if (mySearch === "") {
          return item;
        } else {
          if (item.name.toLowerCase().includes(mySearch.toLowerCase())) {
            return item;
          } else if (
            item.summary.toLowerCase().includes(mySearch.toLowerCase())
          ) {
            return item;
          } else {
            return null;
          }
        }
      })
      .filter((item) => {
        // filter by drop-down selection
        return !mySelected ? item : item.name === mySelected && item;
      });
  };

  const EpisodeList = (): JSX.Element => {
    return (
      <>
        {episodesToShow.map(
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
      setEpisodesToShow(filterEpisodes(mySearch, ""));
    } else {
      setMySelected(e.target.value);
      setEpisodesToShow(filterEpisodes(mySearch, e.target.value));
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
            setMySearch("");
            setMySelected("");
            setEpisodesToShow(episodes);
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

  return (
    <>
      <DropDownList />
      <br />
      <br />
      <SearchBar />
      <hr />
      <div className="grid-container">
        <EpisodeList />
      </div>
    </>
  );
}
