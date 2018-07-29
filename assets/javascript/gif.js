$(document).ready( function() {

    var topicArray = ["Heroes of the Storm", "Chris Chan", "Santigold"];
    
    function populateButtons() {
      $("#button-area").empty();
      // Loop through array
      for (var i=0 ; i < topicArray.length ; i++) {
        //for each topic in array
        // Create a button
        var button = $("<button>");
        // Add data-topic to button and topic as its text
        button.attr("data-topic", topicArray[i]);
        button.text(topicArray[i]);
        button.addClass("topic-button");
        // append it to the button area
        $("#button-area").append(button);
      }
    };
    
    function changeState() {
      $(".gif").on("click", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          console.log(state);
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
    }
    
    function ajaxQuery() {
        // Adding click event listen listener to all buttons
        $(".topic-button").on("click", function() {
          // Grabbing and storing the data-topic property value from the button
          var topic = $(this).attr("data-topic");
    
          // Constructing a queryURL using the animal name
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    
          // Performing an AJAX request with the queryURL
          $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After data comes back from the request
            .then(function(response) {
              console.log(queryURL);
    
              console.log(response);
              // storing the data from the AJAX request in the results variable
              var results = response.data;
    
              // Looping through each result item
              for (var i = 0; i < results.length; i++) {
    
                // Creating and storing a div tag
                var div = $("<div>");
    
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
    
                // Creating and storing an image tag
                var image = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animated", results[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("gif");
                // Appending the paragraph and image tag to the animalDiv
                div.append(p);
                div.append(image);
    
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(div);
                  
                
                changeState();
                
              }
            });
        });
    }
    
    populateButtons();
    ajaxQuery();
    
    $("#add-topic").on("click", function(event) {
      // Preventing the buttons default behavior when clicked (which is submitting a form)
      event.preventDefault();
      // This line grabs the input from the textbox
      var topic = $("#topic-input").val().trim();
    
      // Adding the movie from the textbox to our array
      topicArray.push(topic);
    
      // Calling renderButtons which handles the processing of our movie array
      populateButtons();
      ajaxQuery();
    
    });
    });