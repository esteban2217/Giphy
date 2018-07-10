

// form button to make new buttons
  $(document).on('click', '#button', function () {
	  	event.preventDefault();
	  	var input = $('input').val();
	  		if (input != ""){
	  	 	var newButton = $("<button>");
	  		newButton.text(input);
	  		$('#buttonList').append(newButton);
	  		$('input').val("");
		}
	  });

		// getting gifs for 
	   $(document).on('click', '#buttonList button', function () {
			event.preventDefault();
		var type = $(this).text();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
      		url: queryURL,
     	 	method: "GET"
   		 })
     	 .then(function(response) {
        console.log(response);
     	 var results = response.data;

     	for (var i = 0; i < results.length; i++) {
          var newDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var Image = $("<img>");
          Image.attr("src", still);
          Image.attr("data-still", still);
          Image.attr("data-animate", animated);
          Image.attr("data-state", "still");
          Image.addClass("image");

          newDiv.append(p);
          newDiv.append(Image);

       $("#gifs").append(newDiv);
       	 }

       //making giphy animate
      $('img').on('click', function() {
      	var imageSrc = $(this).attr('src');
      	var imageStill = $(this).attr('data-still');
      	var imageAnimate = $(this).attr('data-animate');
      if (imageSrc === imageStill) {
        $(this).attr('src', imageAnimate);
     	 } else {
        $(this).attr('src', imageStill);
     	 }
    	});
      });
	});