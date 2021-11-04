import IEpisode from "./IEpisode";
import episodes from "../episodes.json";
import { numberCorrector } from "../utils/numberCorrector";
import { htmlTagRemover } from "../utils/htmlTagRemover";

export function EpisodeItem(props: IEpisode): JSX.Element {
  return (
    <>
      <h2>
        {props.name} - S{numberCorrector(props.season)}E
        {numberCorrector(props.number)}
      </h2>
      <img src={props.image.medium} alt="" />
      <p>{htmlTagRemover(props.summary)}</p>
    </>
  );
}

export const episodeList = episodes.map(
  (episode: IEpisode): JSX.Element => EpisodeItem(episode)
);
