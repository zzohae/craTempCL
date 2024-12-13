import React, { useState } from 'react'
import allData from '../db/allData.json'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../svg/logo_wide.svg';
import { ReactComponent as Logomin } from '../svg/logo_min.svg';
import Searchbox from '../ui/Searchbox';
import { ReactComponent as Delivericon } from '../svg/truck.svg'
import { Btn } from '../ui/commonui';
import { ReactComponent as Menuline } from '../svg/menu_line.svg'
import { ReactComponent as Menumbline } from '../svg/menu_mobile.svg'
import { ReactComponent as Searchicon } from '../svg/searchicon.svg';
import Mbtab from './Mbtab';
import Util from '../ui/Util';
import Topad from '../contents/Topad';

export default function Hd({ keyword, setKeyword, incartNum, isLoggedIn, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className='d-flex align-items-center justify-content-center'>
      <Topad></Topad>
      <div className="hdtop container d-flex justify-content-between align-items-center">
        <h1 className='order-1 order-lg-0'><Link to="/" className='d-flex justify-content-center align-items-center'><Logo width='120' height='60' className='d-none d-lg-block'></Logo><Logomin className='d-block d-lg-none'/></Link></h1>
        <Searchbox className='order-0 order-lg-1' keyword={keyword} setKeyword={setKeyword}></Searchbox>
        <Util className='order-2 util d-none d-lg-flex align-items-center justify-content-end' incartNum={incartNum} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Util>
        <div className='d-flex d-lg-none order-2 gap-2'>
          <Searchicon 
          width='30' 
          height='30' />
          <Menumbline
              width="28"
              height="28"
              cursor="pointer" 
              className="mobileallmenu"
              onClick={toggleMenu}/>
        </div>
      </div>
      <div className="hdbtm container">
        <nav className="gnb d-none d-lg-flex justify-content-between align-items-center">
            <div className='mainmenu position-relative'>
              <Link to={allData.navdata.category.linkto} className='category d-flex justify-content-start align-items-center'><Menuline width='24' height='19' className='me-2'></Menuline>{allData.navdata.category.title}</Link>
              <ul className='hovermenu'>
                  {
                    allData.navdata.category.submenu.map((v, i) => {
                      return(
                        <li className='menu d-flex' key={i}>
                            <Link to={`/products/${v.linkto}`} className='d-block'>{v.title}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
            </div>
            <ul className='allmenu'>
            {
              allData.navdata.promotionmenu.map((v, i)=> {
                  return(
                    <li className='menu d-flex' key={i}>
                        <Link  to={v.linkto}>{v.title}</Link>
                    </li>
                  )
              })
            }
          </ul>
          <div className='delivwrap'>
          <Btn version='v2' className='delivery'>
            <Delivericon width='24' height='24'></Delivericon>
            {allData.delivery.title}
          </Btn>
          </div>
        </nav> 
      </div>

      {/* 모바일 메뉴 */}
      <Mbtab isOpen={isMenuOpen} toggleMenu={toggleMenu} setIsMenuOpen={setIsMenuOpen} />

    </header>
  )
}
