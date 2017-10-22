class createCalendar {

	constructor() {
		document.getElementById('root').innerHTML = '';

		this.wrapper = document.createElement('DIV');
		this.wrapper.className = "calendar__wrapper";
		document.getElementById('root').appendChild(this.wrapper);

		this.header = document.createElement('DIV');
		this.header.className = "calendar__header";
		this.header.innerHTML ='<div class="calendar__ruler"></div>\
		<div class="calendar__title"></div>\
		<div class="calendar__ruler"></div>';
		this.wrapper.appendChild(this.header);

		this.calendar = document.createElement('DIV');
		this.calendar.className = "calendar";
		this.wrapper.appendChild(this.calendar);

		
  		this.buildCalendar(2017, 10, this.calendar);

		eventBus.on('create-calendar', this.addTitle.bind(this));
		eventBus.on('create-calendar', this.addRulers.bind(this));

		this.addTitle();
	}

	addTitle(data) {
		document.getElementsByClassName('calendar__title')[0].innerHTML = data['title'];
	}

	addRulers(data) {
		console.log(data.title);
		if (data.rulers === true) {
			var prevMonth = document.createElement('BUTTON');
			prevMonth.className = "calendar__ruler";
			prevMonth.innerHTML = "<";
			this.header.appendChild(prevMonth);

			var nextMonth = document.createElement('BUTTON');
			nextMonth.className = "calendar__ruler";
			nextMonth.innerHTML = ">";
			this.header.appendChild(nextMonth);
		}
	}

	addCreateNotes(event) {
		if (!data.notes) {

							var target = event.target;

				while (target !== table && target.innerHTML !== '') {
					if (target.tagName == 'TD') {

						var noteInput = prompt('Add text note here:');
						if (noteInput) {
							var noteBlock = CreateNoteElement(noteInput);
							target.appendChild(noteBlock);
							AddNoteToLocalStorage(target.id, { id: 1, text: noteInput });
						}
						return;
					}

					if (settingsDeleteNote.checked == false && target.nodeName == 'BUTTON') {
						RemoveNoteFromLocalStorage(target.parentNode.parentNode.id, target.parentNode.id);
						target.parentNode.parentNode.removeChild(target.parentNode);
					} else {
						return;
					}

					target = target.parentNode;
				}
			
		}
	}

	fixDays(weekday) {
		if (weekday == 0) {
			weekday = 7;
		}
		return weekday;
	}

	buildCalendar(year, month, html) {
		var monthNameArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		//var titleValue = settingsCreateTitle.value;
		var d = new Date(year, month - 1, 1);
		var n = new Date(year, month, 0);
		
		var table = '<table class="calendar__table"><tr>';

		if (this.fixDays(d.getDay()) > 1) {
			for (var i = 1; i < this.fixDays(d.getDay()); i++) {
				table += '<td class="calendar__table-cell calendar__table-cell-empty">' + " " + '</td>';
			}
		}

		for (var i = 1; i <= n.getDate(); i++) {
			table += '<td class="calendar__table-cell">' + i + '</td>';
			if (this.fixDays(d.getDay()) == 7) {
				table += '</tr><tr>';
			}
			d.setDate(d.getDate() + 1);
		}

		if (this.fixDays(n.getDay()) < 7) {
			for (var i = this.fixDays(n.getDay()); i < 7; i++) {
				table += '<td class="calendar__table-cell calendar__table-cell-empty">' + " " + '</td>';
			}
		}

		html.innerHTML = table + '</tr></table>';
		
	}

	moveNextMonth() {
		month = ++month % 12;
		currentMonth.innerHTML = monthNameArray[month];
		table.innerHTML = '';
		//newCalendar(year, month);
	}

	movePrevMonth() {
		if (--month < 0) {
			month = 11;
		} else {
			month = month;
		}
		currentMonth.innerHTML = monthNameArray[month];
		table.innerHTML = '';
		//newCalendar(year, month);
	}

}
