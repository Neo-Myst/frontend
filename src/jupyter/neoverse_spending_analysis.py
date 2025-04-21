# Import necessary libraries
import pyarrow.parquet as pq
import pyarrow as pa
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import json
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
from itertools import combinations
import os
from pathlib import Path

# Set plot style
plt.style.use('ggplot')
sns.set(style="whitegrid")

print("Neoverse Player Spending Analysis")
print("="*40)
print("This script analyzes the Neoverse game data to predict player spending based on various features.")
print("We'll use linear regression models with different feature combinations and train-test splits.")

# Load the dataset
data_path = '/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/neoverse_logs_with_edge_cases.csv'
df = pd.read_csv(data_path)

# Display basic information about the dataset
print(f"\nDataset shape: {df.shape}")
print("\nFirst few rows of the dataset:")
print(df.head())

# Check for missing values
missing_values = df.isnull().sum()
print("\nMissing values in each column:")
print(missing_values[missing_values > 0] if any(
    missing_values > 0) else "No missing values")

# Basic statistics
print("\nBasic statistics:")
print(df.describe())

print("\n" + "="*40)
print("Data Preprocessing")
print("="*40)

# Convert categorical variables to numerical if needed
# Note: Some categorical variables are already encoded in the dataset

# Convert VIP Status to binary
df['VIP_Status_Binary'] = df['VIP Status'].apply(
    lambda x: 1 if x == 'Yes' else 0)

# Check for any zero values in Money Spent
zero_spending = df[df['Money Spent ($)'] == 0]
print(f"Number of players with zero spending: {len(zero_spending)}")

# Create a clean dataframe for modeling
model_df = df.copy()

print("\n" + "="*40)
print("Exploratory Data Analysis")
print("="*40)

# Visualize the distribution of Money Spent
plt.figure(figsize=(10, 6))
sns.histplot(df['Money Spent ($)'], kde=True)
plt.title('Distribution of Money Spent')
plt.xlabel('Money Spent ($)')
plt.ylabel('Frequency')
plt.savefig(
    '/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/money_spent_distribution.png')
plt.close()
print("Saved distribution plot to money_spent_distribution.png")

# Correlation with Money Spent
numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
correlations = df[numeric_cols].corr(
)['Money Spent ($)'].sort_values(ascending=False)
print("\nCorrelations with Money Spent:")
print(correlations)

# Visualize correlations
plt.figure(figsize=(12, 8))
top_corr_features = correlations.index[:10]  # Top 10 correlated features
correlation_matrix = df[top_corr_features].corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
plt.title('Correlation Heatmap of Top Features')
plt.savefig(
    '/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/correlation_heatmap.png')
plt.close()
print("Saved correlation heatmap to correlation_heatmap.png")

# Scatter plots for key features vs Money Spent
key_features = ['Hours Played', 'Quest Exploit Score',
                'Criminal Score', 'Missions Completed']
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
axes = axes.flatten()

for i, feature in enumerate(key_features):
    sns.scatterplot(x=feature, y='Money Spent ($)',
                    data=df, ax=axes[i], alpha=0.6)
    axes[i].set_title(f'{feature} vs Money Spent')

plt.tight_layout()
plt.savefig(
    '/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/feature_scatter_plots.png')
plt.close()
print("Saved feature scatter plots to feature_scatter_plots.png")

print("\n" + "="*40)
print("Feature Selection and Model Building")
print("="*40)

# Define target variable
target = 'Money Spent ($)'

# Define potential features for prediction
potential_features = [
    'Hours Played',
    'Criminal Score',
    'Missions Completed',
    'Quest Exploit Score',
    'Player Level_encoded',
    'Player Rank_encoded',
    'Dark Market Transactions_encoded',
    'Team Affiliation_encoded',
    'Cash on Hand ($)',
    'Sync Stability (%)',
    'Transaction Amount ($)',
    'Neural Link Stability (%)',
    'VIP_Status_Binary'
]

# Function to evaluate model with different train-test splits


def evaluate_model(X, y, feature_names, test_sizes=[0.4, 0.3, 0.2, 0.1]):
    results = []

    for test_size in test_sizes:
        train_size = 1 - test_size
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42)

        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)

        # Train model
        model = LinearRegression()
        model.fit(X_train_scaled, y_train)

        # Make predictions
        y_pred = model.predict(X_test_scaled)

        # Evaluate model
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        r2 = r2_score(y_test, y_pred)

        # Store coefficients
        coefficients = {}
        for feature, coef in zip(feature_names, model.coef_):
            coefficients[feature] = float(coef)

        # Store results
        result = {
            'features': feature_names,
            'train_size': f"{train_size*100:.0f}-{test_size*100:.0f}",
            'mse': float(mse),
            'rmse': float(rmse),
            'r2': float(r2),
            'coefficients': coefficients,
            'intercept': float(model.intercept_)
        }

        results.append(result)

    return results


# Generate all possible feature combinations
all_results = []

# For demonstration, limit to combinations of 1-4 features to avoid excessive computation
max_features = 4
print(f"Generating combinations of 1 to {max_features} features...")

for i in range(1, max_features + 1):
    for feature_combo in combinations(potential_features, i):
        feature_list = list(feature_combo)
        print(f"Evaluating features: {feature_list}")

        X = model_df[feature_list]
        y = model_df[target]

        # Evaluate model with different train-test splits
        combo_results = evaluate_model(X, y, feature_list)
        all_results.extend(combo_results)

        # Print best result for this combination
        best_result = max(combo_results, key=lambda x: x['r2'])
        print(
            f"Best R² for this combination: {best_result['r2']:.4f} with {best_result['train_size']} split\n")

# Sort results by R² score
sorted_results = sorted(all_results, key=lambda x: x['r2'], reverse=True)

print("\nTop 10 Models by R² Score:")
for i, result in enumerate(sorted_results[:10]):
    print(f"{i+1}. Features: {result['features']}")
    print(f"   Train-Test Split: {result['train_size']}")
    print(f"   R²: {result['r2']:.4f}, RMSE: {result['rmse']:.2f}")
    print()

print("\n" + "="*40)
print("Save Results to Parquet")
print("="*40)

# Format results for output
# Convert the nested structure to a more flat structure suitable for parquet
models_data = []

for idx, result in enumerate(sorted_results):
    # Get model features and train-test split
    features = result['features']
    train_size_str, test_size_str = result['train_size'].split('-')
    test_size = float(test_size_str) / 100

    # Create dataset for this model
    X = model_df[features]
    y = model_df[target]

    # Split the data with the same random state for consistency
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42)

    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Train model
    model = LinearRegression()
    model.fit(X_train_scaled, y_train)

    # Make predictions
    y_pred = model.predict(X_test_scaled)

    # Create a base record for this model
    base_record = {
        'model_id': idx,
        'features': ','.join(features),
        'num_features': len(features),
        'train_size': 1 - test_size,
        'test_size': test_size,
        'mse': float(result['mse']),
        'rmse': float(result['rmse']),
        'r2': float(result['r2']),
        'intercept': float(result['intercept'])
    }

    # Add coefficients
    for feature, coef in result['coefficients'].items():
        base_record[f'coef_{feature}'] = float(coef)

    # Limit to 1000 data points per model
    # If there are fewer than 1000 points, use all of them
    # If there are more, sample 1000 points randomly
    max_points = 1000
    if len(y_test) > max_points:
        # Create a random sample of indices
        sample_indices = np.random.choice(
            len(y_test), max_points, replace=False)
        y_test_sample = y_test.iloc[sample_indices]
        y_pred_sample = y_pred[sample_indices]
        X_test_sample = X_test.iloc[sample_indices]
    else:
        y_test_sample = y_test
        y_pred_sample = y_pred
        X_test_sample = X_test

    # Create individual records for each prediction in the sample
    for i in range(len(y_test_sample)):
        record = base_record.copy()
        record['actual'] = float(y_test_sample.iloc[i])
        record['predicted'] = float(y_pred_sample[i])

        # Add feature values
        for feature in features:
            record[f'value_{feature}'] = float(X_test_sample[feature].iloc[i])

        models_data.append(record)

    # Print progress
    print(
        f"Processed model {idx+1}/{len(sorted_results)} with {len(y_test_sample)} data points")

# Convert to DataFrame
results_df = pd.DataFrame(models_data)

# Create a metadata DataFrame
metadata_df = pd.DataFrame([{
    'target': target,
    'total_models': len(sorted_results),
    'best_r2': sorted_results[0]['r2'],
    'best_features': ','.join(sorted_results[0]['features']),
    'best_split': sorted_results[0]['train_size'],
    'generated_date': pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S"),
    'max_points_per_model': 1000
}])

# Ensure directory exists before saving
output_dir = Path(
    '/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/componentsGameModules/GameModule2')
output_dir.mkdir(parents=True, exist_ok=True)

# Save to parquet files
results_path = output_dir / 'model_results.parquet'
metadata_path = output_dir / 'model_metadata.parquet'

results_df.to_parquet(results_path, index=False)
metadata_df.to_parquet(metadata_path, index=False)

print(f"Results saved to {results_path}")
print(f"Metadata saved to {metadata_path}")

# Also save a small JSON with just the top 10 models for quick access
top_models_json = {
    "target": target,
    "top_models": sorted_results[:10],
    "metadata": {
        "total_models": len(sorted_results),
        "best_r2": sorted_results[0]['r2'],
        "best_features": sorted_results[0]['features'],
        "best_split": sorted_results[0]['train_size'],
        "generated_date": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
    }
}

top_models_path = output_dir / 'top_models.json'
with open(top_models_path, 'w') as f:
    json.dump(top_models_json, f, indent=2)

print(f"Top 10 models saved to {top_models_path} for quick access")

print("\n" + "="*40)
print("Visualize Top Models")
print("="*40)

# Visualize R² scores for top 20 models
top_20 = sorted_results[:20]
model_names = [f"Model {i+1}" for i in range(len(top_20))]
r2_scores = [model['r2'] for model in top_20]

plt.figure(figsize=(14, 8))
bars = plt.bar(model_names, r2_scores, color='skyblue')
plt.title('R² Scores for Top 20 Models')
plt.xlabel('Model')
plt.ylabel('R² Score')
plt.xticks(rotation=45)
plt.ylim(min(r2_scores) - 0.05, 1.0)

# Add feature information as annotations
for i, bar in enumerate(bars):
    feature_text = f"{top_20[i]['train_size']} split\n{len(top_20[i]['features'])} features"
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01,
             feature_text, ha='center', va='bottom', fontsize=8)

plt.tight_layout()
plt.savefig(
    '/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/top_models_r2.png')
plt.close()
print("Saved top models R² plot to top_models_r2.png")

# Analyze feature importance across top models
feature_counts = {}
for result in sorted_results[:50]:  # Consider top 50 models
    for feature in result['features']:
        if feature in feature_counts:
            feature_counts[feature] += 1
        else:
            feature_counts[feature] = 1

# Sort by frequency
sorted_features = sorted(feature_counts.items(),
                         key=lambda x: x[1], reverse=True)

# Plot feature importance
plt.figure(figsize=(12, 8))
feature_names = [item[0] for item in sorted_features]
feature_freq = [item[1] for item in sorted_features]

plt.barh(feature_names, feature_freq, color='lightgreen')
plt.title('Feature Frequency in Top 50 Models')
plt.xlabel('Frequency')
plt.ylabel('Feature')
plt.tight_layout()
plt.savefig(
    '/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/feature_importance.png')
plt.close()
print("Saved feature importance plot to feature_importance.png")

print("\n" + "="*40)
print("Detailed Analysis of Best Model")
print("="*40)

# Get the best model
best_model = sorted_results[0]
print(f"Best Model Details:")
print(f"Features: {best_model['features']}")
print(f"Train-Test Split: {best_model['train_size']}")
print(f"R²: {best_model['r2']:.4f}")
print(f"RMSE: {best_model['rmse']:.2f}")
print("\nCoefficients:")
for feature, coef in best_model['coefficients'].items():
    print(f"{feature}: {coef:.4f}")
print(f"Intercept: {best_model['intercept']:.4f}")

# Recreate the best model for demonstration
best_features = best_model['features']
X = model_df[best_features]
y = model_df[target]

# Get the test size from the train-test split
train_size_str, test_size_str = best_model['train_size'].split('-')
test_size = float(test_size_str) / 100

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=test_size, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Make predictions
y_pred = model.predict(X_test_scaled)

# Plot actual vs predicted
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.5)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
plt.xlabel('Actual Money Spent ($)')
plt.ylabel('Predicted Money Spent ($)')
plt.title('Actual vs Predicted Money Spent')
plt.tight_layout()
plt.savefig(
    '/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/actual_vs_predicted.png')
plt.close()
print("Saved actual vs predicted plot to actual_vs_predicted.png")

# Plot residuals
residuals = y_test - y_pred
plt.figure(figsize=(10, 6))
plt.scatter(y_pred, residuals, alpha=0.5)
plt.axhline(y=0, color='r', linestyle='--')
plt.xlabel('Predicted Money Spent ($)')
plt.ylabel('Residuals')
plt.title('Residual Plot')
plt.tight_layout()
plt.savefig(
    '/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/residual_plot.png')
plt.close()
print("Saved residual plot to residual_plot.png")

print("\n" + "="*40)
print("Conclusion")
print("="*40)
print(f"In this analysis, we've built and evaluated multiple linear regression models to predict player spending in the Neoverse game.")
print(f"We've explored various feature combinations and train-test splits to find the most effective predictive model.")
print()
print(
    f"The best model achieved an R² score of {best_model['r2']:.4f} with a {best_model['train_size']} train-test split,")
print(f"using the following features: {best_model['features']}.")
print()
print(f"These results have been saved to the precomputed_results.json file for use in the game module.")


# Function to generate sample predictions and actuals
def generateSampleData(modelResult):
    sampleSize = 100
    actuals = []
    predictions = []

    # Create a more realistic distribution of spending values
    # Use a log-normal distribution to simulate real-world spending patterns
    mean_spending = 3000
    std_dev = 2000

    # Generate actual values with a realistic distribution
    actual_values = np.random.lognormal(mean=np.log(mean_spending),
                                        sigma=0.8,
                                        size=sampleSize)

    # Scale to a reasonable range
    actual_values = np.clip(actual_values, 500, 15000)

    # Use the model's R² to determine how closely predictions follow actuals
    r2 = modelResult.r2 if hasattr(modelResult, 'r2') else 0.8

    # Better models (higher R²) will have predictions closer to the actual line
    error_scale = np.sqrt(1 - r2) * 0.5

    for actual in actual_values:
        # Add noise based on the model quality
        noise = np.random.normal(0, error_scale * actual)
        predicted = actual + noise

        # Ensure no negative predictions
        predicted = max(0, predicted)

        actuals.append(round(actual))
        predictions.append(round(predicted))

    return {"predictions": predictions, "actuals": actuals}
