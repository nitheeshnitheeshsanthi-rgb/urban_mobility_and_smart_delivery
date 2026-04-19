import React, { useState } from 'react';

const InputForm = ({ onSubmit, loading }) => {
  const e = React.createElement;
  const [formData, setFormData] = useState({
    distance: '',
    traffic_level: '',
    weather: '',
    time_of_day: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!formData.distance || formData.distance <= 0) {
      alert('Distance must be a positive number');
      return;
    }
    if (!formData.traffic_level || !formData.weather || !formData.time_of_day) {
      alert('All fields are required');
      return;
    }
    onSubmit(formData);
  };

  const renderInputGroup = (label, children) => {
    return e('div', { className: "input-group" },
      e('label', null, label),
      children
    );
  };

  return e('div', { className: "card animate-fade-in" },
    e('h2', { style: { marginBottom: '1.5rem', fontSize: '1.25rem' } }, 'Prediction Panel'),
    e('form', { onSubmit: handleSubmit },
      renderInputGroup('Distance (km)', e('input', {
        type: "number",
        name: "distance",
        value: formData.distance,
        onChange: handleChange,
        placeholder: "e.g. 15.5",
        className: "input-control",
        required: true,
        step: "0.1",
        min: "0"
      })),

      renderInputGroup('Traffic Level', e('select', {
        name: "traffic_level",
        value: formData.traffic_level,
        onChange: handleChange,
        className: "input-control",
        required: true
      },
        e('option', { value: "" }, 'Select Level'),
        e('option', { value: "Low" }, 'Low'),
        e('option', { value: "Medium" }, 'Medium'),
        e('option', { value: "High" }, 'High')
      )),

      renderInputGroup('Weather', e('select', {
        name: "weather",
        value: formData.weather,
        onChange: handleChange,
        className: "input-control",
        required: true
      },
        e('option', { value: "" }, 'Select Weather'),
        e('option', { value: "Sunny" }, 'Sunny'),
        e('option', { value: "Rainy" }, 'Rainy'),
        e('option', { value: "Cloudy" }, 'Cloudy')
      )),

      renderInputGroup('Time of Day', e('select', {
        name: "time_of_day",
        value: formData.time_of_day,
        onChange: handleChange,
        className: "input-control",
        required: true
      },
        e('option', { value: "" }, 'Select Time'),
        e('option', { value: "Morning" }, 'Morning'),
        e('option', { value: "Afternoon" }, 'Afternoon'),
        e('option', { value: "Evening" }, 'Evening'),
        e('option', { value: "Night" }, 'Night')
      )),

      e('button', { 
        type: "submit", 
        className: "btn-primary", 
        disabled: loading 
      }, 
        loading ? 'Processing Central AI...' : 'Predict Delivery Delay'
      )
    )
  );
};

export default InputForm;
