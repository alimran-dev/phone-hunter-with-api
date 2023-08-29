const loadPhones = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const loadPhoneDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const details = data.data;
  showPhoneDetails(details);
}

const displayPhones = (phones, isShowAll) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.textContent = '';
  const showAllBtn = document.getElementById('show-all-btn');
  if (phones.length > 9 && !isShowAll) {
    showAllBtn.classList.remove('hidden');
    phones = phones.slice(0, 9);
  } else {
    showAllBtn.classList.add('hidden');
  }
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.innerHTML = `
        <div class="card bg-base-100 shadow-xl border-2 border-slate-200">
        <figure class="px-10 pt-10">
          <img src="${phone.image}" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions">
            <button onclick="showDetailsHandler(this)" id="${phone.slug}" class="btn btn-primary normal-case text-lg">Show Details</button>
          </div>
        </div>
      </div>
        `;
    cardContainer.appendChild(phoneCard);
  })
  document.getElementById('loading').classList.add('hidden');
  console.log(phones)
};
const handleSearch = (isShowAll) => {
  const searchText = document.getElementById("search-box").value;
  const loadingContainer = document.getElementById('loading');
  loadingContainer.classList.remove('hidden')
  loadPhones(searchText, isShowAll);
}

const showAllHandler = () => {
  handleSearch(true);
}

const showDetailsHandler = (target) => {
  const id = target.id;
  loadPhoneDetails(id)
}
const showPhoneDetails = (details) => {
  const modalDetails = document.getElementById('modal');
  modalDetails.innerHTML = `
  <img src='${details.image}' class="mx-auto">
  <h3 class="font-bold text-xl mb-4">${details.name}</h3>
  <p class="py-1"><span class="font-bold">Storage : </span>${details?.mainFeatures?.storage || 'Data not available'}</p>
  <p class="py-1"><span class="font-bold">Display Size : </span>${details?.mainFeatures?.displaySize || 'Data not available'}</p>
  <p class="py-1"><span class="font-bold">Chipset : </span>${details?.mainFeatures?.chipSet || 'Data not available'}</p>
  <p class="py-1"><span class="font-bold">Memory : </span>${details?.mainFeatures?.memory || 'Data not available'}</p>
  <p class="py-1"><span class="font-bold">GPS : </span>${details?.others?.GPS || 'Data not available'}</p>
  <p class="py-1"><span class="font-bold">Sensors : </span>${details?.mainFeatures?.sensors?.join(', ') || 'Data not available'}</p>
  <p class="py-1"><span class="font-bold">Brand : </span>${details?.brand || 'Data not available'}</p>
  <p class="py-1"><span class="font-bold">Release Date : </span>${details?.releaseDate || 'Data not available'}</p>
  <div class="modal-action">
    <!-- if there is a button in form, it will close the modal -->
    <button class="btn bg-indigo-600 hover:bg-indigo-600 text-white">Close</button>
  </div>
  `;
  show_modal.showModal();
  console.log(details)
}
loadPhones()