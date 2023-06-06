const options = {
  headers: {
    'x-api-key':
      'live_va8cxC6LOqKLWbAwPm3c26MMa9iB26GsQ8oFmyx4GC8BqhSZprIXiPs5UwcAIjlX',
  },
};

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, options)
    .then(r => {
      return r.json();
    })
    .then(cats => {
      return cats.map(cat => {
        if (cat.hasOwnProperty('image')) {
          const createOption = document.createElement('option');
          createOption.value = cat.id;
          createOption.textContent = cat.name;

          return createOption;
        }
      });
    });
}

export function fetchCatByBreed(breedId) {
  const catId = breedId.target.value;
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${catId}&`;

  return fetch(url, options).then(r => {
    return r.json();
  });
}
