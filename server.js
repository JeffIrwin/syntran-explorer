
import { AnsiUp } from 'ansi_up'
import { spawnSync } from "child_process";
import express from "express";
import multer from "multer";
import fs from "node:fs";
import tmp from "tmp";

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
app.use(express.urlencoded({ extended: true }));

// Serve static files (like HTML) from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(dirname, 'public')));
app.use(express.static('public'));

let upload = multer();
let ansi_up = new AnsiUp();

// Route to handle form submission
app.post('/submit', upload.fields([]), (req, res) => {
    //console.log(req.body);
    let sy_in = req.body.text;

    // Get rid of Windows line endings for proper line numbers in error messages
    sy_in = sy_in.replace(/\r/g, "");

    // Response text
    let res_text = "";

    //// Echo the input
    //res_text = "Submitted text = ```" + sy_in + "```\n\n";

    // TODO: display this in a header instead.  Maybe need another req/res
    // route for the main page
    if (process.env.NODE_ENV !== "production") {
        res_text += "[staging]\n\n";
    }

    // Write syntran input to a temp file.  Syntran can also take a program as
    // a cmd arg with "-c", but the shell might have limits on how long it can
    // be
    const tmpobj = tmp.fileSync();
    console.log('File: ', tmpobj.name);
    try {
        fs.writeFileSync(tmpobj.name, sy_in);
    } catch (err) {
        console.error(err);
    }
    //let sy_cmd = spawnSync("syntran", ["-q", "-c", sy_in]);

    let sy_out = "";
    try {

	const timeout_ms = 10 * 1000;

        // `--quiet` hides the version banner and "interpretting file <name>"
        let sy_cmd = spawnSync("syntran", ["--quiet", tmpobj.name], {timeout: timeout_ms});
        //let sy_cmd = spawnSync("syntran", [tmpobj.name]);

	// We can set the timeout, but there doesn't seem to be a way to tell
	// whether the process exceeded it or not.  It just gets killed without
        // throwing any error

        let lines = ("" + sy_cmd.stdout).split("\n");
        console.log("lines = ", lines);
        sy_out = lines.join("\n");

    } catch (err) {
        console.error(err);
    }

    // We're done with the temp file.  This is allegedly optional
    tmpobj.removeCallback();

    //res_text = res_text + "Result:\n\n";
    //res_text = res_text + lines;

    //sy_out = lines.join("<br>");

    res_text += sy_out;

    //let html = ansi_up.ansi_to_html(sy_out);
    let res_html = ansi_up.ansi_to_html(res_text);

    res.send(res_html);
});

// Start the server
//
// If you run on aws, this will be accesible via the instance's public ip.  You
// need to add an inbound rule to the security group to allow traffic
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

