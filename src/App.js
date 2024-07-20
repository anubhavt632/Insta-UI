import "./App.css";
import Header from "./Components/Header";
import InstaPosts from "./Components/InstaPosts";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <InstaPosts />
    </div>
  );
}

export default App;
