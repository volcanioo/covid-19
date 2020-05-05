import React from "react";

export default class GetCountryDataById extends React.Component {
  render() {
    return (
      <div>
        <ul>
          { this.props.CurrentCountryData.map(c => <li key={c.Country}>{c.Cases}</li>) }
        </ul>
      </div>
    );
  }
}
