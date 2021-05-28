# git-gud

## Notes

### Setup GCP project for access to Google Sheets APIv4

1. Create a Google Cloud Platform (GCP) project ([ref](https://developers.google.com/workspace/guides/create-project#create_a_new_google_cloud_platform_gcp_project))

1. Enable Google Sheets API ([ref](https://developers.google.com/workspace/guides/create-project#enable-api))

1. Create an API key for Vue app ([ref](https://developers.google.com/sheets/api/guides/authorizing#APIKey))

    > Restritions:
    > 1. HTTP only
    > 1. authorized referrers (GitHub Pages & dev env!) only
    > 1. Google Sheets API only


### Pull data from Google Sheets

* API docs ([ref](https://developers.google.com/sheets/api/reference/rest))
* Example usage ([ref](https://github.com/google/google-api-javascript-client/blob/master/docs/samples.md#loading-an-api-and-making-a-request), [ref](https://github.com/google/google-api-javascript-client/blob/master/docs/start.md#option-1-load-the-api-discovery-document-then-assemble-the-request))


### UI built via Vue CLI

* https://cli.vuejs.org/guide/creating-a-project.html#vue-create
* npx @vue/cli create --default git-gud


### Static Site Host - GitHub Pages

* https://github.com/btlghrants/git-gud/
* https://btlghrants.github.io/git-gud/
