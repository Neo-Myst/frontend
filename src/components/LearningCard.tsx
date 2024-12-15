import '../css/LearningCard.css';

function LearningCard() {
    return (
        <div className="learning-card">
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
            </div>
        </div>
    );
}

export default LearningCard;