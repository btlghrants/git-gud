import { zipObj } from 'ramda';

export class DataService {
  API_KEY = 'AIzaSyBoHg4ioxQf7QvFtULXHKvkLnel6SbkSmo';
  SHEET_ID = '14AF9Y2m718WHMruhQ-vIYigJqP30Vje2JuDNnmIMWTI';

  // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchGet
  apiResponse = null;
  
  constructor(gapi = window.gapi || global.api) {
    this.gapi = gapi;
  }

  // https://github.com/google/google-api-javascript-client/blob/master/docs/start.md
  async load() {
    await new Promise((resolve) => this.gapi.load('client', resolve));
        
    await this.gapi.client.init({
      'apiKey': this.API_KEY,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest']
    });

    // batch call to avoid any GCP quota issues
    // https://developers.google.com/sheets/api/limits
    return this.gapi.client.sheets.spreadsheets.values
      .batchGet({
        'spreadsheetId': this.SHEET_ID,
        'ranges': [
          'lookups!A1:A', // levels
          'lookups!B1:B', // roles
          'lookups!C1:C', // focuses
          'lookups!D1:D', // qualities
          'lookups!E1:E', // topics
          'lookups!F1:F', // modalities
          'recommendations!A1:Z'
        ]
      })
      .then(resp => this.apiResponse = resp)
      .catch(err => err);
  }

  valuesFor(range) {
    if (! this.apiResponse) { return [] }

    const [ head, ...rows ] = this.apiResponse.result.valueRanges
      .find(vr => vr.range.startsWith(range))
      .values;

    return rows.map((row, idx) => {
      // join header & cell into { key: value }
      let datum = zipObj(head, row);

      // add row index as object id for vue to use as render key
      datum.id = idx;

      return datum;
    });
  }

  get recommendations() {
    return this.valuesFor('recommendations!');
  }

  get levels() {
    return this.valuesFor('lookups!A1');
  }

  get roles() {
    return this.valuesFor('lookups!B1');
  }

  get focuses() {
    return this.valuesFor('lookups!C1');
  }

  get qualities() {
    return this.valuesFor('lookups!D1');
  }

  get topics() {
    return this.valuesFor('lookups!E1');
  }

  get modalities() {
    return this.valuesFor('lookups!F1');
  }
}

export default new DataService();