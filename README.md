# Blog

Simple blog application that stores entries on disk.

Purpose: to get familiar with Node<span></span>.js and Express.

## Usage
#### `npm start`
Builds Angular artifacts to `dist/` and starts server at [http://localhost:3000](http://localhost:3000).

## API Routes
`/api/entries`
* GET : Get all entries
* POST : Create new entry

`/api/entries/{entryId}`
* GET : Get entry by ID
* PUT : Edit entry
* DELETE : Delete entry