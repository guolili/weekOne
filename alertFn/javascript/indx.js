class AlertFn {
	constructor() {
		this.mainFn();
	}
	createFn(ele, cls, inf) {
		const element = document.createElement(ele);
		element.className = cls;
		element.innerHTML = inf;
		return element;
	}
	mainFn() {
		const wrap = this.createFn('div', 'wrap', ' ');
		const mark = this.createFn('div', 'mark', ' ');
		const btn1 = this.createFn('button', 'btn1', 'SURE');
		const tit = this.createFn('h2', 'tit', '!!!腊八节快乐!!!');
		const clos = this.createFn('b', 'close', 'X');
		document.body.appendChild(mark);
		mark.appendChild(wrap);
		wrap.appendChild(tit);
		wrap.appendChild(btn1);
		wrap.appendChild(clos);
		// const mk = document.querySelector('.mark');
		this.domFn(mark);
	}
	domFn(ele) {
		const btn = document.querySelector('.btn1');
		const clos = document.querySelector('.close');
		clos.addEventListener('click', () => {
			document.body.removeChild(ele);
		})
		btn.addEventListener('click', () => {
			location.href = 'http://www.baidu.com';
		})
		/*clos.addEventListener('click', function() {
			document.body.removeChild(ele);
		})
		btn.addEventListener('click', function () {
			location.href = 'http://www.baidu.com';
		})*/
	}
}