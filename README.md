# BMI Calculator

This is a BMI Calculator application that allows users to calculate their Body Mass Index (BMI) and save the results to a CSV file.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.x
- npm or yarn

### Installing

1. Clone the repository
```bash
git clone https://github.com/jatinp101/bmicalculator.git
```
2. Install the python dependencies
```bash
cd bmicalculator
pip install -r requirements.txt
```
3. Install the React dependencies
```bash
npm install
```

or

```bash
yarn install
```

4. Start the server

```bash
python bmi_calculator.py
```

5. Start the React development server
```bash
npm start
```
or

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### Using the Application

1. Enter your name, pronouns, height, and weight in the form.
2. Click the "Calculate BMI" button.
3. Your BMI will be displayed, along with your ideal weight range and health risk.
4. Your results will also be saved to a CSV file named "bmi_records.csv" in the root directory of the project.

### Built With

* [Flask](https://flask.palletsprojects.com/en/2.1.x/) - The web framework used for the server-side
* [React](https://reactjs.org/) - The front-end library used for the client-side
* [axios](https://github.com/axios/axios) - The HTTP client used for making requests from the client-side
* [pandas](https://pandas.pydata.org/) - The library used for reading and writing CSV files

### Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

### Authors

* [Jatin Pandya](https://github.com/jatinp101) - Initial work


### Acknowledgments
* Used ChatGPT to learn to connect Python Backend to React Front-End using Flask
