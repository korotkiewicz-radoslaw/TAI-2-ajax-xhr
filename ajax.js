let method = 'GET';
// let url = 'http://localhost/ajax/test.txt';
let url = 'http://localhost/ajax/firma.json';
let data = null;

let getBundle = () => {
	console.log('helo ajax');

	const xhr = new XMLHttpRequest();
	xhr.responseType = 'json';

	xhr.open(method, url, async=true);
	xhr.send();
	console.log(xhr.response);

	xhr.addEventListener('readystatechange', (e) => {
		if (xhr.readyState !== 4) {
			console.log(xhr.readyState);
		}
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('sa kalesonki sa');
				console.log(xhr);
			}

			if (xhr.status === 404) {
				console.log('zasob nieodnaleziony');
			}

			if (xhr.status === 500) {
				console.log('server padl');
			}

			if (xhr.status === 503) {
				console.log('retry in 321');
			}
		}
	});

	xhr.addEventListener('load', (e) => {
		console.log(xhr.response);
		data = xhr.response;
		console.log(data);
		if (data !== null) {
			let i = 1;
			let timeInt = 1000;
			console.log(i);
			let t1 = setInterval(() => {
				if (i == data.length-1)
					clearInterval(t1);
				insItem(i++, data[i]);
			}, timeInt);
			// data.forEach(item => insItem(i++, item));
		}
	});
}

let insItem = (i, item) => {
	console.log(item);
	let main = document.querySelector('#main');
	let tpl = document.querySelector('#rowTplt');
	let r2 = tpl.content.cloneNode(true);
	let rid = r2.querySelector('#row-');
		rid.id = rid.id+i;
	cells = r2.querySelectorAll('p');
	cells[0].textContent = i;
	cells[1].textContent = item.imie;
	cells[2].textContent = item.nazwisko;
	cells[3].textContent = item.stanowisko;
	main.appendChild(r2);
	// addNavItem(i);
}

window.addEventListener('load', getBundle, false);
