import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './homePage.css';

function HomePage() {
  return (
    <div className="containerHome-fluid">
      <div className="row1">
        <div className="col">
          <div className="homePageThreelslides">
            <p className="textThreeslide">[Three slides with features and appropriate background images]</p>
            <button className="btnBefore" type="button"></button>
            <button className="btnAfter" type="button"></button>
          </div>
        </div>
      </div>
      <div className="row2">
        <div className="col">
          <div className="blog">
            <h2 className="blog-title">Blog</h2>
            <div className="row3">
              <div className="col-md-6">
                <h5>Title</h5>
                <p>Brief summary with link</p>
                <h5>Title</h5>
                <p>Brief summary with link</p>
                <h5>Title</h5>
                <p>Brief summary with link</p>
              </div>
              <div className="col-md-6">
                <h5>Title</h5>
                <p>Brief summary with link</p>
                <h5>Title</h5>
                <p>Brief summary with link</p>
                <h5>Title</h5>
                <p>Brief summary with link</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row4">
        <div className="col">
          <div className="news">
            <h2>News</h2>
            <div className="row4">
              <div className="col-md-4">
                <h5>Title</h5>
                <p>Brief summary with link</p>
              </div>
              <div className="col-md-4">
                <h5>Title</h5>
                <p>Brief summary with link</p>
              </div>
              <div className="col-md-4">
                <h5>Title</h5>
                <p>Brief summary with link</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

