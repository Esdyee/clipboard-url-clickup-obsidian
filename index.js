const clipboardListener = require('clipboard-event');
const clipboardy = require('node-clipboardy');
const activeWin = require('active-win');

const { exec } = require('child_process');

// To start listening
clipboardListener.startListening();

clipboardListener.on('change', () => {
	const text = clipboardy.readSync();
	activeWin().then(window => {
		if(window.owner.name === 'ClickUp' && text.startsWith('obsidian://open')) {
			execObsidian(text);
		}
	});
});

//obsidian://open?vault=SYMC&file=X-%EC%B0%B8%EA%B3%A0%EC%9E%90%EB%A3%8C%2Ftest
function execObsidian(url) {

	const command = url.split('?')[0];
	const params = url.split('?')[1];
	const searchVault = params.split('&')[0];
	const searchFile = params.split('&')[1];

	// Obsidian 앱에서 특정 노트 열기
	exec(`start ${command}?${searchVault}`, (err, stdout, stderr) => {
		if (err) {
			console.error("err", err);
			return;
		}
		//start obsidian://open?file=z-file%2Ftest
		exec(`start ${command}?${searchFile}`, (err, stdout, stderr) => {
			if (err) {
				console.error("err", err);
				return;
			}
		});
	});

}

