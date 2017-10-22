class calendarPreview {

	constructor(settings) {

		var d = new Date();
		var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		var leftRuler = (settings.rulers === true) ? '<' : "";
		var rightRuler = (settings.rulers === true) ? '>' : "";
		var month = (settings.month > 0) ? parseInt(settings.month) : d.getMonth();
		var year = (settings.year > 0) ? parseInt(settings.year) : (d.getFullYear());
		console.log(year + '' + month)
		var calendar = this.buildCalendar(year, month);

		document.getElementById('preview-wrapper').innerHTML = '<div class="calendar__header">\
		<div class="calendar__ruler">' + leftRuler + '</div>\
		<div class="calendar__month">' + monthName[month] + '</div>\
		<div class="calendar__ruler">' + rightRuler + '</div>\
		</div>\
		<div class="calendar__body">' + calendar + '</div>';
		
	}

	fixDays(weekday) {
		if (weekday == 0) {
			weekday = 7;
		}
		return weekday;
	}

	buildCalendar(year, month) {
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

		return table + '</tr></table>';
		
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
