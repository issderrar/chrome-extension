import React from "react";
import "./App.scss";


interface IProps {}
interface State{
  fullName: string;
  title: string;
  country: string;
  imageUrl: string;

}

export class App extends React.Component<{}, State> {
state = {} as State;

  public componentDidMount() {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id || 0, { from: "popup", subject: "getFullName" }, response => {
          console.log(response);
          this.setState({
            fullName : response.fullName,
            title : response.title,
            country : response.country,
            imageUrl : response.imageUrl
          })
        });
      });
    }
  }

  render() {
    return <div className="app">Hello world;
    <ul>
    <li>{this.state.fullName}</li>
    <li>{this.state.title}</li>
    <li>{this.state.country}</li>
      <img src={this.state.imageUrl} alt="" />
    </ul>
    </div>
  }
}

export default App;
