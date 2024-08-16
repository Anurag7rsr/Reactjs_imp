import React, { useState } from 'react';
import './MultiSelectDropdown.css';

const MultiSelectDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const options = {
    Africa: ["Ivory Coast", "Cameroun"],
    America: [],
    Asia: [],
    Europe: [],
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = (options) => {
    return Object.keys(options).reduce((acc, region) => {
      const filteredItems = options[region].filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
      if (filteredItems.length > 0) {
        acc[region] = filteredItems;
      }
      return acc;
    }, {});
  };

  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown} className="dropdown-button">
        Select Options
      </button>
      {isOpen && (
        <div className="dropdown">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="dropdown-search"
          />
          {Object.keys(filteredOptions(options)).map(region => (
            <div key={region} className="region">
              <strong>{region}</strong>
              {filteredOptions(options)[region].map(item => (
                <div key={item} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => handleSelectItem(item)}
                  />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
