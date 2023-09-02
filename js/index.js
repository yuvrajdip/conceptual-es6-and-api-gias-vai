
// test : console.log(`hello from JS`);

const handleCategory = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/news/categories') // all news category
  let data = await res.json()
  data = data.data.news_category.slice(0, 3)

  const tabContainer = document.getElementById('tab-container')


  data.forEach(category => {
    const div = document.createElement('div')

    div.innerHTML = `
      <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
    `

    tabContainer.appendChild(div)
  })

}

const handleLoadNews = async (category_id) => {
  console.log(category_id);
  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
  let data = await response.json()

  console.log(data.data)
  data = data.data

  //** Sorting according to Total_view */
  data.sort((a,b) => b.total_view - a.total_view ) // sorting array of objects according to a specific value

  const cardContainer = document.getElementById('card-container')
  cardContainer.textContent = ''

  data.forEach(news => {
    console.log(news);
    const div = document.createElement('div')
    div.innerHTML = `
      <div class="card w-full bg-base-100 shadow-xl">
        <figure><img src="${news.image_url}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${news.title.slice(0, 40) + "..."}</h2>
          <p>${news.details.slice(0, 60) + "..."}</p>
          <p>Total views : ${news.total_view===0 ? 'no views' : news.total_view }</p>
          <div class=" justify-end">
            
            <button onclick="handleModal()" class="btn btn-secondary">See Details</button>        
            
          </div>
        </div>
      </div>
    `

    cardContainer.appendChild(div)
  })
}




const handleModal = () => {
  console.log(`modal`);

  const modalContainer = document.getElementById('modal-container')

  const div = document.createElement('div')
  div.innerHTML = `
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="my_modal_1" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </div>
      </form>
    </dialog>
  `
  modalContainer.appendChild(div)

  const modal = document.getElementById('my_modal_1')
  modal.showModal()
}

// handleLoadNews("01")
handleCategory()