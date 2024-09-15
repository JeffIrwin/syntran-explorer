
import express from "express";
//import path from "path";
import * as path from 'path';
import { dirname } from 'path';
import bodyParser from "body-parser";

import { spawnSync } from "child_process";
//const child_process = require('child_process');
//const spawnSync = child_process.spawnSync;

//const AU = require('ansi_up');
//import default from "ansi_up";
//const ansi_up = new AU.default;
import { AnsiUp } from 'ansi_up'
var ansi_up = new AnsiUp();

const app = express();

let port = 3000;
if (process.env.NODE_ENV === "production") {
    console.log("prod");
} else {
    // staging
    console.log("stg");
    port = 3001;
    //document.getElementById("heading1").innerText = "Syntran explorer staging"
}

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML) from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(dirname, 'public')));
app.use(express.static('public'));

import multer from "multer";
//let multer = require('multer');
let upload = multer();

// Route to handle form submission
app.post('/submit', upload.fields([]), (req, res) => {
    console.log(req.body);
    const text = req.body.text;

    // Response text
    let res_text = "";

    //// Echo the input
    //res_text = "Submitted text = ```" + text + "```\n\n";

    // TODO: display this in a header instead.  Maybe need another req/res
    // route for the main page
    if (process.env.NODE_ENV !== "production") {
        res_text += "[staging]\n";
    }

    //let sy_cmd = spawnSync("syntran", ["-c", arg]);
    let sy_cmd = spawnSync("syntran", ["-q", "-c", text]);
    
    // syntran just always returns 0 for "-c".  Need to fix it there
    // instead of trying to hack return status based on number of
    // lines
    let lines = ("" + sy_cmd.stdout).split("\n");
    console.log("lines = ", lines);

    //res_text = res_text + "Result:\n\n";
    //res_text = res_text + lines;

    let sy_out = lines.join("\n");
    //let sy_out = lines.join("<br>");

    //let html = ansi_up.ansi_to_html(txt);
    let html = ansi_up.ansi_to_html(sy_out);

    //res_text = res_text + lines.join("\n");
    //res_text += html;
    res_text = html;

    res.send(res_text);
});

// Start the server
//
// If you run on aws, this will be accesible via the instance's public ip.  You
// need to add an inbound rule to the security group to allow traffic
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

