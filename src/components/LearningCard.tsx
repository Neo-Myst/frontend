import "../css/LearningCard.css";

function LearningCard() {
  return (
    <div className="learning-card">
      <h2 className="card-title">Module 1: Basics of Machine Learning</h2>

      <div className="card-content">
        {/* Left Panel */}
        <div className="left-panel">
          <h3 className="story-title">
            Alex and the Magic Plant: Learning Machine Learning
          </h3>

          <h4 className="story-subheading">The Challenge</h4>
          <p>
            Alex loves gardening and has discovered a magical plant. The plant
            grows differently based on how much sunlight and water it gets. Alex
            wants to figure out the best combination to make it grow the
            tallest—but there are too many possibilities to try manually. To
            solve this, Alex decides to learn how patterns in data can help
            solve complex problems efficiently.
          </p>

          <h4 className="story-subheading">What is Machine Learning?</h4>
          <p>
            Machine Learning (ML) is about identifying patterns in data and
            making informed predictions or decisions without explicit
            programming for each possibility.
            <b>Example:</b> Instead of manually testing every combination of
            sunlight and water, Alex collects data to analyze patterns and
            predict the best conditions for plant growth.
          </p>

          <h4 className="story-subheading">Alex's Step-by-Step Journey</h4>

          <h5>
            <strong>Step 1: Data Collection</strong>
          </h5>
          <p>
            Alex starts by collecting data from past experiments:
            <ul>
              <li>
                <b>Sunlight:</b> Hours of sunlight per day.
              </li>
              <li>
                <b>Water:</b> Liters of water per day.
              </li>
              <li>
                <b>Growth:</b> Height of the plant (in cm).
              </li>
            </ul>
            This data serves as the foundation for discovering patterns.
          </p>

          <h5>
            <strong>Step 2: Identifying Features</strong>
          </h5>
          <p>
            Alex learns that <b>features</b> are measurable factors influencing
            plant growth:
            <ul>
              <li>
                <b>Sunlight:</b> The number of hours the plant receives sunlight
                each day.
              </li>
              <li>
                <b>Water:</b> The volume of water the plant is given daily.
              </li>
            </ul>
          </p>

          <h5>
            <strong>Step 3: Understanding Labels</strong>
          </h5>
          <p>
            A <b>label</b> is the outcome Alex wants to predict—in this case,
            the plant’s height (growth in cm).
          </p>

          <h5>
            <strong>Step 4: Finding Patterns in Data</strong>
          </h5>
          <p>
            Alex notices trends by analyzing the collected data. For example:
            <ul>
              <li>6 hours of sunlight + 4 liters of water → 60 cm tall.</li>
            </ul>
            These patterns help Alex predict plant growth for new conditions.
          </p>

          <h5>
            <strong>Step 5: Making Predictions</strong>
          </h5>
          <p>
            Alex can now plan the optimal conditions for the magical plant to
            thrive!
          </p>

          <h4 className="story-subheading">
            Using Equations to Explore Relationships
          </h4>
          <p>
            Alex creates a simple equation to represent these relationships:
            <pre>Growth = (a × Sunlight) + (b × Water) + c</pre>
            Here:
            <ul>
              <li>
                <b>a:</b> Contribution of sunlight to growth.
              </li>
              <li>
                <b>b:</b> Contribution of water to growth.
              </li>
              <li>
                <b>c:</b> A baseline growth constant.
              </li>
            </ul>
            This equation helps predict the growth based on sunlight and water.
          </p>

          <h4 className="story-subheading">Growth Data Points</h4>
          <div className="legend">
            <div className="legend-item">
              <span className="dot red"></span>
              <span>Growth &lt; 30 cm: Short Plants</span>
            </div>
            <div className="legend-item">
              <span className="dot yellow"></span>
              <span>30 cm &lt; Growth &lt; 50 cm: Medium Plants</span>
            </div>
            <div className="legend-item">
              <span className="dot green"></span>
              <span>Growth ≥ 50 cm: Tall Plants</span>
            </div>
          </div>

          <h4 className="story-subheading">Let’s Explore Data!</h4>
          <p>
            On the right, you see a scatter plot. Each dot represents an
            experiment Alex conducted. Use the controls to:
            <ul>
              <li>
                Adjust the <b>X-axis</b> and <b>Y-axis</b> to explore
                relationships between sunlight, water, and growth.
              </li>
              <li>
                Apply filters to focus on specific groups, such as:
                <ul>
                  <li>Sunlight &gt; 6 hours.</li>
                  <li>Water &gt; 4 liters.</li>
                  <li>Growth &gt; 60 cm.</li>
                </ul>
              </li>
            </ul>
            Look for:
            <ul>
              <li>
                <b>Clusters:</b> Groups of experiments with similar growth
                outcomes.
              </li>
              <li>
                <b>Trends:</b> Relationships like "more sunlight leads to taller
                plants."
              </li>
              <li>
                <b>Outliers:</b> Unusual experiments with unexpected results.
              </li>
            </ul>
          </p>

          <h4 className="story-subheading">The Challenge</h4>
          <p>
            Can you help Alex find the best conditions for the magical plant to
            grow the tallest?
            <b>Instruction:</b>
            Use the controls on the right-hand side to adjust the scatter plot
            and identify the combination of sunlight and water that led to the
            tallest plants. Once you're done, click 'Submit' to check your
            findings!
          </p>
        </div>
      </div>
    </div>
  );
}

export default LearningCard;
