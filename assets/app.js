 // array of first set of animals
      var firstAnimals = ["dog", "otter", "goat", "hippo", "koala", "unicorn", "penguin"];

      //this function will dynamically create buttons for the array above
      function renderButtons () { 

      // no duplicate buttons
      $("#buttons").empty(); 

        // foor loop to add animal array into buttons
        for (var i = 0; i < firstAnimals.length; i++) {
          // jQuery button tool
          var b = $("<button>"); 
          // adds the class animalz to all elements that I assign it to
          b.addClass("animalz"); 
          // adds a data attribute to the array of animals
          b.attr("data-animals", firstAnimals[i]); 
          // adds matching text & animal to the created buttons
          b.text(firstAnimals[i]); 
          // appends buttons to button div in html
          $("#buttons").append(b); 
        } //ends for loop
      } //ends renderButton function


      // this function uses the ajax to get animals chosen by user
      function displayAnimals () {
      var animal = $(this).attr("data-animals"); 
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10" 

        $.ajax({
          url: queryURL,
          method: "GET"
          }).done(function(response){
          console.log(response) //is working

          var results = response.data

          // this for loop stores the results from the ajax call
          for (var j = 0; j < results.length; j++){
            // creates a empty div for the below elements 
            var animalDiv = $("<div>"); 
            // creates a <P> tag for the rating of the gif
            var r = $("<p>").text("Rating: " + results[j].rating); 
            // creates an image
            var animalsImg = $("<img>"); 
            // adding all the attributes needed to be able to pause/start gifs:
            animalsImg.attr("src", results[j].images.fixed_height_still.url); 
            animalsImg.attr("data-still", results[j].images.fixed_height_still.url);
            animalsImg.attr("data-animate", results[j].images.fixed_height.url);
            animalsImg.attr("data-state", "still");
            animalsImg.addClass("gif");
            // appends the rating to the empty div
            animalDiv.append(r); 
            // appends the images to the empty div
            animalDiv.append(animalsImg); 
            //appends everything stored in the animalDiv to the gifView div in html  
            $(".gifView").append(animalDiv); 
          } // end of for loop
          }) // end of response function

            // clears the current gifs when new button is clicked
            $(".gifView").empty(); 
      } // end of displayAnimals function


      // this function triggers when the user clicks the add a gif button
      $(".add-animals").on("click", function(event) {
      event.preventDefault(); 
        // this is the users input
        var animal = $("#userInput").val().trim(); 
        // this pushes the users input to the firstAnimals array
        firstAnimals.push(animal); 
        // process the animals array buttons
        renderButtons(); 
      }); // ends click event



      // this adds an event listener to all elements with the animalz class
      $(document).on("click", ".animalz", displayAnimals); 
      // calls the initial animal arrays buttons
      renderButtons(); 


      // condition for when gif is clicked, to either puase or restart animation
      $(".gifView").on("click", ".gif", function(event) {

      var state = $(this).attr("data-state");

        if (state === "still"){
          $(this).attr("src", $(this).attr("data-animate"));
             $(this).attr("data-state", "animate");
        } else {
           $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
        } // ends else statement
      }) // ends data-state condition
     