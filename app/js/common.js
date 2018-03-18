$(document).ready(function() {

	function newList(counter, name, status) {
		this.name = name;
		this.status = status;
		this.counter = counter;

		var createList_item = $("<div></div>");
		createList_item.addClass("list_item");
		var createCounter = $("<div></div>").text(counter);
		createCounter.addClass("counter");
		var createName = $("<div></div>").text(name);
		createName.addClass("name");
		var createStatus = $("<div></div>").text(status);
		createStatus.addClass("status");
		var createDelete = $("<div></div>");
		createDelete.addClass("delete");
		createDelete.append($("<span>delete</span>"));
		var createClear = $("<div></div>");
		createClear.addClass("clear");	
		createList_item.append(createCounter, createName, createStatus, createDelete, createClear).hide();
		$(".list_content").append(createList_item);
		createList_item.fadeIn();
		$(".list_item").css("margin-top", "0");
	};

	var newList1 = new newList(1, "Add task from JS", "Active");	
	var newList2 = new newList(2, "BAdd task from JS", "Active", "Inactive");	
	var newList3 = new newList(3, "CAdd task from JS", "Active", "Active");		

	var mainArray = [newList1, newList2, newList3];
	var newCount = parseInt($(".list_content").children().last().find($(".counter"))["0"].innerText);
	$('.add_new_list').click(function(e){
		newCount = parseInt($(".list_content").children().last().find($(".counter"))["0"].innerText);
		e.preventDefault();		
		if ($("#name").val().length==0) {
			alert("Write a task name!");
			$("#name").addClass("warn");
		}

		else if (isNaN($("#name").val())==false) {
			alert("You can't write just numbers");
			$("#name").addClass("warn");
		}

		else if ($(".list_content").children().length >= 20) {
			alert("You can add only 20 Tasks! Please bye a GOLD accaunt");
		}

		else{
			newCount++
			var animal = new newList(newCount, $("#name").val(), $("#select_status").val());		
			mainArray.push(animal);
			removeActive();
			console.log("You add one task", mainArray);			
		};		
	});



//sort functions//
  function removeActive() {
  	var nav_buttons = $(".nav_buttons .nav_buttons_botton")
  	nav_buttons.each(function(){
  		$(this).removeClass("active");
  	});
  };  

  function addListAfterSort(sortArray) {  	
  	var createList_item = $("<div></div>");
  	createList_item.addClass("list_item");
  	var createCounter = $("<div></div>").text(sortArray.counter);
  	createCounter.addClass("counter");
  	var createName = $("<div></div>").text(sortArray.name);
  	createName.addClass("name");
  	var createStatus = $("<div></div>").text(sortArray.status);
  	createStatus.addClass("status");
  	var createDelete = $("<div></div>");
  	createDelete.addClass("delete");
  	createDelete.append($("<span>delete</span>"));
  	var createClear = $("<div></div>");
  	createClear.addClass("clear");	
  	createList_item.append(createCounter, createName, createStatus, createDelete, createClear).hide();
  	$(".list_content").append(createList_item);
  	createList_item.fadeIn();
  	$(".list_item").css("margin-top", "0");
  };  

  //sort AZ//
  $("#sort_AZ").on("click", function(){	
  	if($(this).hasClass('active')==false) { 	
  		mainArray.sort(function(nameA, nameB){
  			if(nameA.name < nameB.name) return -1;	
  			if(nameA.name > nameB.name) return 1;					
  			return 0;
  		});
  		$(".list_content").children().remove();
  		for (var i = 0; i < mainArray.length; i++) {			
  			addListAfterSort(mainArray[i]);
  		}
  		removeActive();
  		$(this).addClass("active");
  		console.log("sort_AZ", mainArray);
  	};
  });

	//sort ZA//
	$("#sort_ZA").on("click", function(){
		if($(this).hasClass('active')==false) { 
			mainArray.sort(function(nameA, nameB){
				if(nameA.name > nameB.name) return -1;
				if(nameA.name < nameB.name) return 1;			
				return 0;
			});
			$(".list_content").children().remove();
			for (var i = 0; i < mainArray.length; i++) {			
				addListAfterSort(mainArray[i]);
			}
			removeActive();
			$(this).addClass("active");
			console.log("sort_ZA", mainArray);
		}
	});

	//sort 12//
	$("#sort_12").on("click", function(){
		if($(this).hasClass('active')==false) { 
			mainArray.sort(function(nameA, nameB){
				return nameA.counter - nameB.counter;
			});
			$(".list_content").children().remove();
			for (var i = 0; i < mainArray.length; i++) {			
				addListAfterSort(mainArray[i]);
			}
			removeActive();
			$(this).addClass("active");
			console.log("sort_12", mainArray);
		};
	});

	//sort 21//
	$("#sort_21").on("click", function(){
		if($(this).hasClass('active')==false) { 
			mainArray.sort(function(nameA, nameB){
				return nameB.counter - nameA.counter;
			});
			$(".list_content").children().remove();
			for (var i = 0; i < mainArray.length; i++) {			
				addListAfterSort(mainArray[i]);
			}
			removeActive();
			$(this).addClass("active");
			console.log("sort_21", mainArray);
		};
	});

	//delete_all//
	$("#delete_all").on("click", function(){
		
		if($(this).hasClass('active')==false) {
			var confirmResult = confirm("Are You shure???");
			if (confirmResult==true) {
				$(".list_content").children().slideUp(200, function() {
					$(".list_content").children().remove();
				});
				console.log("DELLL")
				removeActive();
				$(this).addClass("active");
				console.log("sort_21", mainArray);
			};
		};
	});

	//delete_one//
	$('.list_content').on("click", '.delete span', function(e){
		e.preventDefault();
		var parrentItem = $(this).parent().parent();
		var removeFromArr = parrentItem.find(".counter")["0"].innerHTML;		
		$(".list_content").children().remove();
		for (var i = 0; i < mainArray.length; i++) {
			if (mainArray[i].counter==removeFromArr) {				
				mainArray.splice((mainArray[i].counter - 1), 1);
			};
			mainArray[i].counter = i+1;
			addListAfterSort(mainArray[i]);
		}
		console.log("You delete one task", mainArray);		
		parrentItem.slideToggle(200, "swing", function() {
			parrentItem.remove();
		});
	});


	$("#name").focus(function(){
    $(this).removeClass("warn");
	});





console.log("deafult Array", mainArray);


});