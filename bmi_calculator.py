from flask import Flask, request, jsonify
import pandas as pd
app = Flask(__name__)

def calculate_bmi(weight, height):
    return weight / (height ** 2)

@app.route("/calculate-bmi", methods=["POST"])
def calculate_bmi_endpoint():
    data = request.get_json()
    name = data["name"]
    pronouns = data["pronouns"]
    height = data["height"]
    weight = data["weight"]
    bmi = calculate_bmi(weight, height)
    response = {
        "name": name,
        "pronouns": pronouns,
        "height": height,
        "weight": weight,
        "bmi": bmi
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
