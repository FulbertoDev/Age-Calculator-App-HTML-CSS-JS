
const fieldRequiredMsg = "This field is required"
const fieldInvalidMsg = "Must be a valid"
const now = new Date()
now.setHours(0, 0, 0, 0)

const dayInput = document.getElementById('day-input-field');
const monthInput = document.getElementById('month-input-field');
const yearInput = document.getElementById('year-input-field');

function validateDay() {
    const dayInput = document.getElementById('day-input-field');
    const dayHelperText = document.getElementById('day-helper-text');
    const dayInputLabel = document.getElementById('day-input-label');

    const dayValue = dayInput.value.toString();
    if (dayValue === "") {
        dayHelperText.innerText = fieldRequiredMsg
        dayInput.classList.replace('border-[#dbdbdb]', 'border-red-500')
        dayInputLabel.classList.replace('text-[#716f6f]', 'text-red-500')
        return false;
    }

    const day = parseInt(dayValue)

    if (isNaN(day) || day < 1 || day > 31) {
        dayHelperText.innerText = `${fieldInvalidMsg} day`
        dayInput.classList.replace('border-[#dbdbdb]', 'border-red-500')
        dayInputLabel.classList.replace('text-[#716f6f]', 'text-red-500')
        return false;
    }

    //RESET FIELDS

    //HELPER TEXT
    dayHelperText.innerText = ""

    //DAY INPUT
    dayInput.classList.remove('border-red-500')
    dayInput.classList.add('border-[#dbdbdb]')

    //LABEL
    dayInputLabel.classList.remove('text-red-500')
    dayInputLabel.classList.add('text-[#716f6f]',)


    return true;
}

function validateMonth() {
    const monthHelperText = document.getElementById('month-helper-text');
    const monthInputLabel = document.getElementById('month-input-label');

    const monthValue = monthInput.value.toString();
    if (monthValue === "") {
        monthHelperText.innerText = fieldRequiredMsg
        monthInput.classList.replace('border-[#dbdbdb]', 'border-red-500')
        monthInputLabel.classList.replace('text-[#716f6f]', 'text-red-500')
        return false;
    }

    const month = parseInt(monthValue)

    if (isNaN(month) || month < 1 || month > 12) {
        monthHelperText.innerText = `${fieldInvalidMsg} month`
        monthInput.classList.replace('border-[#dbdbdb]', 'border-red-500')
        monthInputLabel.classList.replace('text-[#716f6f]', 'text-red-500')
        return false;
    }

    //RESET FIELDS

    //HELPER TEXT
    monthHelperText.innerText = ""

    //DAY INPUT
    monthInput.classList.remove('border-red-500')
    monthInput.classList.add('border-[#dbdbdb]')

    //LABEL
    monthInputLabel.classList.remove('text-red-500')
    monthInputLabel.classList.add('text-[#716f6f]',)


    return true;
}

function validateYear() {
    const yearHelperText = document.getElementById('year-helper-text');
    const yearInputLabel = document.getElementById('year-input-label');

    const yearValue = yearInput.value.toString();

    if (yearValue === "") {
        yearHelperText.innerText = fieldRequiredMsg
        yearInput.classList.replace('border-[#dbdbdb]', 'border-red-500')
        yearInputLabel.classList.replace('text-[#716f6f]', 'text-red-500')
        return false;
    }

    const year = parseInt(yearValue)
    if (isNaN(year) || year > now.getFullYear()) {
        yearHelperText.innerText = `Must be in the past`
        yearInput.classList.replace('border-[#dbdbdb]', 'border-red-500')
        yearInputLabel.classList.replace('text-[#716f6f]', 'text-red-500')
        return false;
    }

    //RESET FIELDS

    //HELPER TEXT
    yearHelperText.innerText = ""

    //DAY INPUT
    yearInput.classList.remove('border-red-500')
    yearInput.classList.add('border-[#dbdbdb]')

    //LABEL
    yearInputLabel.classList.remove('text-red-500')
    yearInputLabel.classList.add('text-[#716f6f]',)


    return true;
}


function validateForm() {
    const dayValidated = validateDay();
    const monthValidated = validateMonth();
    const yearValidated = validateYear();

    return dayValidated && monthValidated && yearValidated;
}

function timeSince(diffInMs) {

    const result = [];


    const yearCoeff = 31556952 // one year in seconds
    const monthCoeff = 2592000 // one month in seconds
    const dayCoeff = 86400 // one day in seconds

    const seconds = Math.floor(diffInMs / 1000);
    var remainingTimeInSec = 0

    const yearValue = Math.floor(seconds / yearCoeff);
    result.push(yearValue)

    remainingTimeInSec = seconds - (yearValue * yearCoeff)
    console.log(`Remaining time M: ${remainingTimeInSec}`);

    const monthValue = Math.floor(remainingTimeInSec / monthCoeff);
    result.push(monthValue);

    remainingTimeInSec = seconds - ((yearValue * yearCoeff) + (monthValue * monthCoeff))
    console.log(`Remaining time: ${remainingTimeInSec}`);

    const dayValue = Math.floor(remainingTimeInSec / dayCoeff);
    result.push(dayValue);

    return result
}

const submitForm = document.getElementById('submitButton');

submitForm.addEventListener('click', function () {
    const isFormValid = validateForm();

    const day = parseInt(dayInput.value.toString())
    const month = parseInt(monthInput.value.toString())
    const year = parseInt(yearInput.value.toString())

    if (isFormValid) {
        const date = new Date()
        date.setFullYear(year, month - 1, day)

        let diffInMs = Math.abs(now.getTime() - date.getTime());
        const diff = timeSince(diffInMs)
        console.log(`Difference: ${diff}`);

        const y = diff[0]
        const m = diff[1]
        const d = diff[2]

        document.getElementById('year-view').innerText = `${y}`;
        document.getElementById('month-view').innerText = `${m}`;
        document.getElementById('day-view').innerText = `${d}`;
    }
})