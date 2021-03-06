import React from 'react';
import '../../scss/style.scss';
 
const Header = (props) => {
   return (
      <div id="header_scroll">
        <header className={props.fixedClass}>
          <div className="header-wrap col-lg-10 center-div">
            <div className="float-left name">
              <a data-scroll="" href="/">
              <span>
                Tushar Barate
              </span>
              </a>	
            </div>
            <div className="float-right social-download-wrap">
              <a href="/Resume.docx" className="btn btn-default float-left">
                <span className="mask"></span>
                <span className="btn-label">
                <b>download resume</b>
                <span className="icon pe-7s-download"></span>
              </span>
              </a>
            </div>
          </div>
          <div className="clearfix"></div>
        </header>
      </div>
    )
}
 
export default Header