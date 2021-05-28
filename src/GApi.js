class GApi {

  API_KEY = 'AIzaSyBoHg4ioxQf7QvFtULXHKvkLnel6SbkSmo';
  SHEET_ID = '14AF9Y2m718WHMruhQ-vIYigJqP30Vje2JuDNnmIMWTI';

  rawResponse = null;

  constructor(gapi) {
    this.gapi = gapi;
  }

  async getRecommendations() {
    
    let done = null;
    const clientLoaded = new Promise( (resolve) => {
      done = resolve;
    });
    this.gapi.load('client', done);
    await clientLoaded;

    await this.gapi.client.init({
      'apiKey': this.API_KEY,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest']
    });
    
    try {
      this.rawResponse = await this.gapi.client.sheets.spreadsheets.values.get({
        'spreadsheetId': this.SHEET_ID,
        'range': 'recommendations!A1:Z'
      });

      const [ head, ...rows ] = this.rawResponse.result.values;

      const recommendations = rows.map(row => Object.assign(
        {}, ...head.map( (key, idx) => ({ [key]: row[idx] }) )
      ));

      return Promise.resolve(recommendations);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
}

export default GApi;