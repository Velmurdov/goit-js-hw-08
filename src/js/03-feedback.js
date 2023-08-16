
import throttle from 'lodash.throttle';

const refs = {
    formEl: document.querySelector('.feedback-form'),
    inputEmail: document.querySelector('[name = email]'),
    textarea: document.querySelector('[name = message]')
};

const STORAGE_KEY = 'feedback-form-state';
const formdata = {};

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onInput, 500));

loadDataFromLocalStorage();

function onFormSubmit(event){
    event.preventDefault();
    event.currentTarget.reset();

    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    console.log(savedData);

    localStorage.removeItem(STORAGE_KEY);

};

function onInput(event) {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    savedData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
};

function loadDataFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedData && savedData.email) {
        refs.inputEmail.value = savedData.email;
    }

    if (savedData && savedData.message) {
        refs.textarea.value = savedData.message;
    }
};