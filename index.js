const fs = require('fs');
const deepai = require('deepai');
const request = require('request');

deepai.setApiKey('00d2d1d1-f988-4edd-be31-08898ca3cbe2');

(async function() {
	//initialise le dossier contenant les images sinon exit
	const inputDir = "./input/";
	if (!fs.existsSync(inputDir)) {
		console.error("Can't find input directory");
		process.exit(1);
	}
	//initialise le dossier de retour des images ou le créer s'il n'existe pas
	const outputDir = "./colorized/";
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}
	try {
        // Get the files as an array
        const files = await fs.promises.readdir(inputDir);

        // Loop them all with the new foreach
        for( const file of files ) {
			//ask deepai to colorize image
			var resp = await deepai.callStandardApi("colorizer", {
					image: fs.createReadStream(inputDir + file),
			});
			//get url of deepai return
			let url = resp.output_url;
			//create a file with the image from the url
			let newFile = fs.createWriteStream(outputDir + file);
			const sendReq = request.get(url);
			sendReq.on('response', () => {
				sendReq.pipe(newFile);
			});
			//verbose mode
			console.log(file);
        }
		//fin du programme
		console.log("Done.");
    }
    catch( e ) {
        // Catch anything bad that happens
        console.error( "We've thrown! Whoops!", e );
    }
})()
