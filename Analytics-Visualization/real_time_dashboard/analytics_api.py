# analytics_api.py

from flask import Flask, jsonify
import random

app = Flask(__name__)

# Sample data storage
data_points = []

@app.route('/add-data', methods=['POST'])
def add_data():
    new_data_point = random.randint(0, 100)  # Simulate data generation
    data_points.append(new_data_point)
    return jsonify({'data': new_data_point}), 201

@app.route('/analytics', methods=['GET'])
def get_analytics():
    if not data_points:
        return jsonify({'average': 0, 'max': 0, 'min': 0})

    average = sum(data_points) / len(data_points)
    max_value = max(data_points)
    min_value = min(data_points)

    return jsonify({
        'average': average,
        'max': max_value,
        'min': min_value,
        'total_points': len(data_points)
    })

if __name__ == '__main__':
    app.run(port=5000)
