import './App.css';
import React, { useState } from "react";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Initial option list with Green Book Standard options
  const initialOptionList = [
    { value: "standardValidation", label: "Standard Validation" },
    { value: "standardRestricted", label: "Standard Restricted" },
    { value: "candidate", label: "Candidate" },
    { value: "standardRetired", label: "Standard Retired" }
  ];

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
  }

  // Custom option component to include checkbox
  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    );
  };

  // Custom group component to handle nested options (if any)
  const CustomGroup = (props) => {
    return (
      <div>
        <components.Group {...props} />
        {props.data.options && props.data.options.map(option => (
          <components.Option
            key={option.value}
            {...props}
            data={option}
            isSelected={selectedOptions.some(selected => selected.value === option.value)}
            innerProps={{ id: option.value }}
          >
            <input
              type="checkbox"
              checked={selectedOptions.some(selected => selected.value === option.value)}
              onChange={() => {
                if (selectedOptions.some(selected => selected.value === option.value)) {
                  setSelectedOptions(selectedOptions.filter(selected => selected.value !== option.value));
                } else {
                  setSelectedOptions([...selectedOptions, option]);
                }
              }}
            />{" "}
            <label>{option.label}</label>
          </components.Option>
        ))}
      </div>
    );
  };

  // Custom control component to include search icon
  const CustomControl = ({ children, ...props }) => {
    return (
      <components.Control {...props}>
        <FontAwesomeIcon icon={faSearch} style={{ marginLeft: 10 }}/>
        {children}
      </components.Control>
    );
  };

  return (
    <div className="app">
      <h2>Choose your Green Book Standard</h2>
      <div className="dropdown-container">
        <Select
          options={initialOptionList}
          placeholder="Select Green Book Standard"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Control: CustomControl, Option: CustomOption, Group: CustomGroup }}
        />
      </div>
    </div>
  );
}
