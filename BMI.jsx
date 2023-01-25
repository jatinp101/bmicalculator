import React, { useState, useEffect } from 'react';
import './BMI.scss';
import axios from 'axios';

function BMI() {
    const [formData, setFormData] = useState({
        name: '',
        pronouns: '',
        height: '',
        weight: ''
    });
    const [bmi, setBMI] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

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
                        bmi: response.data.bmi
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
                <label>Pronouns:</label>
                <input
                    type="text"
                    name="pronouns"
                    value={formData.pronouns}
                    onChange={handleChange}
                />
                <label>Height:</label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                />
                <label>Weight:</label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                />
                <button type="submit" onClick={handleSubmit}>Calculate BMI</button>
            </form>
            {error && <p>{error}</p>}
            {bmi && <p>BMI: {bmi}</p>}
            {message && <p>{message}</p>}
        </div>
    );
}
export default BMI;




