import React from "react";
import Row from "../components/sub-components/Row";
import "../styles/DisplayPhones.scss";

class DisplayPhones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // rows: ['pixel', 'samsung', 'apple', 'oneplus', 'huawei', 'budget', 'foldable']
      rows: ['Pixel', 'Samsung S', 'Apple', 'OnePlus']
    }
  }

  /**
   * Gets the first word in the title of the row
   * @param {String} row - The title of the row
   * @returns {String} - The first word in the title of the row
   */
  getRowTitle = (row) => {
    let array = row.split(" ");
    return array[0];
  }

  /**
   * Sends only phones for the matching row that are current (released in 2021 or sooner).
   * @param {String} row - The title of the row I want to display phones in.
   * @returns {Object} - An array of either all the phone or just the current phones.
   */
  determineData = (row) => {
    let dataArray = this.props.data.filter(rowData => rowData.name.includes(row)); // gets only matching row's data and puts it in new array
    if (this.props.displayAllPhones === true) {
      return dataArray[0].rowData;
    } else {
      return dataArray[0].rowData.filter(phone => parseInt(phone.year) >= 2021);
    }
  }

  render() {
    return(
      <>
        {/* Creates a row with a scroll thing for each row title in rows[] */}
        {this.state.rows.map((row, index) => 
          <section key={index}>
            {/* Labels row and puts photo next to each title */}
            <div id={this.getRowTitle(row)} className="row-header">
              <h2>{row} Phones</h2>
              <img src={`assets/imgs/logos/${this.getRowTitle(row)}-logo.webp`} alt={`${this.getRowTitle(row)} logo`}/>
            </div>
            <Row data={this.determineData(this.getRowTitle(row))}/>
          </section>
        )}
      </>
    )
  }
}

export default DisplayPhones;