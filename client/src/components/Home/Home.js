import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../layout/Header';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/ui/spinner';
import signature from '../../img/signature.jpg';
import FullStack from '../full-stack/FullStack';
import TechSkills from '../tech-skills/TechSkills';
import Experience from '../experience/Experience';
import Education from '../education/Education';
import Contact from '../contact/Contact';
import Footer from '../layout/Footer';
import HTMLParser from 'react-typed';

const Home = (props) => {
  
 const  {
    profile: { profile, loading },
    getProfile 
  } = props;

  useEffect(() => {
    getProfile();
  },[getProfile]);

 
  if(loading && profile === null){
      
  }
   return loading && profile === null ? (
    <Spinner />
    ) : 
    (  <Fragment>
        <Header fixedClass={props.fixedClass} />
        <div id="main_content" className="content-block margin-top-150 margin-top-sm-70 margin-top-xs-50">
          <section id="intro_content_sec" className="col-lg-10 col-md-11 col-sm-11 center-div intro-content-wrap sec-pad"> 
            <div className="person-img margin-bottom-xs"></div>

              <h1>
                  Hey! 
                  <HTMLParser
                    strings={[
                      ` I Am ${ profile.user.name } <br/> ${ profile.status } <br/> Living in ${ profile.location } City.`
                   ]}
                    typeSpeed={40}
                   />
                 
              </h1>
							<h6>
								about
							</h6>
							<p className="pad-bottom-35 wow fadeInUp" data-wow-duration=".6s">
								{ profile.bio}
							</p>
              <div className="per-signature margin-top-sm wow fadeInUp" data-wow-duration=".4s">
								<img className="img-responsive" width="80" style={ { width : "100px" } } src={ signature } alt="signature" />
							</div>
          </section>
          <hr className="separater-hr">
          </hr>
       
        

          <FullStack top_skills={profile.top_skills} />
          <hr className="separater-hr">
            </hr>
            
          <TechSkills skills={ profile.skills } />
          <hr className="separater-hr">
            </hr>

          <Experience experience={ profile.experience } />
          <hr className="separater-hr">
            </hr>

          <Education education={ profile.education } />
          <hr className="separater-hr">
            </hr>

          <Contact contact={ profile.contact } />
          <hr className="separater-hr">
            </hr>
          <Footer/>
        </div>
      </Fragment>
    )
}

Home.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps,{ getProfile } ) (Home);