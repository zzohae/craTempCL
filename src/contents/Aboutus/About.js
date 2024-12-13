import React from 'react';
import { Link, useParams } from 'react-router-dom';
import allcategory from '../../db/allData.json';
import AboutInfo from './AboutInfo';
import StoreInfo from './StoreInfo';

export default function AboutUs() {
  const { en } = useParams();

  const submenu = allcategory.navdata.promotionmenu.find(
    (menu) => menu.linkto === 'aboutus/aboutinfo'
  )?.submenu;

  const getComponent = (en) => {
    switch (en) {
      case 'aboutinfo':
        return <AboutInfo />;
      case 'store_info':
        return <StoreInfo />;
      default:
        return <AboutInfo />;
    }
  };

  return (     
    <div className="d-flex flex-column align-items-center">
      <div className="container ">
        <ul className="d-flex flex-wrap justify-content-center justify-content-xl-start mytab">
          {submenu &&
            submenu.map((item, index) => (
              <li key={index}
                className={`d-flex justify-content-center align-items-center ${
                  en === item.linkto ? 'active' : ''}`}>
                <Link to={`/aboutus/${item.linkto}`}>{item.title}</Link>
              </li>
            ))}
        </ul>

        <div className="content">{getComponent(en)}</div>
      </div>
    </div>
  );
}
