import './App.css';
import Header from './components/Header';
import LearningCard from './components/LearningCard';
import ControlPanel from './components/ControlPanel';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="main-layout">
                <div className="left-section">
                    <LearningCard />
                </div>
                <div className="visualization-section">
                    <div className="visualization-placeholder">
                        {/* Visualization (graph) will go here */}
                    </div>
                </div>
                <div className="control-section">
                    <ControlPanel />
                </div>
            </div>
        </div>
    );
}

export default App;