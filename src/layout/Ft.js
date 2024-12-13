import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../svg/logo_wide.svg';
import { ReactComponent as Linksvg } from '../svg/link.svg';
import { ReactComponent as Figma } from '../svg/figma.svg';
import { ReactComponent as Git } from '../svg/git.svg';
import { ReactComponent as Insta } from '../svg/instagram.svg';
import ftData from '../db/allData.json'
import { Btn } from '../ui/commonui';

export default function Ft() {
  return (
    <footer className='d-flex align-items-center justify-content-center' style={{borderTop: '1px solid #d2d2d2'}}>
      <div className="container px-2 px-md-0">
      <div className='fttop container  d-flex justify-content-between align-items-start row gx-0 mb-3'>
            <h2 className='order-1 order-lg-0 col-6 col-md-4 col-lg-2 mb-4 d-none d-lg-block'><Link to="/"><Logo width='120' height='60' className='logo-color'></Logo></Link></h2>
            <div className='col-auto d-none d-lg-block mb-4'>
                <h4 className='fs-h4' >회사 정보</h4>
                <dl>
                  {ftData.companyInfo.map((v, i) => (
                    <div className="ftinfo" key={i}>
                      <dt className="ftinfo-bold fs-h6">{v.label}</dt>
                      <dd className='fs-h6'>{v.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className='col-6 col-md-4 col-lg-2 mb-4'>
                <h4 className='fs-h4'>고객센터</h4>
                <dl>
                <h4 className="fs-h4">02-962-7100</h4>
                  {ftData.agent.map((v, i) => (
                    <div className="ftinfo" key={i}>
                      <dt className="ftinfo-bold fs-h6">{v.label}</dt>
                      <dd className='fs-h6'>{v.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className='col-6 col-md-4 col-lg-2 mb-4'>
                <h4 className='fs-h4'>고객 지원</h4> 
                  <ul>
                    {ftData.support.map((v, i) => (
                      <li key={i} className='fs-h6'>
                      <Link to={v.linkto} className='cslink'>{v.label} <Linksvg style={{ stroke: "#aaa" }} /></Link>
                      </li>
                    ))}
                </ul>
            </div>

            
            <div className='col-6 col-sm-auto mb-4 d-none d-md-block'>
              <div className='d-flex gap-3 mb-3'>
                <a className='linkIcon' href="https://www.figma.com/design/hODaA3aqcUvTjZta1lzVWf/%5BKDT%5D-%ED%94%8C%EB%9E%AB%ED%8F%BC%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80?node-id=0-1&m=dev" target='_blank' rel='noreferrer'><Figma /></a>
                <a className='linkIcon' href="https://github.com/zzohae/CRA_cheonglyang_team.git" target='_blank' rel='noreferrer'><Git /></a>
                <a className='linkIcon' href="##"><Insta /></a>
              </div>

              <Btn version='v3' className='sitemap ms-auto'>사이트맵</Btn>
            </div>
        </div>

        <div className='ftbottom container  d-flex justify-content-between align-items-end p-0'>
              <p className="copyright fs-h6">ⓒ 2024 그린컴퓨터아트학원 신도림 KDT 3기 team 청량마켓. ALL RIGHTS RESERVED.</p>
              <Btn version='v3' className='sitemap d-none d-lg-flex'>상품 문의하기</Btn>
        </div>

      </div>
    </footer>
  )
}
