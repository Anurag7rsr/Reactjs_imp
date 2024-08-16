import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
import Select from 'react-select';

function App() {
  const [product, setProduct] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);
  console.log('Products of api --------', product);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  const categories = Array.from(
    new Set(product.map((res) => res.category))
  );

  const CategoryOptions = categories.map((category) => ({
    value: category,
    label: category
  }));

  const filterProducts = selectCategory
    ? product.filter((product) => product.category === selectCategory.value)
    : product;

  return (
    <>
      <div className="mb-5">
        <div className="row">
          <h1>Product</h1>
          <div className="col-12 mb-4">
            <Select
              options={CategoryOptions}
              isClearable
              placeholder="Select a category"
              onChange={(selectOption) => setSelectCategory(selectOption)}
              value={selectCategory}
            />
          </div>
          {filterProducts.map((result) => (
            <div className="col-md-3" key={result.id}>
              <div className="card" style={{ height: '90%' }}>
                <img
                  src={result.image}
                  className="card-img-top"
                  alt={result.title}
                  style={{ width: '100%', height: '80%' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{result.title.slice(0, 10)}</h5>
                  <p className="badge bg-primary">Category: {result.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
