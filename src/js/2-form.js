import { save, load } from './localStorage';
import iziToast from 'izitoast';

const feedbackFormEl = document.querySelector('.feedback-form');
const formData = {
  email: '',
  message: '',
};

const fillFormField = () => {
  const formDataFromLS = load('feedback-form-state');
  if (formDataFromLS === undefined) {
    return;
  }

  const formDataFromLSKeys = Object.keys(formDataFromLS);
  formDataFromLSKeys.forEach(key => {
    feedbackFormEl.elements[key].value = formDataFromLS[key];
    formData[key] = formDataFromLS[key];
  });
};

fillFormField();

const onFormFieldInput = event => {
  const { target: formField } = event;
  const fieldName = formField.name;
  const fieldValue = formField.value;
  const trimmedFieldValue = fieldValue.trim();
  formData[fieldName] = trimmedFieldValue;
  save('feedback-form-state', formData);
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  const formDataValues = Object.values(formData);
  if (formDataValues.some(el => el === '')) {
    iziToast.error({
      message: 'Fill please all fields',
      position: 'topRight',
    });
    return;
  }
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
};

feedbackFormEl.addEventListener('input', onFormFieldInput);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
