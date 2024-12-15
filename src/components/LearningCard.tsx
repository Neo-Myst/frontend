import '../css/LearningCard.css';

function LearningCard() {
    return (
        <div className="learning-card">
<<<<<<< HEAD
            <h2 className="card-title">Module 1: Basics of Machine Learning</h2>

            <div className="card-content">
                {/* Left Panel */}
                <div className="left-panel">
                    <h3 className="story-title">Alex and the Magic Plant: Learning Machine Learning</h3>

                    <h4 className="story-subheading">The Challenge</h4>
                    <p>
                        Alex loves gardening and has discovered a magical plant. The plant grows differently based on how much sunlight and water it gets. Alex wants to figure out the best combination to make it grow the tallest—but there are too many possibilities to try manually.
                        To solve this, Alex decides to learn about Machine Learning (ML), a method to teach computers to analyze data and make predictions!
                    </p>

                    <h4 className="story-subheading">What is Machine Learning?</h4>
                    <p>
                        Machine Learning (ML) helps computers find patterns in data and make decisions without being explicitly programmed.
                        <b>Example:</b> Instead of manually testing every combination of sunlight and water, Alex can collect data, use ML to find patterns, and predict the best conditions for the plant to grow.
                    </p>

                    <h4 className="story-subheading">Let’s Explore Data!</h4>
                    <p>
                        On the right, you see a scatter plot. Each dot represents an experiment Alex has conducted, and the axes show its features like sunlight and water.
                        <b>Your Task:</b>
                        Adjust the axes to explore how features are related to plant growth:
                        <ul>
                            <li><b>X-axis:</b> Sunlight, Water.</li>
                            <li><b>Y-axis:</b> Growth.</li>
                        </ul>
                        Use filters to focus on specific groups of data:
                        <ul>
                            <li>Show experiments with sunlight &gt; 6 hours.</li>
                            <li>Highlight experiments with water &gt; 3 liters.</li>
                            <li>Filter experiments where the plant grew taller than 50 cm.</li>
                        </ul>
                    </p>

                    <h4 className="story-subheading">The Challenge</h4>
                    <p>
                        Can you help Alex find the best conditions for the magical plant to grow the tallest?
                        <b>Instruction:</b>
                        Use the controls on the right-hand side to adjust the scatter plot.
                        Identify the combination of sunlight and water that led to the tallest plants.
                        Once you’re done, click 'Submit' to check your findings!
                    </p>
                </div>

                {/* Right Panel */}
                <div className="right-panel">
                    <h4 className="visualization-title">Interactive Visualization</h4>
                    <p>
                        Help Alex analyze the data using Machine Learning techniques. Use the controls to explore the scatter plot and uncover patterns.
                    </p>
                    <ul>
                        <li><b>Scatter Plot Visualization:</b> Adjust the X-axis and Y-axis using dropdowns for features like Sunlight, Water, and Growth.</li>
                        <li><b>Filters:</b> Focus on specific groups of data:
                            <ul>
                                <li>Sunlight &gt; 6 hours.</li>
                                <li>Water &gt; 3 liters.</li>
                                <li>Growth &gt; 50 cm.</li>
                            </ul>
                        </li>
                        <li><b>Real-Time Feedback:</b> The plot dynamically updates as you interact, showing clusters, trends, and outliers.</li>
                    </ul>
                    {/* <button className="reset-button">Reset</button>
                    <button className="submit-button">Submit</button> */}
                </div>
=======

            <div className="card-content">
                {/* Story Title */}
                <h2 className="story-title">Alex and the Magic Plant: Learning Machine Learning</h2>

                {/* The Challenge */}
                <section className="story-section">
                    <h3 className="section-heading">The Challenge</h3>
                    <p>
                        Alex loves gardening and has discovered a magical plant. The plant grows differently based on
                        how much <b>sunlight</b> and <b>water</b> it gets. However, Alex faces a big challenge: 
                        <strong> there are too many combinations to test manually!</strong>
                    </p>
                    <p>
                        To solve this, Alex decides to learn about <strong>Machine Learning (ML)</strong>—a way to teach 
                        computers to analyze data and make predictions.
                    </p>
                </section>

                {/* What is Machine Learning */}
                <section className="story-section">
                    <h3 className="section-heading">What is Machine Learning?</h3>
                    <p>
                        <strong>Machine Learning (ML)</strong> helps computers identify <b>patterns</b> in data and make decisions 
                        <b>without being explicitly programmed.</b>
                    </p>
                    <p>
                        <strong>Example:</strong> Instead of manually testing every combination of sunlight and water, Alex 
                        collects data, uses ML to identify patterns, and predicts the best conditions for the plant to grow.
                    </p>
                </section>

                {/* Alex's ML Journey */}
                <section className="story-section">
                    <h3 className="section-heading">Alex's Machine Learning Journey</h3>
                    <ol className="story-list">
                        <li>
                            <strong>Step 1: Data Collection</strong>
                            <p>Alex records data from experiments with the magical plant:</p>
                            <ul>
                                <li><b>Sunlight:</b> Hours per day</li>
                                <li><b>Water:</b> Liters per day</li>
                                <li><b>Growth:</b> Plant height in cm</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Step 2: Identifying Features</strong>
                            <p>Features are the inputs that influence growth:</p>
                            <ul>
                                <li><b>Sunlight:</b> How many hours the plant gets</li>
                                <li><b>Water:</b> How much water it receives</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Step 3: Defining Labels</strong>
                            <p>
                                The label is the outcome Alex wants to predict: 
                                <b>Plant height (Growth in cm)</b>.
                            </p>
                        </li>
                        <li>
                            <strong>Step 4: Training the Model</strong>
                            <p>Alex uses past data to find patterns:</p>
                            <ul>
                                <li>4 hours of sunlight + 2 liters of water → 15 cm tall</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Step 5: Making Predictions</strong>
                            <p>
                                Alex predicts growth for new conditions:<br />
                                  <b> 6 hours of sunlight + 4 liters of water → 60 cm tall</b>
                            </p>
                        </li>
                    </ol>
                </section>

                {/* Let’s Explore Data */}
                <section className="story-section">
                    <h3 className="section-heading">Let’s Explore Data!</h3>
                    <p>
                        On the right, you see a scatter plot. Each dot represents an experiment conducted by Alex, 
                        with axes showing features like sunlight, water, and growth.
                    </p>
                    <p>
                        <b>Your Task:</b> Use the controls to explore relationships in the data:
                    </p>
                    <ul>
                        <li><b>X-axis:</b> Sunlight or Water</li>
                        <li><b>Y-axis:</b> Growth</li>
                    </ul>
                    <p>Apply filters to focus on specific groups of data:</p>
                    <ul>
                        <li>Show experiments with <b>sunlight &gt; 6 hours</b></li>
                        <li>Highlight experiments with <b>water &gt; 3 liters</b></li>
                        <li>Filter experiments where the plant grew <b>taller than 50 cm</b></li>
                    </ul>
                </section>
>>>>>>> af1f1a4 (Completed MVP)
            </div>
        </div>
    );
}

<<<<<<< HEAD
export default LearningCard;
=======
export default LearningCard;
>>>>>>> af1f1a4 (Completed MVP)
