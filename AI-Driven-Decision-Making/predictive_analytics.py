# predictive_analytics.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

def load_data(file_path):
    """Load historical economic data from a CSV file."""
    return pd.read_csv(file_path)

def preprocess_data(data):
    """Preprocess the data for training."""
    # Assuming 'target' is the column we want to predict
    X = data.drop('target', axis=1)
    y = data['target']
    return X, y

def train_model(X, y):
    """Train a Random Forest Regressor model."""
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    print(f'Mean Squared Error: {mse}')
    
    return model

def save_model(model, filename):
    """Save the trained model to a file."""
    joblib.dump(model, filename)

def main():
    data = load_data('economic_data.csv')  # Path to your dataset
    X, y = preprocess_data(data)
    model = train_model(X, y)
    save_model(model, 'predictive_model.pkl')

if __name__ == "__main__":
    main()
