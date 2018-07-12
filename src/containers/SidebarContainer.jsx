import { connect } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { setHeader, getFriendsList, changeSelectedLocation } from "../actions"

const mapStateToProps = state => {
  return {
    headerSetting: state.headerSetting,
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = dispatch => ({
  setHeader: term => dispatch(setHeader(term)),
  changeSelectedLocation: term => dispatch(changeSelectedLocation(term)),
  getFriendsList: id => dispatch(getFriendsList(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
