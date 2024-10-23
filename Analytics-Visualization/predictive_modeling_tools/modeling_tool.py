# modeling_tool.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import joblib

class PredictiveModel:
    def __init__(self, data_file):
        self.data = pd.read_csv(data_file)
        self.model = LinearRegression()

    def preprocess_data(self):
        # Example preprocessing: fill missing values and select features
        self.data.fillna(self.data.mean(), inplace=True)
        self.X = self.data[['feature1', 'feature2']]  # Replace with actual feature names
        self.y = self.data['target']  # Replace with actual target name

    def train_model(self):
        self.preprocess_data()
        X_train, X_test, y_train, y_test = train_test_split(self.X, self.y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        print(f'Model trained with Mean Squared Error: {mse}')

    def save_model(self, filename):
        joblib.dump(self.model, filename)
        print(f'Model saved to {filename}')

    def load_model(self, filename):
        self.model = joblib.load(filename)
        print(f'Model loaded from {filename}')

    def predict(self, input_data):
        return self.model.predict([input_data])

if __name__ == "__main__":
    model = PredictiveModel('data.csv')  # Replace with your data file
    model.train_model()
    model.save_model('predictive_model.pkl')
