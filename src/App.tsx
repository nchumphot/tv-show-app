import episodes from "./episodes.json";
import { episodeList } from "./components/EpisodeItem";
import { PageHeader } from "./components/PageHeader";

console.log(`Imported ${episodes.length} episode(s)`);
console.log(`First episode's name is ${episodes[0].name}`);

function App(): JSX.Element {
  return (
    <>
      <PageHeader />
      {episodeList}
    </>
  );
}

export default App;
