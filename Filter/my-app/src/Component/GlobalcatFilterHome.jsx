import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Select from 'react-select';
import Footer, {
  ClosedSourceSoftwareIcon,
  InHouseSoftwareIcon,
  NokDerogateLogo,
  NokLogo,
  NokRemediatedLogo,
  NotFoundLogo,
  OpenSourceLogo
} from "./footer/Footer";
import CommonHeaderHome from "./CommonHeaderHome/CommonHeaderHome";

function GlobalcatFilterHome() {
  const location = useLocation();
  const { message } = location.state || { message: "" };
  const [apiData, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const componentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://192.167.165.57:8082/techmap-api/api/excel/getMapDetails')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(`There was an error fetching the data ${error}`);
      });
  }, []);

  const handleCategoryChange = selectedOption => {
    setSelectedCategory(selectedOption);
  };

  const categories = apiData.reduce((acc, item) => {
    if (item.Name.includes('AWS') || item.Name.includes('Azure') || item.Name.includes('Amazon')) {
      if (!acc[item.Category]) {
        acc[item.Category] = {};
      }
      if (!acc[item.Category][item.Subcategory]) {
        acc[item.Category][item.Subcategory] = [];
      }
      acc[item.Category][item.Subcategory].push(item);
    }
    return acc;
  }, {});

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const navigateToHome = (path, message) => {
    navigate(path, { state: { message } });
  };

  return (
    <div>
      <span>
        <br />
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Print"
          onClick={handlePrint}
          style={{ float: "right", zIndex: "99999", position: "relative" }}
        >
          <i className="icon icon-lg">print</i>
        </button>
      </span>
      <div className="my-2 mx-center" style={{ alignContent: "center", textAlign: "center" }}>
        <h2>Global MAP</h2>
        <br />
        <div className="dropdown" style={{ width: "285px" }}>
          <button className="dropbtn" style={{ textSizeAdjust: "50px" }}>
            Select a category
          </button>
          <div className="dropdown-content" style={{ overflow: "auto" }}>
            {Object.entries(categories).map(([categoryName]) => (
              <a
                className="dropdown-item"
                key={categoryName}
                onClick={() => navigateToHome('/techmap/catFilter', categoryName)}
              >
                {categoryName.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div ref={componentRef} className="content-wrapper">
        {Object.entries(categories)
          .filter(([categoryName]) => categoryName.includes(message))
          .map(([categoryName, subcategories]) => (
            <TechMapContainer
              key={categoryName}
              categoryName={categoryName}
              subcategories={subcategories}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default GlobalcatFilterHome;

export function TechMapContainer({ categoryName, subcategories }) {
  return (
    <>
      <div className="category-card" style={{ minWidth: "98vw", maxWidth: "98vw" }}>
        <label className="display-4 category-label" style={{ color: "rgb(36 21 215)" }}>
          {categoryName.toUpperCase()}
        </label>
        {Object.entries(subcategories).map(([subName, items]) => (
          <SubCategorieContainer key={subName} subName={subName} items={items} />
        ))}
      </div>
      <br />
    </>
  );
}

export function SubCategorieContainer({ subName, items }) {
  return (
    <>
      <div className="sub-category-card">
        <label className="display-4 category-label">{subName}</label>
        {sortItems(items).map((item, idx) => (
          <Card
            key={idx}
            name={item.Name}
            status={item.Status}
            opensource={item["is open source"]}
            controlStatus={item["Control status"]}
            vendor={item.Vendor}
          />
        ))}
      </div>
      <br />
    </>
  );
}

function sortItems(items) {
  const statusPriority = {
    "Standard validated": 1,
    "Standard Restricted": 2,
    "Candidate": 3,
    "Standard Retired": 4
  };
  return items.sort((a, b) => {
    const statusA = statusPriority[a.Status] || 5;
    const statusB = statusPriority[b.Status] || 5;
    if (statusA !== statusB) {
      return statusA - statusB;
    }
    return a.Name.localeCompare(b.Name);
  });
}
