class showSettings {

	constructor() {
		document.getElementById('root').innerHTML = '';

		this.settings = document.createElement('DIV');
		this.settings.className = "settings";
		this.settings.innerHTML = '<p class="settings__title">Configure calendar</p>\
		<div id="settings-form">\
		<label class="form-item"><input class="settings__checkbox" type="checkbox" id="rulers" name="ruler" />allow to change month</label>\
		<label class="form-item"><input class="settings__checkbox" type="checkbox" id="create-notes" name="create-note" />allow to add tasks</label>\
		<label class="form-item"><input class="settings__checkbox" type="checkbox" id="delete-notes" name="delete-note" />allow to delete tasks</label>\
		<label class="form-item"><input class="settings__input-field" type="text" id="month" name="month" />month</label>\
		<label class="form-item"><input class="settings__input-field" type="text" id="year" name="year" />year</label>\
		</div>\
		<a id="create-calendar" class="calendar__create-btn" href="#calendar">Create calendar</a>\
		<a id="preview-calendar" class="calendar__preview-btn">Preview calendar</a>\
		<div id="preview-wrapper"></div>';

		document.getElementById('root').appendChild(this.settings);

		//document.getElementById('create-calendar').addEventListener('click', this.initCalendar.bind(this));

		document.getElementById('settings-form').addEventListener('change', this.initCalendar.bind(this));
	}

	initCalendar() {
		//new calendarPreview();

		this.addMonth = document.getElementById('month').value;
		this.addYear = document.getElementById('year').value;
		this.addRulers = document.getElementById('rulers').checked;
		this.addNotes = document.getElementById('create-notes').checked;
		this.deleteNotes = document.getElementById('delete-notes').checked;

		/*eventBus.trigger('create-calendar', {
			month: this.addMonth,
			year: this.Year, 
			rulers: this.addRulers, 
			addNotes: this.addNotes,
			delNoteds: this.deleteNotes
		});
*/

		var settings = {
			month: document.getElementById('month').value,
			year: document.getElementById('year').value, 
			rulers: document.getElementById('rulers').checked, 
			addNotes: document.getElementById('create-notes').checked,
			delNoteds: document.getElementById('delete-notes').checked
		}

		console.log(settings);

		new calendarPreview(settings);
	}	
}