import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
  LocationStats,
  LocationBasicInfo,
  PointsOfInterest
} from "../WrappedContainers";

const LocationProfile = ({
  location,
  userId,
  addVisitedDestination,
  addFaveDestination
}) => {
  return (
    <div className="location-profile">
      <Typography variant="display2" gutterBottom>
        {location}
      </Typography>

      <LocationStats />

      <div className="add-location-options">
        <Button
          type="submit"
          variant="raised"
          color="primary"
          size="small"
          onClick={() => addVisitedDestination(userId, location)}
        >
          {"I've Been Here"}
        </Button>
        <Button
          type="submit"
          variant="raised"
          color="primary"
          size="small"
          onClick={() => addFaveDestination(userId, location)}
        >
          {"I Want To Go Here!"}
        </Button>
      </div>

      <LocationBasicInfo />

      <PointsOfInterest />

      {/* <div>
        <h2>Fun Facts About {location}:</h2>
        <ul>
          {this.state.funFacts.map((fact, ind) => (
            <li key={ind}>{fact}</li>
          ))}
        </ul>
      </div> */}
    </div> // close country-page div
  );
};

LocationProfile.propTypes = {
  location: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  addVisitedDestination: PropTypes.func.isRequired,
  addFaveDestination: PropTypes.func.isRequired
};

export default LocationProfile;
