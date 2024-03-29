import React, { Component } from 'react';
import { Row, Col, Accordion } from 'react-bootstrap';
import abbreviations from '../json/abbreviations.json';
import '../styles/About.scss';

class About extends Component {
  render() {
    return (
      <div className='about container'>
        <h1>About</h1>
        <Row>
          <Col>
            <img src='./assets/imgs/ar-emoji-pin.jpg' alt='AR Emoji pin' />
          </Col>
          <Col>
            <section>
              <h4>Hi! :)</h4>
              <p>I'm Jaye. I am a phone geek, so I decided to make a site for phone shoppers to find the best phone for them.
                I combine official specs with insightful comments from popular tech reviewers, such as Marques Brownlee and
                Mrwhosetheboss. This aids active phone seekers in choosing the most suitable option by providing the best
                information in one place.
                I'm an entry-level full-stack software developer job-seeking and can be contacted at <a href="mailto:jrosecow@gmail.com">Jrosecow@gmail.com</a>.
                Check out my website at <a href='https://jrosecow.com' blank="_target">Jrosecow.com</a>.
              </p>
              <p>This site is to compare phones and pick the best one for purchase.</p>
              <br></br>
              <p>FOR MOBILE USERS ONLY: On the main page, I disabled finger swiping on touchscreens for
                each phones' first carousel slide ONLY because while scrolling, any carousel you accidentally
                touched would start moving. To view phone carousel info on a mobile screen, (1) tap
                the phone's carousel, (2) then use the arrows that appear. After the first slide, you should be able to
                finger swipe through the rest of the phone's carousel.</p>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>jPhones Glossary</Accordion.Header>
                  <Accordion.Body>
                    {abbreviations.map(abbr =>
                      <p key={abbr.abbr}><span>{abbr.abbr}: </span>{abbr.expl}</p>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
