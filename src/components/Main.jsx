import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PhotoGrid from "./PhotoGrid.jsx";
import Home from "./Home.jsx";
import BlogList from "./BlogList/BlogList.jsx";
import LocationProfile from "./LocationProfile/LocationProfile.jsx";
import CityPage from "./CityPage/CityPage.jsx";
import Destinations from "./Destinations.jsx";

const Main = props => {
  console.log('main props',props)
  return (
    <main>
      <Switch>

        <Route exact path='/' render={() => {
          return (
            <Home setNavFlagToDashboard={props.setNavFlagToDashboard}/>
          )
        }}/>

        <Route exact path='/blogs' render={() => {
          return (
            <BlogList blogs={props.blogs} setNavFlagToDashboard={props.setNavFlagToDashboard}/>
          )
        }}/>

        <Route exact path='/photos_videos' render={() => {
          return (
             <div>
              <PhotoGrid photos={props.photos} setNavFlagToDashboard={props.setNavFlagToDashboard}/>
            </div>
          )
        }}/>

         <Route exact path={`/${props.location}`} render={() =>
           <LocationProfile
             location={props.location}
             pointsOfInterest={props.pointsOfInterest}
            />}
         />

        <Route exact path='/destinations' render={() => {
            return (
              <div>
                <Destinations setNavFlagToDashboard={props.setNavFlagToDashboard}/>
              </div>
            )
        }}/>
      </Switch>
    </main>
    )
  };
export default Main;
