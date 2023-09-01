
// test : console.log(`hello from JS`);

const handleCategory = async() => {
  const res=await fetch('https://openapi.programming-hero.com/api/news/categories') // all news category
  let data = await res.json()
  data = data.data.news_category.slice(0,3)

  const tabContainer = document.getElementById('tab-container')


  data.forEach( category=>{
    const div=document.createElement('div')

    div.innerHTML=`
      <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
    `

    tabContainer.appendChild(div)
  })

}

const handleLoadNews = async(category_id)=>{
  console.log(category_id);
  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
  let data = await response.json()

  console.log(data.data)
  data = data.data
}

handleCategory()