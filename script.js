//API USED: https://newsapi.org/
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

// "in" stands for India
const country = "in";
const options = ["general", "entertainment", "health", "science", "sports", "technology"];


//100 request per day
let requestURL;

const generateUI = (articles) => {
   for (let item of articles) {
      const publishedTime = new Date(item.publishedAt);
      const timeDiff = new Date() - publishedTime;
      let timeAgo;

      // Convert the time difference to minutes or hours
      if (timeDiff < 6000) {
         timeAgo = "just now";
      } else if (timeDiff < 3600000) {
         const mins = Math.floor(timeDiff / 60000);
         timeAgo = `${mins}${mins == 1 ? " minute" : " minutes"} ago`;
      } else {
         const hours = Math.floor(timeDiff / 3600000);
         timeAgo = `${hours}${hours === 1 ? " hour" : " hours"} ago`;
      }

      //  else if(timeDiff>=86400000 && timeDiff<172800000){
      //    timeAgo="yesterday"
      //  }else{
      //    const days=Math.floor(timeDiff/86400000);
      //    timeAgo=`${days}${days=== 1?" day":" days"} ago`
      //  }

      let card = document.createElement("div");
      card.classList.add("news-card");
      card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || "./newspaper.jpg"}" alt="Image not available"/>
      </div>
      <div class="news-content">
         <div class="news-title">
            ${item.title}
         </div>
         <div class="news-description">
         ${item.description || item.content || ""}
         </div>
      <div class="card-row">
         <div class="viewbutton">
            <a href="${item.url}"target="_blank" class="view-button">Read More</a>
             
         </div>
         <div class="time-ago">
            <div class="published-at">${timeAgo}</div>

         </div>
     </div>

      </div>`;
      container.appendChild(card);

   }
};


//news api call
const getNews = async () => {
   container.innerHTML = "";
   let response = await fetch(requestURL);
   if (!response.ok) {
      alert("Data unavailable at the moment.Please Try again later");
      return false;

   }
   let data = await response.json();
   generateUI(data.articles);
   console.log(data.articles)
};


//category selection
const selectCategory = (e, category) => {
   let options = document.querySelectorAll(".options");
   options.forEach((element) => {
      element.classList.remove("active");

   });
   requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
   e.target.classList.add("active");
   getNews();
};

//options buttons
const createOptions = () => {
   for (let i of options) {
      optionsContainer.innerHTML += `<button
      class="options ${i == "general" ? "active" : ""}"
      onClick="selectCategory(event,'${i}')">${i}</button>`;

   }
}


const init = () => {
   optionsContainer.innerHTML = "";
   getNews();
   createOptions();

};
window.onload = () => {
   requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
   init();
};




// scrollFunction


let mybutton = document.getElementById("myBtn");

// when user scrolls down 20px ,show the button

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
   if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      mybutton.style.display="block";
   }else{
      mybutton.style.display="none";
   }
}
//  function to go up
function topFunction(){
   document.body.scrollTop=0;
   document.documentElement.scrollTop=0;
}