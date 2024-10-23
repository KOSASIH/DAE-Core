// scenario_simulator.js

const axios = require('axios');

async function simulateScenario(feature1, feature2) {
    try {
        const response = await axios.post('http://localhost:5000/predict', {
            feature1: feature1,
            feature2: feature2
        });
        console.log(`Predicted outcome for features (${feature1}, ${feature2}): ${response.data.prediction}`);
    } catch (error) {
        console.error(`Error simulating scenario: ${error}`);
    }
}

// Example scenarios
const scenarios = [
    { feature1: 10, feature2: 20 },
    { feature1: 15, feature2: 25 },
    { feature1: 20, feature2: 30 }
];

// Simulate each scenario
scenarios.forEach(scenario => {
    simulateScenario(scenario.feature1, scenario.feature2);
});
