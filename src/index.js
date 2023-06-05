import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const fetchLoad = document.querySelector('.loader-text');

fetchLoad.classList.remove('is-hidden');

let img = [];

fetchBreeds()
  .then(option => {
    fetchLoad.classList.add('is-hidden');
    breedSelect.classList.remove('is-hidden');
    breedSelect.append(...option);
  })
  .catch(error => {
    breedSelect.classList.add('is-hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    fetchLoad.classList.add('is-hidden');
  });

breedSelect.addEventListener('change', onOptionChange);

function onOptionChange(e) {
  fetchLoad.classList.remove('is-hidden');
  catInfo.classList.add('is-hidden');

  fetchCatByBreed(e)
    .then(r => {
      return r.map(catData => {
        img =
          catInfo.innerHTML = `<img src="${catData.url}" alt="" width="600"></img>`;
        return catData.breeds[0];
      });
    })
    .then(data => {
      fetchLoad.classList.add('is-hidden');
      catInfo.classList.remove('is-hidden');

      return data.map(catData => {
        catInfo.innerHTML = `${img}
        <div><h1>${catData.name}</h1>
        <p>${catData.description}</p>
        <p><b>Temperament: </b>${catData.temperament}</p></div>`;
      });
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      fetchLoad.classList.add('is-hidden');
    });
}
