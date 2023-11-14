const FORM = document.querySelector(".contactForm")
let success

/* FORM.email.addEventListener("input", inputHandler)

function inputHandler(event) {
	console.log(FORM.email.validity)
	if (FORM.email.validity.typeMismatch) {
		FORM.email.setCustomValidity("Hey, hallå! Hvorfor har du bukser på!?")
	} else {
		FORM.email.setCustomValidity("")
	}
} */

FORM.addEventListener("submit", submitHandler)

function submitHandler(event) {
	event.preventDefault()
	success = true

	Array.from(event.target).forEach(validate)

	if (success) {
		event.target.submit()
	}
}

function validate(field) {
	if (field.nodeName === "BUTTON") return // guard clause

	field.nextElementSibling.textContent = ""

	if (field.required && !field.value) {
		field.nextElementSibling.textContent = "Feltet må ikke være tomt!"
		success = false
	}

	if (field.type === "text" && !field.value) {
		// input fejl
		field.nextElementSibling.textContent = field.dataset.errormsg
		success = false
	}

	if (field.type === "email") {
		const indexOfAt = field.value.indexOf("@")
		const indexOfDot = field.value.indexOf(".")

		if (indexOfAt === -1
				|| indexOfAt === 0
				|| indexOfAt === field.value.length - 1
				|| indexOfDot === -1
				|| indexOfDot === 0
				|| indexOfDot === field.value.length - 1
				|| indexOfDot < indexOfAt
				|| indexOfAt === indexOfDot - 1) {
			field.nextElementSibling.textContent = field.dataset.errormsg
			success = false
		}
	}

	if (field.type === "tel") {
		if (!/^\+?\d{8,}$/.test(field.value)) {
			field.nextElementSibling.textContent = "Du skal skrive et korrekt telefonnummer!"
			success = false
		}
		/* if (field.value.length < field.minlength
				|| field.value.length > field.maxlength
				|| isNaN(field.value)) {
			field.nextElementSibling.textContent = "Du skal skrive et korrekt telefonnummer!"
		} */
	}

	if (field.type === "textarea") {
		if (field.value.length < 15
			|| field.value.length > 255) {
				field.nextElementSibling.textContent = "Din besked er dum!"
				success = false
			}
	}
}
