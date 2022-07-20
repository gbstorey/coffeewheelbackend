const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// ------------- GET --------------- //

router.get("/", async (req, res) => {
    try {
        let notes = await Note.find();
        res.status(200).json({
            status: 200,
            data: notes,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

router.get("/:noteId", async (req, res) => {
    try {
        let note = await Note.findOne({
            _id: req.params.noteId,
        });
        if (note) {
            res.status(200).json({
                status: 200,
                data: note,
            });
        }
        res.status(400).json({
            status: 400,
            message: "No note found",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// ------------------- POST ------------------//

router.post("/", async(req, res) => {
    try {
        let note = new Note(req.body);
        note = await note.save();
        res.status(200).json({
            status:200,
            data: note,
        });
    } catch (err) {
        res.status(400).json({
            status:400,
            message: err.message,
        });
    }
});

//--------------------- PUT -----------------//

router.put("/:noteId", async (req, res) => {
    try {
        let note = await Note.findByIdAndUpdate(req.params.noteId, req.body, {
            new: true,
        });
        if (note) {
            res.status(200).json({
                status:200,
                data: note,
            });
        }
        res.status(400).json({
            status: 400,
            message: "No note found",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

//--------------------- DELETE -----------------//

router.delete(":/noteId", async(req, res) => {
    try {
        let note = await Note.findByIdAndRemove(req.params.postId);
        if (note) {
            res.status(200).json({
                status:200,
                message: "Note deleted successfully",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "No note found"
            });
        }
    } catch (err) {
        res.status(400).json({
            status:400,
            message: err.message,
        });
    }
});

module.exports = router;