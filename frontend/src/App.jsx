import Home from './pages/Home';
import TopHeader from './components/layout/TopHeader';

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100 flex flex-col">
      <TopHeader />
      <div className="flex-1 overflow-hidden">
        <Home />
      </div>
    </div>
  );
}

export default App;