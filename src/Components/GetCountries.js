import React from "react";
import axios from "axios";
import GetCountryDataById from "./GetCountryDataById";

export default class GetCountries extends React.Component {
  state = {
    Countries: [],
    SelectedCountry: [],
  };

  componentDidMount() {
    axios.get(`https://api.covid19api.com/countries`).then(res => {
      this.setState({Countries: res.data});
    })
  }

  handleChange = (event) => {
    const CurrentCountry = event.target.value;
    this.setState({ IsLoading: true }, () => {
      axios.get(`https://api.covid19api.com/total/dayone/country/${CurrentCountry}/status/confirmed`)
        .then(result => this.setState({
          IsLoading: false,
          SelectedCountry: [...result.data],
        }));
    });
  };

  render() {
    return (
      <div>
        <select onChange={this.handleChange}>
          { this.state.Countries.map(Country => <option value={Country.Slug} key={Country.Slug}>{Country.Country}</option>) }
        </select>
        {(this.state.IsLoading) ? <p>Loading</p> : <GetCountryDataById CurrentCountryData={this.state.SelectedCountry} />}
      </div>
    );
  }
}
