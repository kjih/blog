'use strict';

const express = require('express');
const router = express.Router();

const entries = require('../src/entries.js');

// Route: api/entries
router.route('/entries')
.get((req, res) => {
    // All entries
    try {
        res.status(200).json(entries.getAllEntries());
    } catch(e) {
        res.status(500).json("server error: unable to get blog entries");
    }
})
.post((req, res) => {
    // New entry
    try {
        var newEntry = entries.addEntry(req.body.title, req.body.body);

        res.status(201).json(newEntry);
    } catch(e) {
        res.status(500).json("server error: unable to add new entry");
    }
});

// Route: api/entries/{entryId}
router.route('/entries/:entryId')
.get((req, res) => {
    // Single entry
    try {
        var entry = entries.getEntry(req.params.entryId);

        if (entry == null) {
            res.status(404).json("entry not found");
        } else {
            res.status(200).json(entry);
        }
    } catch(e) {
        res.status(500).json("server error: unable to get blog entry");
    }
})
.put((req, res) => {
    // Edit entry
    try {
        var updatedEntry = entries.editEntry(req.params.entryId, 
                                             req.body.title, 
                                             req.body.body);

        if (updatedEntry == null) {
            res.status(404).json("entry not found");
        } else {
            res.status(200).json(updatedEntry);
        }
    } catch(e) {
        res.status(500).json("server error: unable to update entry");
    }
})
.delete((req, res) => {
    // Delete entry
    try {
        var deletedEntry = entries.deleteEntry(req.params.entryId);

        if (deletedEntry == null) {
            res.status(404).json("entry not found");
        } else {
            res.status(200).json(deletedEntry);
        }
    } catch(e) {
        res.status(500).json("server error: unable to delete entry");
    }
});

module.exports = router;