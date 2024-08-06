document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const surveyForm = document.getElementById('survey-form');
    const sections = document.querySelectorAll('.form-section');
    let currentSectionIndex = 0;

    startButton.addEventListener('click', function() {
        resetForm();
        document.getElementById('landing-page').classList.add('hidden');
        surveyForm.classList.remove('hidden');
        sections[currentSectionIndex].classList.add('active');
    });

    const nextButtons = document.querySelectorAll('.next-button');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateSection(currentSectionIndex)) {
                sections[currentSectionIndex].classList.remove('active');
                currentSectionIndex++;
                sections[currentSectionIndex].classList.add('active');
            }
        });
    });

    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (button.getAttribute("data-back") === "landing-page") {
                document.getElementById('landing-page').classList.remove('hidden');
                surveyForm.classList.add('hidden');
                resetForm();
            } else {
                sections[currentSectionIndex].classList.remove('active');
                currentSectionIndex--;
                sections[currentSectionIndex].classList.add('active');
            }
        });
    });

    function validateSection(index) {
        const inputs = sections[index].querySelectorAll('input, select, textarea');
        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    }

    function resetForm() {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        currentSectionIndex = 0;
    }
});
