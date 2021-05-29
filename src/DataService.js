export class DataService {

  API_KEY = 'AIzaSyBoHg4ioxQf7QvFtULXHKvkLnel6SbkSmo';
  SHEET_ID = '14AF9Y2m718WHMruhQ-vIYigJqP30Vje2JuDNnmIMWTI';

  response = null;

  constructor(gapi = window.gapi || global.api) {
    // expects to find Google API Client for Javascript in global scope, but
    //  accepts constructor injection to facilitate ease of testing.
    //  https://github.com/google/google-api-javascript-client/blob/master/docs/start.md
    this.gapi = gapi;
  }

  async load() {
    await new Promise((resolve) => this.gapi.load('client', resolve));
        
    await this.gapi.client.init({
      'apiKey': this.API_KEY,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest']
    });
    
    return this.gapi.client.sheets.spreadsheets.values
      .get({
        'spreadsheetId': this.SHEET_ID,
        'range': 'recommendations!A1:Z'
      })
      .then(response => this.response = response)
      .catch(error => error);
  }

  get recommendations() {
    if (! this.response) { return [] }
    
    const [ head, ...rows ] = this.response.result.values;

    return rows.map(row => Object.assign(
      {}, ...head.map( (key, idx) => ({ [key]: row[idx] }) )
    ));
  }
}

export default new DataService();