
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
refs.inputEmail.addEventListener('blur', onSave); 
refs.textarea.addEventListener('blur', onSave);


loadDataFromLocalStorage();

function onFormSubmit(event){
    event.preventDefault();
    event.currentTarget.reset();

    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    console.log(savedData);

    localStorage.removeItem(STORAGE_KEY);

};

function onInput(event){
    formdata[event.target.name] = event.target.value ;
    const formDataStrf = JSON.stringify(formdata);
    localStorage.setItem(STORAGE_KEY, formDataStrf);

};

function loadDataFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedData) {
        refs.inputEmail.value = savedData.email;
        refs.textarea.value = savedData.message;
    }
};