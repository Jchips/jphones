import React from "react";
import Row from "../components/sub-components/Row";
import "../styles/DisplayPhones.scss";

class CurrentPhones extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      // rows: ['pixel', 'samsung', 'apple', 'oneplus', 'huawei', 'budget', 'foldable']
      rows: ['pixel', 'samsung']
    }
  }

  /**
   * Sends only phones for the matching row that are current (released in 2021 or sooner).
   * @param {String} row - The title of the row I want to display phones in.
   * @returns {Array} - An array of either all the phone or just the current phones.
   */
  determineData = (row) => {
    let dataArray = this.props.data.filter(rowData => rowData.name.includes(row));
    if (this.props.displayAllPhones === true) {
      return dataArray[0].rowData;
    } else {
      return dataArray[0].rowData.filter(phone => parseInt(phone.year) >= 2021);
    }
    // return dataArray[0].rowData.filter(phone => parseInt(phone.year) >= 2021);
  }

  render() {
    return(
      <>
        {/* Creates a row with a scroll thing for each row title in rows[] */}
        {this.state.rows.map((row, index) => 
          <section key={index}>
            {/* Labels row and puts photo next to each title */}
            <div className="row-header">
              <h2>{row} phones</h2>
              <img src={`assets/imgs/logos/${row}-logo.webp`} alt={`${row} logo`}/>
            </div>
            <Row data={this.determineData(row)}/>
          </section>
        )}
      </>
    )
  }
}

export default CurrentPhones;