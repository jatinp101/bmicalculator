from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

def calculate_bmi(weight, height):
    bmi = float(weight) / (float(height) ** 2)

    if 18.5 <= bmi <= 24.9:
        ideal_weight_range = "18.5 to 24.9"
        health_risk = "Low Risk"
    else:
        ideal_weight_range = "Underweight or Overweight"
        health_risk = "High Risk"
    ideal_height_weight_ratio = bmi / (float(height) ** 2)

    return bmi, ideal_weight_range, ideal_height_weight_ratio, health_risk

@app.route("/calculate-bmi", methods=["POST"])
def calculate_bmi_endpoint():
    data = request.get_json()
    name = data["name"]
    pronouns = data["pronouns"]
    height = data["height"]
    weight = data["weight"]
    bmi, ideal_weight_range, ideal_height_weight_ratio, health_risk = calculate_bmi(weight, height)
    response = {
        "name": name,
        "pronouns": pronouns,
        "height": height,
        "weight": weight,
        "bmi": bmi,
        "ideal_weight_range": ideal_weight_range,
        "ideal_height_weight_ratio": ideal_height_weight_ratio,
        "health_risk": health_risk,
    }
    return jsonify(response)

@app.route("/save-to-csv", methods=["POST"])
def save_to_csv():
    data = request.get_json()
    df = pd.DataFrame(data, index=[0])
    df.to_csv("bmi_records.csv", mode='a', header=False)
    return jsonify({"message":"Data saved successfully"})

if __name__ == '__main__':
    app.run()
