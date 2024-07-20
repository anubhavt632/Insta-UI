import React, { Component } from "react";
import "./index.css";
import { Hourglass } from "react-loader-spinner";
import PostItem from "../PostItem";
import { FaSearch } from "react-icons/fa";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class InstaPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      postResults: [],
      apiStatus: apiStatusConstants.initial,
      searchInput: "",
    };
  }
  componentDidMount() {
    this.getInstaPosts();
  }

  renderInstaPostsLoaderView = () => {
    return (
      <div className="loader-container">
        <Hourglass height="40" width="40" color="#4094EF" />
      </div>
    );
  };

  onTryAgain = () => this.getInstaPosts();

  renderInstaPostFailureView = () => {
    return (
      <div className="failure-container">
        <img
          src="https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719273600&semt=ais_user"
          alt="webpage failure"
          className="failure-alert-icon"
        />
        <p className="failure-desc">Something went wrong. Please try again.</p>
        <button className="failure-retry-button" onClick={this.onTryAgain}>
          Try again
        </button>
      </div>
    );
  };

  renderInstaPostSuccessView = () => {
    const { postResults } = this.state;
    return (
      <ul>
        {postResults.map((post) => {
          return <PostItem key={post.id} postDetails={post} />;
        })}
      </ul>
    );
  };

  renderListPostsSwitch = () => {
    switch (this.state.apiStatus) {
      case apiStatusConstants.success:
        return this.renderInstaPostSuccessView();
      case apiStatusConstants.inProgress:
        return this.renderInstaPostsLoaderView();
      case apiStatusConstants.failure:
        return this.renderInstaPostFailureView();
      default:
        return null;
    }
  };

  getInstaPosts = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const url =
      "https://pixabay.com/api/?key=44908865-06f1bafc930765b4e90f82a58&image_type=photo&pretty=true";
    const options = {
      method: "GET",
      apiStatus: apiStatusConstants.inProgress,
    };

    const response = await fetch(url, options);

    if (response.ok) {
      //request is successful
      const data = await response.json();
      this.setState({
        allPosts: data.hits,
        postResults: data.hits,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      //request is unsuccessful
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };
  onSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  onSearchButtonClicked = () => {
    const { searchInput, allPosts } = this.state;
    const filteredPosts = allPosts.filter((post) => {
      let user = post.user.toLowerCase();
      let searchedUser = searchInput.toLocaleLowerCase();
      if (user.includes(searchedUser)) return true;
      return false;
    });
    this.setState({ postResults: filteredPosts });
  };
  render() {
    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search User"
              className="search-input-field"
              value={this.state.searchInput}
              onChange={this.onSearchInput}
            />
            <div className="search-icon-container">
              <button
                className="search-icon-button"
                onClick={this.onSearchButtonClicked}
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
          </div>
          {/* Here i want to check if the request is successful, in progress, failure */}
          {this.renderListPostsSwitch()}
        </div>
      </div>
    );
  }
}
export default InstaPosts;
