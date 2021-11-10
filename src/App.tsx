import { PageHeader } from "./components/PageHeader";
import { MainContent } from "./components/MainContent";
import "./css/style.css";

// console.log(`Imported ${episodes.length} episode(s)`);
// console.log(`First episode's name is ${episodes[0].name}`);

function App(): JSX.Element {
  return (
    <>
      <PageHeader />
      <MainContent />
    </>
  );
}

export default App;
