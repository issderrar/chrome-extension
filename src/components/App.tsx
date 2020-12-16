import React from "react";
import "./App.scss";


interface IProps {
}

interface State {
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
            fullName: response.fullName,
            title: response.title,
            country: response.country,
            imageUrl: response.imageUrl
          });
        });
      });
    }
  }

  render() {
    return <div style={{padding : '0, 5%, 0, 5%'}}>
      <h1 className={"text-center"}> Fiche de l'utilisateur </h1>
      <div className="flex justify-center">
      <img src={this.state.imageUrl} alt="" />
      <ul className={"list"}>
        <li>Nom : {this.state.fullName}</li>
        <li>Poste : {this.state.title}</li>
        <li>Localisation : {this.state.country}</li>
      </ul>
      </div>
    </div>;
  }
}

export default App;
