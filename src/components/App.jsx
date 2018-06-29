import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { hot } from "react-hot-loader";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CountriesAll from "./LocationProfile/CountriesAll";
import Sidebar from "./Sidebar/Sidebar";
import photos from "../../example data/pictures-of-japan.js";
import Header from "./Header.jsx";
import Stats from "./Stats.jsx";
import Main from "./Main.jsx";
import GlobalMap from "./GlobalMap/GlobalMap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: CountriesAll,
      location: "",
      pointsOfInterest: [],
      attractions: [],
      destinationsPast: ["Iceland", "Panama"],
      destinationsFuture: ["Hong Kong", "Kyoto"],
      blogs: [
        {
          blogId: "1",
          blogTitle: "WELCOME TO NIHON",
          blogAuthor: "BROICHI",
          blogContents: "YOLO SWAG"
        },
        {
          blogId: "2",
          blogTitle: "Ebisu Brewery",
          blogAuthor: "BROICHI",
          blogContents: "とりあえず 生 なま ビルください"
        }
      ],
      photos: photos,
      navFlag: "dashboard"
    };
    this.handleSelectedLocation = this.handleSelectedLocation.bind(this);
    this.getPointsOfInterest = this.getPointsOfInterest.bind(this);
    this.getAttractions = this.getAttractions.bind(this);
    this.setNavFlagToCountryorCity = this.setNavFlagToCountryorCity.bind(this);
    this.setNavFlagToDashboard = this.setNavFlagToDashboard.bind(this);
    this.addDestinationsPast = this.addDestinationsPast.bind(this);
    this.addDestinationsFuture = this.addDestinationsFuture.bind(this);
  }

  handleSelectedLocation(event) {
    event.preventDefault();
    this.setState({ location: event.target.value });
  }

  getPointsOfInterest() {
    axios
      .post("/getPointsOfInterest", { location: this.state.location })
      .then(data => this.setState({ pointsOfInterest: data.data }))
      .catch(err => console.log("error getting points of interest from app:", err));
  }

  getAttractions() {
    axios
      .post("/getAttractions", { location: this.state.location })
      .then(data => this.setState({ attractions: data.data }))
      .catch(err => console.log("error getting attractions from app:", err));
  }

  addDestinationsPast() {
    this.setState({
      destinationsPast: [...this.state.destinationsPast, this.state.location]
    });
  }

  addDestinationsFuture() {
    this.setState({
      destinationsFuture: [...this.state.destinationsFuture, this.state.location]
    });
  }

  setNavFlagToCountryorCity() {
    this.setState({
      navFlag: "countryOrCity"
    });
  }

  setNavFlagToDashboard() {
    this.setState({
      navFlag: "dashboard"
    });
  }

  render() {
    return (
      <div className="app">
        <center>
          <Typography variant="display2">
            Wanderer
          </Typography>
          <br />
          <GlobalMap />
        </center>

        <Sidebar
          handleSelectedLocation={this.handleSelectedLocation}
          getPointsOfInterest={this.getPointsOfInterest}
          getAttractions={this.getAttractions}
          location={this.state.location}
          setNavFlagToCountryorCity={this.setNavFlagToCountryorCity}
        />

        <center>
          <div>
            <select onChange={this.handleSelectedLocation}>
              {this.state.countries.map((country, ind) => (
                <option key={ind} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <Link to={`/${this.state.location}`}>
              <button
                onClick={() => {
                  this.setNavFlagToCountryorCity();
                  this.getPointsOfInterest();
                  this.getAttractions();
                }}
              >
                Search Country
              </button>
            </Link>

            <Header navFlag={this.state.navFlag}/>
            <Main
              location={this.state.location}
              blogs={this.state.blogs}
              photos={this.state.photos}
              setNavFlagToDashboard={this.setNavFlagToDashboard}
              pointsOfInterest={this.state.pointsOfInterest}
              attractions={this.state.attractions}
              destinationsPast={this.state.destinationsPast}
              destinationsFuture={this.state.destinationsFuture}
              addDestinationsPast={this.addDestinationsPast}
              addDestinationsFuture={this.addDestinationsFuture}
            />
          </div>
        </center>
      </div>
    );
  }
}

export default hot(module)(App);
