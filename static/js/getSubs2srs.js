const fs = require('fs');
document.getElementById("downloadSubs2srs").addEventListener("click", getSubs2srs)
function getSubs2srs() 	{
	//document.getElementById("downloadSubs2srs").innerHTML = "poop"
	fs.stats('Subs2srs日本語.pdf', (err, stats) => {
		if (err) throw err;
		document.getElementById("downloadSubs2srs").innerHTML = "I see it!!";
	});
}
