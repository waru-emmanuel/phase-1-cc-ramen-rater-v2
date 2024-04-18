// index.js

// base URL
const ramenUrl = 'http://localhost:3000/ramens';

// Callbacks
const handleClick = (ramen) => {
  // Add code
      const detailImg = document.querySelector("#ramen-detail > .detail-image");
      const detailName = document.querySelector("#ramen-detail > .name");
      const detailRestaurant = document.querySelector("#ramen-detail > .restaurant"); //this line selects the first element with the class "restaurant" that is a direct child of an element with the ID "ramen-detail"
      const detailsRating = document.getElementById("rating-display");
      const detailsComment = document.getElementById("comment-display");

      detailImg.src = ramen.image;
      detailImg.alt = ramen.name;
      detailName.textContent = ramen.name;
      detailRestaurant.textContent = ramen.restaurant;
      detailsRating.textContent = ramen.rating;
      detailsComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  // Add code
    const ramenForm = document.getElementById('new-ramen');

        ramenForm.addEventListener('submit', (event) => {
           event.preventDefault();

          const formData = new FormData(ramenForm);
          const newRamen = {};

          formData.forEach((value, key) => {
            newRamen[key] = value;
          });

          // Assuming the API endpoint for adding new ramen is POST /ramens
           fetch(ramenUrl, {
               method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newRamen),
          })
          .then(res => res.json())
           .then(data => {
            // Add the new ramen to the UI
            displayNewRamen(data);
          })
          .catch(error => {
            console.error('Error adding new ramen:', error);
         });
      });
   };
   const displayNewRamen = (ramen) => {
    const ramenMenuDiv = document.getElementById('ramen-menu');
    const imgTag = document.createElement('img');
    imgTag.src = ramen.image;
    imgTag.alt = ramen.name;
    imgTag.addEventListener('click', () => handleClick(ramen));
    ramenMenuDiv.appendChild(imgTag);
};


const displayRamens = () => {
  // Add code
  fetch(ramenUrl)
    .then(res => res.json())
    .then(data => {
        dispalyRamensOnTheViewPage(data); // pass the array here
    })
    .catch(error => {
        console.error('Error fetching ramens:', error);
    });
};

function dispalyRamensOnTheViewPage(ramensArray) {
  // get the component to display the ramens
  const ramenSpanBar = document.getElementById('ramen-menu');

  // loop through each array object and create an img tag and name
  ramensArray.forEach(element => {
      const imgTag = document.createElement('img');
      imgTag.src = element.image;
      imgTag.alt = element.name;

      // an event listener for each created event listener
      imgTag.addEventListener("click", () => handleClick(element));

      // append the imgTag to the component
      ramenSpanBar.appendChild(imgTag);
  });
}


const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here

  displayRamens();
    addSubmitListener();
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
