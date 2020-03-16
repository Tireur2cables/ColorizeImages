const fs = require('fs');
const deepai = require('deepai');
const request = require('request');

deepai.setApiKey('00d2d1d1-f988-4edd-be31-08898ca3cbe2');

(async function() {
	const dir = "./colorized/";
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	let name = "0000";
    var resp = await deepai.callStandardApi("colorizer", {
            image: fs.createReadStream("./exemple/" + name +".jpeg"),
    });
	let url = resp.output_url;
	let file = fs.createWriteStream(dir + name + ".jpg");
    const sendReq = request.get(url);
    sendReq.on('response', () => {
        sendReq.pipe(file);
    });
    console.log("Done.");
})()
