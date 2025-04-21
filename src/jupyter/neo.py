import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, roc_auc_score, precision_recall_curve
from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score
from sklearn.decomposition import PCA

# Load data
data = pd.read_csv(
    "/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/perfect_prediction_neoverse_logs.csv")

# Preprocessing
warnings.filterwarnings("ignore")
np.random.seed(42)

# Save original data for CSV output later
original_data = data.copy()

# Handle timestamp column
timestamp_col = "Timestamps" if "Timestamps" in data.columns else "Timestamp"
data[timestamp_col] = pd.to_datetime(data[timestamp_col])
data.drop(columns=[timestamp_col], inplace=True)

categorical_columns = ['Player ID', 'Player Rank', 'Team Affiliation', 'VIP Status',
                       'Player Level', 'Dark Market Transactions']
numerical_columns = ['Hours Played', 'Money Spent ($)', 'Criminal Score', 'Missions Completed',
                     'Cash on Hand ($)', 'Sync Stability (%)', 'Quest Exploit Score',
                     'Transaction Amount ($)', 'Neural Link Stability (%)']

# Feature engineering
for col in numerical_columns:
    if col in data.columns:
        # Add ratio features
        if 'Criminal Score' in data.columns and col != 'Criminal Score':
            data[f'{col}_to_criminal_ratio'] = data[col] / \
                (data['Criminal Score'] + 1)

# Add interaction features
data['crime_to_play_ratio'] = data['Criminal Score'] / \
    (data['Hours Played'] + 1)
data['money_per_hour'] = data['Money Spent ($)'] / (data['Hours Played'] + 1)
data['quest_efficiency'] = data['Quest Exploit Score'] / \
    (data['Hours Played'] + 1)
data['suspicious_activity'] = ((data['crime_to_play_ratio'] > data['crime_to_play_ratio'].quantile(0.95)) &
                               (data['Quest Exploit Score'] > data['Quest Exploit Score'].quantile(0.95))).astype(int)

# Categorical encoding
for col in categorical_columns:
    le = LabelEncoder()
    data[f"{col}_encoded"] = le.fit_transform(data[col])

# Dark market flag
data['has_dark_market'] = (
    data['Dark Market Transactions'] != 'None').astype(int)

# Compute suspicion score based on domain knowledge
data['suspicion_score'] = (
    0.3 * (data['Criminal Score'] / data['Criminal Score'].max()) +
    0.2 * (data['Quest Exploit Score'] / data['Quest Exploit Score'].max()) +
    0.2 * (data['money_per_hour'] / data['money_per_hour'].max()) +
    0.3 * data['has_dark_market']
)

# Select top 20% most suspicious players for training (to avoid class imbalance issues)
threshold = data['suspicion_score'].quantile(0.998)
data['potential_hacker'] = (data['suspicion_score'] > threshold).astype(int)

# Feature selection for logistic regression
features = [
    "Hours Played", "Criminal Score", "Quest Exploit Score",
    "Cash on Hand ($)", "Sync Stability (%)", "Neural Link Stability (%)",
    "money_per_hour", "crime_to_play_ratio", "quest_efficiency",
    "Dark Market Transactions_encoded", "has_dark_market",
    "suspicious_activity"
]

X = data[features]
y = data['potential_hacker']

# Check class distribution
print(f"Class distribution in full dataset: {np.bincount(y)}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train logistic regression model
model = LogisticRegression(
    C=1.0,                    # Regularization strength
    class_weight='balanced',  # Handle class imbalance
    max_iter=1000,            # Increase iterations to ensure convergence
    random_state=42,
    solver='liblinear'        # Works well with small datasets
)
model.fit(X_train_scaled, y_train)

# Predict probabilities
y_prob = model.predict_proba(X_test_scaled)[:, 1]

# Get exactly 10 hackers - the ones with highest probability
# Instead of using a fixed threshold, pick the top 10
top_10_indices = np.argsort(y_prob)[-10:]
y_pred = np.zeros_like(y_test)
y_pred[top_10_indices] = 1

# Calculate metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, zero_division=0)
recall = recall_score(y_test, y_pred, zero_division=0)
f1 = f1_score(y_test, y_pred, zero_division=0)
auc = roc_auc_score(y_test, y_prob)

print(f"Model Metrics:")
print(f"Accuracy: {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1 Score: {f1:.4f}")
print(f"AUC: {auc:.4f}")

# Create confusion matrix plot
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 7))

# Use a custom colormap for better visualization
cmap = plt.cm.Blues
plt.imshow(cm, interpolation='nearest', cmap=cmap)
plt.title('Truth Table: Hacker Detection (Logistic Regression)')
plt.colorbar()

# Set tick marks and labels
tick_marks = np.arange(2)
plt.xticks(tick_marks, ['Innocent', 'Hacker'])
plt.yticks(tick_marks, ['Innocent', 'Hacker'])

# Add text annotations in each cell
thresh = cm.max() / 2.
for i in range(cm.shape[0]):
    for j in range(cm.shape[1]):
        plt.text(j, i, format(cm[i, j], 'd'),
                 ha="center", va="center",
                 color="white" if cm[i, j] > thresh else "black",
                 fontsize=14)

plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.tight_layout()

# Add metrics to the plot
plt.figtext(0.5, 0.01, f'Accuracy: {accuracy:.4f} | Precision: {precision:.4f} | Recall: {recall:.4f} | F1-Score: {f1:.4f}',
            ha='center', fontsize=12, bbox={'facecolor': 'white', 'alpha': 0.8, 'pad': 5, 'edgecolor': 'black'})

plt.tight_layout()
plt.subplots_adjust(bottom=0.15)
plt.savefig(
    "/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/hacker_truth_table.png")
# Show feature importances (coefficients for logistic regression)
feature_importances = np.abs(model.coef_[0])
sorted_idx = np.argsort(feature_importances)[::-1]
sorted_features = [features[i] for i in sorted_idx]
sorted_importances = feature_importances[sorted_idx]

# Plot feature importances
plt.figure(figsize=(12, 6))
plt.barh(range(len(sorted_importances)), sorted_importances, align='center')
plt.yticks(range(len(sorted_importances)), sorted_features)
plt.xlabel('Feature Importance (absolute coefficient value)')
plt.title('Feature Importance for Hacker Detection (Logistic Regression)')
plt.tight_layout()
plt.savefig(
    "/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/feature_importance.png")

# Visualize ROC curve
plt.figure(figsize=(8, 7))
fpr, tpr, _ = roc_curve(y_test, y_prob)
plt.plot(fpr, tpr, color='blue', lw=2, label=f'ROC curve (AUC = {auc:.4f})')
plt.plot([0, 1], [0, 1], color='gray', lw=1, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic (ROC) Curve')
plt.legend(loc="lower right")
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig(
    "/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/roc_curve.png")

# Visualize Precision-Recall curve
plt.figure(figsize=(8, 7))
precision_curve, recall_curve, _ = precision_recall_curve(y_test, y_prob)
plt.plot(recall_curve, precision_curve, color='blue', lw=2)
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig(
    "/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/precision_recall_curve.png")

# PCA for visualization of the data and decision boundary
pca = PCA(n_components=2)
X_test_pca = pca.fit_transform(X_test_scaled)

# Visualize the logistic regression decision boundary
plt.figure(figsize=(10, 8))

# Create a mesh grid
h = 0.02  # step size in the mesh
x_min, x_max = X_test_pca[:, 0].min() - 1, X_test_pca[:, 0].max() + 1
y_min, y_max = X_test_pca[:, 1].min() - 1, X_test_pca[:, 1].max() + 1
xx, yy = np.meshgrid(np.arange(x_min, x_max, h), np.arange(y_min, y_max, h))

# Train a logistic regression model on the PCA data for visualization
pca_model = LogisticRegression(class_weight='balanced', random_state=42)
pca_model.fit(X_test_pca, y_test)

# Predict probabilities on the mesh grid
Z = pca_model.predict_proba(np.c_[xx.ravel(), yy.ravel()])[:, 1]
Z = Z.reshape(xx.shape)

# Plot the decision boundary
plt.contourf(xx, yy, Z, alpha=0.8, cmap=plt.cm.RdBu_r)

# Plot the data points with proper labels
scatter = plt.scatter(X_test_pca[:, 0], X_test_pca[:, 1], c=y_test,
                      cmap=plt.cm.RdBu_r, alpha=0.8, edgecolors='black')

# Highlight the detected hackers (true positives)
true_positive_mask = (y_pred == 1) & (y_test == 1)
true_positive_indices = np.where(true_positive_mask)[0]
plt.scatter(X_test_pca[true_positive_indices, 0], X_test_pca[true_positive_indices, 1],
            s=100, facecolors='none', edgecolors='green', linewidth=2,
            label='Hackers Detected')

# Create a legend for the scatter plot
legend1 = plt.legend(*scatter.legend_elements(),
                     loc="lower right", title="Player Type")
plt.gca().add_artist(legend1)
plt.legend(loc="upper right")

plt.title('Logistic Regression Decision Boundary (PCA-reduced features)')
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.colorbar(label='Probability of being a Hacker')
plt.tight_layout()
plt.savefig(
    "/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/logistic_regression_boundary.png")

# Get the original data for the top suspicious players
test_indices = X_test.index
top_10_original_indices = test_indices[top_10_indices]

# Filter to only include true positives (where prediction and actual label match)
true_positive_mask = y_test.iloc[top_10_indices].values == 1
true_positive_indices = top_10_indices[true_positive_mask]
true_positive_original_indices = test_indices[true_positive_indices]

# Get data for true positive hackers only
hackers_data = original_data.iloc[true_positive_original_indices].copy()

# Add prediction information
hackers_data['Hacker_Probability'] = y_prob[true_positive_indices]
hackers_data['Actual_Label'] = y_test.iloc[true_positive_indices].values
hackers_data['Suspicion_Score'] = data.iloc[true_positive_original_indices]['suspicion_score'].values

# Sort by probability
hackers_data = hackers_data.sort_values('Hacker_Probability', ascending=False)
hackers_data['Hacker_Rank'] = range(1, len(hackers_data) + 1)

# Add suspicion factors
hackers_data['Suspicion_Factors'] = ''
for idx, row in hackers_data.iterrows():
    factors = []

    if row['Criminal Score'] > data['Criminal Score'].quantile(0.9):
        factors.append("High criminal score")
    if row['Quest Exploit Score'] > data['Quest Exploit Score'].quantile(0.9):
        factors.append("Unusual quest patterns")
    if row['Dark Market Transactions'] != 'None':
        factors.append("Dark market activity")
    if row['Money Spent ($)'] > data['Money Spent ($)'].quantile(0.95):
        factors.append("Excessive spending")
    if row['Hours Played'] > data['Hours Played'].quantile(0.95):
        factors.append("Excessive playtime")

    hackers_data.at[idx, 'Suspicion_Factors'] = ", ".join(factors)

# Save to CSV
hackers_data.to_csv(
    "/Users/dhruvvaghasiya/EDOC/sup/PBL_two/frontend/src/jupyter/true_positive_hackers_logistic_regression.csv", index=False)

# Print a summary of the detected hackers
print(
    f"\nTrue Positive Hackers Detected -> ({len(hackers_data)}):")
print("--------------------------------------------------")
for i, (idx, row) in enumerate(hackers_data.iterrows()):
    print(
        f"#{i+1}: Player {row['Player ID']} - Probability: {row['Hacker_Probability']:.3f}")
    print(f"   Factors: {row['Suspicion_Factors']}")
    print("   -----------------------------")

# Print full classification report
print("\nDetailed Classification Report:")
print(classification_report(y_test, y_pred, target_names=[
      "Innocent", "Hacker"], zero_division=0))
