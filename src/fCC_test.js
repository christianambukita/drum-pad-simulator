const FCC_URL =
	'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js';

function fccTest() {
	let head = document.getElementsByTagName('head')[0];
	let script = document.createElement('script');
	script.src = FCC_URL;
	head.appendChild(script);
}

export default fccTest;
