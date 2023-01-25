import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BMI.scss';

function BMI() {
    const [formData, setFormData] = useState({
        name: '',
        pronouns: '',
        height: '',
        weight: ''
    });
    const [bmi, setBMI] = useState(0);
    const [idealWeightRange, setIdealWeightRange] = useState('');
    const [idealHeightWeightRatio, setIdealHeightWeightRatio] = useState(0);
    const [healthRisk, setHealthRisk] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const [pronounsError, setPronounsError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [weightError, setWeightError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let isFormValid = true;
        if (!formData.name) {
            setNameError("Name is required");
            isFormValid = false;
        }
        if (!formData.pronouns) {
            setPronounsError("Pronouns is required");
            isFormValid = false;
        }
        if (!formData.height) {
            setHeightError("Height is required");
            isFormValid = false;
        }
        if (!formData.weight) {
            setWeightError("Weight is required");
            isFormValid = false;
        }
        if (isFormValid) {

            axios.post('http://localhost:5000/calculate_bmi', formData)
                 .then(response => {
                    const { bmi, idealWeightRange, idealHeightWeightRatio, healthRisk } = response.data;
                    setBMI(bmi);
                    setIdealWeightRange(idealWeightRange);
                    setIdealHeightWeightRatio(idealHeightWeightRatio);
                    setHealthRisk(healthRisk);
                 })
                 .catch(error => {
                     console.log(error);
                 });
        }
    };    

    useEffect(() => {
        if (!formData.name || !formData.pronouns || !formData.height || !formData.weight) {
            setError('All fields are required');
        } else {
            setError('');
            axios
                .post('/calculate-bmi', formData)
                .then(response => {
                    setBMI(response.data.bmi);
                    setMessage('Data saved successfully');
                    axios.post('/save-to-csv', {
                        ...formData,
                        bmi: response.data.bmi,
                        idealWeightRange: response.data.ideal_weight_range,
                        idealHeightWeightRatio: response.data.ideal_height_weight_ratio,
                        healthRisk: response.data.health_risk,
                    });
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }, [formData]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div>
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {nameError && <p className="error-message">{nameError}</p>}
                <label>Pronouns:</label>
                <input
                    type="text"
                    name="pronouns"
                    value={formData.pronouns}
                    onChange={handleChange}
                />
                {pronounsError && <p className="error-message">{pronounsError}</p>}
                <label>Height:</label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                />
                {heightError && <p className="error-message">{heightError}</p>}
                <label>Weight:</label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                />
                {weightError && <p className="error-message">{weightError}</p>}
                <button type="submit" onClick={handleSubmit}>Calculate BMI</button>
            </form>
            {error && <p>{error}</p>}
            {bmi && <p>BMI: {bmi}</p>}
            {idealWeightRange && <p>Ideal weight range: {idealWeightRange}</p>}
            {idealHeightWeightRatio && <p>Ideal height to weight ratio: {idealHeightWeightRatio}</p>}
            {healthRisk && <p>Health risk: {healthRisk}</p>}
            {message && <p>{message}</p>}
        </div>
    );
}
export default BMI;