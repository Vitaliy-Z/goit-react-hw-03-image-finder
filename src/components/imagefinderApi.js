const KEY = "19040716-d2ab54626dacf9b7f6f91612a";

function fetchImages(searchQuery, pageNumber) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then((res) => res.json())
    .then(({ hits }) => hits);
}

export default fetchImages;
