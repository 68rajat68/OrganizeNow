import React, { useState } from 'react';
import '../css/About.css'; // Import the CSS file for styling
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap'; // Using React Bootstrap for tabs and layout

const About = () => {
  const [activeTab, setActiveTab] = useState('inotebook');

  return (
    <div className="about-page p-3" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
      <Container>
        <Row>
          <Col>
            <h2><i className="fa-solid fa-info-circle mx-2" style={{ color: "black" }}></i>About</h2>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              id="about-tabs"
              className="mb-3"
            >
              <Tab eventKey="inotebook" title="iNotebook">
                <div className="tab-content">
                  <h5><i className="fa-solid fa-clipboard-list mx-1" style={{ color: "#1020ff" }}></i>iNotebook</h5>
                  <p>
                    iNotebook is a versatile note-taking application designed to help you keep track of your notes efficiently. With iNotebook, you can:
                  </p>
                  <ul>
                    <li>Add new notes and edit existing ones according to your needs.</li>
                    <li>Securely log in to your account to manage your own data.</li>
                    <li>Enjoy a responsive design that works seamlessly on mobile devices.</li>
                  </ul>
                  <p>
                    The application ensures that only you can edit your data, providing a personalized and secure experience.
                  </p>
                </div>
              </Tab>
              <Tab eventKey="schedulr" title="Schedulr">
                <div className="tab-content">
                  <h5><i className="fa-solid fa-calendar-alt mx-2" style={{ color: "green" }}></i>Schedulr</h5>
                  <p>
                    Schedulr is a powerful scheduling tool designed to help you manage your daily tasks and time slots effectively. With Schedulr, you can:
                  </p>
                  <ul>
                    <li>View and manage a timetable with up to 31 days.</li>
                    <li>Toggle between edit and view modes for easy updates.</li>
                    <li>Add and remove rows to customize your schedule as needed.</li>
                  </ul>
                  <p>
                    The tool is designed to be intuitive and responsive, making it easy to use on both desktop and mobile devices.
                  </p>
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
