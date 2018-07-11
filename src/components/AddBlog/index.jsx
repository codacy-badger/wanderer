import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Messages from "../Notifications/Messages";
import Errors from "../Notifications/Errors";

import { blogCreate } from "../../actions/blogs";

const titleRequired = value => (value ? undefined : "Title Required");

class Blog extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      token: PropTypes.object.isRequired
    }),
    blogs: PropTypes.shape({
      blogs: PropTypes.array,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array
    }).isRequired,
    blogCreate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  submit = blog => {
    const { client, blogCreate, reset } = this.props;
    blogCreate(client, blog);
    reset();
  };

  renderNameInput = ({ input, type, meta: { touched, error } }) => (
    <div>
      <input {...input} type={type} />
      {touched &&
        error && (
          <div
            style={{
              color: "#cc7a6f",
              margin: "-10px 0 15px",
              fontSize: "0.7rem"
            }}
          >
            {error}
          </div>
        )}
    </div>
  );

  render() {
    const {
      handleSubmit,
      invalid,
      blogs: { blogs, requesting, successful, messages, errors }
    } = this.props;

    return (
      <div className="blogs">
        <div className="blog-form">
          <form onSubmit={handleSubmit(this.submit)}>
            <h1>Create New Blog</h1>
            <label htmlFor="blog">Blog</label>
            <Field
              title="title"
              type="text"
              id="title"
              className="title"
              component={this.renderTitleInput}
              validate={titleRequired}
            />
            <label htmlFor="contents">Contents</label>
            <Field
              name="contents"
              type="text"
              id="contents"
              className="contents"
              component="input"
            />
            {/* add tags here once implemented */}
            <Button disabled={invalid} action="submit">
              Create
            </Button>
          </form>
          <hr />
          <div className="blog-messages">
            {requesting && <span>Creating blog...</span>}
            {!requesting &&
              !!errors.length && (
                <Errors
                  message="Failure to create Blog due to:"
                  errors={errors}
                />
              )}
            {!requesting &&
              successful &&
              !!messages.length && <Messages messages={messages} />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  blogs: state.blogs
});

const connected = connect(
  mapStateToProps,
  { blogCreate }
)(Blog);
const formed = reduxForm({
  form: "blogs"
})(connected);

export default formed;
