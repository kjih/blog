'use strict';

// entries.js JSON saved on disk implementation

const fs = require('fs');
const jsonPath = 'server/data/entries.json';

var getAllEntries = () => {
	return getDataFromDisk().entries;
}

var getEntry = (entryId) => {
	var entryWithId = getEntryWithId(entryId, getDataFromDisk().entries);

	return entryWithId;
}

var addEntry = (title, body) => {
	var data = getDataFromDisk();
	var newEntry = buildEntry(data.nextId, title, body);

	data.nextId++;
	data.entries.push(newEntry);

	writeDataToDisk(data);

	return newEntry;
}

var editEntry = (entryId, title, body) => {
	var data = getDataFromDisk();
	var entryWithId = getEntryWithId(entryId, data.entries);

	entryWithId.title = title;
	entryWithId.body = body;

	writeDataToDisk(data);

	return entryWithId;
}

var deleteEntry = (entryId) => {
	var data = getDataFromDisk();
	var entryWithId = getEntryWithId(entryId, data.entries);

	data.entries = data.entries.filter(entry => entry.id != entryId);

	writeDataToDisk(data);

	return entryWithId;
}

module.exports = {
	getAllEntries,
	getEntry,
	addEntry,
	editEntry,
	deleteEntry
}

// Helpers
var buildEntry = (id, title, body) => {
	var entry = {
		"id": id,
		"lastModified": Date.now(),
		"title": title,
		"body": body
	}

	return entry;
}

var getEntryWithId = (entryId, entries) => {
	return entries.filter(entry => entry.id == entryId)[0];
}

var getDataFromDisk = () => {
	try {
		var entriesData = fs.readFileSync(jsonPath);

		return JSON.parse(entriesData);
	} catch(e) {
		throw e;
	}
}

var writeDataToDisk = (data) => {
	try {
		fs.writeFile(jsonPath, JSON.stringify(data));
	} catch(e) {
		throw e;
	}
}