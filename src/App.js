import React from 'react';
import './styles/index.scss';
import DisplayOptionsForm from './components/DisplayOptionsForm';
import getData from './hooks/getData';
import DisplayPhones from './pages/DisplayPhones';
import { Alert } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: '',
      displayAllPhones: false,
      data: [],
      searchValue: ''
    }
  }

  /**
   * Sets the displayAllPhones state to true or false depending on which display the user wants to see.
   * @param {String} selectedOption - whichever radio button value the user selects (from DisplayOptionsForm.js).
   */
  setDisplay = (selectedOption) => {
    this.setState({ displayAllPhones: selectedOption !== 'currentPhones' ? true : false })
  }

  /**
   * Sets the searchValue state to whatever the user searched for.
   * @param {String} searchValue - The phone the user searched for (in lower case) - (from DisplayOptionsForm.js).
   */
  setSearch = (searchValue) => {
    this.setState({ searchValue });
  }

  // Fetches all the budget phones in the data, sorts them, and adds them to state.
  getBudgetPhones = (data) => {
    let budgetPhonesArr = [];
    data.map(dataFile => {
      return dataFile.rowData.filter(phone => {
        return phone.tier === 'budget';
      }).map(phone => budgetPhonesArr.push(phone));
    });
    budgetPhonesArr.sort((a, b) => {
      const date1 = new Date(this.getReleasedDate(a.released));
      const date2 = new Date(this.getReleasedDate(b.released));
      return date2 - date1;
    });
    return budgetPhonesArr;
  }

  /**
   * Reformats a phone's release date to a date that new Date can recognize in order to sort.
   * @param {String} released - The release date of the phone (ex: Mar. 4th, 2024 (USA)).
   * @returns {Date} - A Date string (ex: Mar. 4, 2024).
   */
  getReleasedDate = (released) => {
    released = released.split(" ");
    released.pop();
    let pattern = new RegExp(/[^\d]*/, 'gm');
    released[1] = released[1].replace(pattern, '');
    return released.join(" ");
  }

  // Loads the budget phones to display on page
  async componentDidMount() {
    try {
      const rowData = await Promise.all([
        getData('pixels'),
        getData('samsung-s'),
        getData('samsung-a'),
        getData('iphones'),
        getData('oneplus'),
        getData('foldables')
      ]);

      let data = [
        { name: 'Pixel', rowData: rowData[0] },
        { name: 'Samsung S', rowData: rowData[1] },
        { name: 'Samsung A', rowData: rowData[2] },
        { name: 'Apple', rowData: rowData[3] },
        { name: 'OnePlus', rowData: rowData[4] },
        { name: 'Foldable', rowData: rowData[5] },
      ];
      let budgetPhoneData = this.getBudgetPhones(data);
      this.setState({ data: [...data, { name: 'Budget', rowData: budgetPhoneData }], isLoading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: 'sorry, there has been a server error :( please try again later' });
    }
  }

  render() {
    return (
      <>
        {this.state.error && <Alert variant='danger' className='m-3'>{this.state.error}</Alert>}
        {!this.state.isLoading && (
          <div>
            <DisplayOptionsForm display={this.setDisplay} setSearch={this.setSearch} />
            <DisplayPhones data={this.state.data} displayAllPhones={this.state.displayAllPhones} searchValue={this.state.searchValue} />
            <section className="company-links">
              {/* Google */}<a href="https://store.google.com/us/category/phones" target="_blank" rel="noreferrer"><img src="assets/imgs/logos/pixel-logo.webp" alt="Google logo" /></a>
              {/* Apple */}<a href="https://www.apple.com/iphone/" target="_blank" rel="noreferrer"><img src="assets/imgs/logos/apple-logo.webp" alt="Apple logo" /></a>
              {/* Samsung */}<a href="https://www.samsung.com/us/mobile/phones/all-phones/" target="_blank" rel="noreferrer"><img src="assets/imgs/logos/samsung-logo.webp" alt="Samsung logo" /></a>
              {/* OnePlus */}<a href="https://www.oneplus.com" target="_blank" rel="noreferrer"><img src="assets/imgs/logos/oneplus-logo.webp" alt="OnePlus logo" /></a>
              {/* Asus */}<a href="https://www.asus.com/us/Phone/" target="_blank" rel="noreferrer"><img src="assets/imgs/logos/asus-logo.webp" alt="Asus logo" style={{ height: 40 }} /></a>
            </section>
          </div>
        )}
      </>
    )
  }
}

export default App;
