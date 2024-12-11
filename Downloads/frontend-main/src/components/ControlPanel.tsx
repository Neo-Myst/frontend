import '../assets/css/ControlPanel.css';

function ControlPanel() {
    return (
        <div className="control-panel">
            {/* Column 1: Big */}
            <div className="panel-group">
                <h3>Learning Rate (η)</h3>
                <div className="control">
                    <input type="range" min="0.01" max="1.0" step="0.01" defaultValue="0.7" />
                    <input type="number" min="0.01" max="1.0" step="0.01" defaultValue="0.7" />
                </div>
                <h3>Gradient Steps</h3>
                <div className="control">
                    <input type="range" min="0" max="400" step="1" defaultValue="50" />
                    <input type="number" min="0" max="400" step="1" defaultValue="50" />
                </div>
                <h3>Regularization (λ)</h3>
                <div className="control">
                    <input type="range" min="0" max="100" step="1" defaultValue="26" />
                    <input type="number" min="0" max="100" step="1" defaultValue="26" />
                </div>
            </div>

            {/* Column 2: Medium */}
            <div className="panel-group">
                <h3>Train/Test Split</h3>
                <div className="control">
                    <input type="number" defaultValue="20"/>
                    <span>:</span>
                    <input type="number" defaultValue="80"/>
                </div>
                <h3>Data Size</h3>
                <div className="control">
                    <div className="control-data-size">
                        <h5>Add</h5>
                        <button>2000</button>
                    </div>
                    <div className="control-data-size">
                        <h5>Remove</h5>
                        <button>0</button>
                    </div>
                </div>
                <h3>Noise level</h3>
                <div className="control">
                    <input type="number" defaultValue="25"/>%
                </div>
            </div>

            {/* Column 3: Small */}
            <div className="panel-group">
                <h3>Polynomial Degree</h3>
                <div className="control">
                    <select defaultValue="2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <h3>Feature Scale</h3>
                <div className="control">
                    <input type="number" min="0" max="10" step="0.1" defaultValue="5.4" />x
                </div>
                <div className="update-btn">
                    <button>Update</button>
                </div>
            </div>
        </div>
    );
}

export default ControlPanel;
