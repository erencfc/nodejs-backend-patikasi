const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Connect
mongoose.connect("mongodb://localhost/pcat-test-db");

const PhotoSchema = new Schema({
    title: String,
    description: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);

Photo.create({
    title: "Photo Title 2",
    description: "Photo description 2",
});

Photo.find({}, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
});

const id = "61b4a6caa7f8ed8f0dcda3e6";

Photo.findByIdAndUpdate(
    id,
    {
        title: "Photo Title 111 Updated",
        description: "Photo description 111 updated",
    },
    {
        new: true,
    },
    (err, data) => {
        if (err) return console.log(err);
        console.log(data);
    }
);

const id2 = "61b4a6d1d06bce8a8950f518";

Photo.findByIdAndDelete(id2, (err, data) => {
    console.log("Silindi.");
});
