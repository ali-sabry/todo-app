// Start Switch Mode 
	let switchIcon = document.querySelector(".icon");

	// Set Title Of The Icon
		switchIcon.onmouseover = () => {
			if (document.body.classList.value === "dark-mode") {
				switchIcon.setAttribute("title", "Light Mode");
			} else {
				switchIcon.setAttribute("title", "Dark Mode");
			}
		}

	switchIcon.onclick = () => {
		// Change Icon Color
		if (document.body.classList.value === "dark-mode") {
			localStorage.setItem("dark-off", "dark-mode-off");
			localStorage.removeItem("dark-on");
		} else {
			localStorage.setItem("dark-on", "dark-mode");
			localStorage.removeItem("dark-off");
		}
		// Toggle Class Dark Mode
		document.body.classList.toggle("dark-mode");
	}
	// End Switch Mode 

	// Start LocalStorage Used To Set Dark Mode
		if (localStorage.getItem("dark-on") !== null) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	// End LocalStorage Used To Set Dark Mode

// End Switch Mode 


/* Start Set My MAin Vars */
   let  input         = document.querySelector(".field input"),
	tasksParent   = document.querySelector(".tasks"),
	taskBoxes     = document.querySelectorAll(".tasks .task-box"),
        addButton     = document.getElementById("addTask"),
	note          = document.querySelector(".note");
/* End Set My Main Vars */

/* Start Generate Tasks Boxes */
	function createTask() {
		let taskBox     = document.createElement("div"),
			compIcon    = document.createElement("span"),
			taskMission = document.createElement("h5"),
			closeParent = document.createElement("div"),
			closeIcon   = document.createElement("i");

		// Set The ClassName
			taskBox.className = "task-box";
			compIcon.className = "completed-icon";
			taskMission.className = "task-mission";
			closeParent.className = "close";
			closeIcon.className   = "fa fa-close";

		// Appended The Element
			taskBox.appendChild(compIcon);
			taskBox.appendChild(taskMission);
			closeParent.appendChild(closeIcon);
			taskBox.appendChild(closeParent);

		// Append Task Box To Parent Tasks
			tasksParent.prepend(taskBox);

		// Set The Content On Task Mission
		   taskMission.textContent = input.value;			
	};
/* End Generate Tasks Boxes */

/* Start Type Todo Message */
	// Input On Blur Function
		addButton.onclick = () => {
			if (input.value === "") {
				note.style.display = "block";
			} else {
				createTask();
				note.style.display = "none";
				input.value = "";
				window.location.reload();
			}
			localStorage.setItem("allTasks", tasksParent.innerHTML);
		}
	// Input On Focus Function
		input.onfocus = () => {note.style.display = "none"};
/* End Type Todo Message */

// Append The LocalStorage Element To Parent Tasks
	let StorageElement = localStorage.getItem("allTasks");
		tasksParent.innerHTML = StorageElement;

// Completed Task
	document.querySelectorAll(".completed-icon").forEach(element => {
		element.onclick = () => {
			element.parentElement.classList.toggle("task-completed"); 
			localStorage.setItem("allTasks", tasksParent.innerHTML);
			window.location.reload();
		}
	});

// Delete One Task
	document.querySelectorAll(".close i").forEach(element => {
		element.onclick = () => {
			element.parentElement.parentElement.remove();
			localStorage.setItem("allTasks", tasksParent.innerHTML);
			window.location.reload();
		}
	});

// Delete All Completed Task
	let clearCompBtn = document.querySelector(".clear a"),
		completedTask = document.querySelectorAll(".task-completed");
	clearCompBtn.onclick = () => {
		completedTask.forEach((elem)=> {
			elem.remove();
		});
		localStorage.setItem("allTasks", tasksParent.innerHTML);
		window.location.reload();
	};
	
// Delete All Tasks
	let clearAll = document.querySelector(".clear-all a");
		clearAll.onclick = () => {
				console.log('click');
			Array.from(tasksParent.children).forEach( (element) => {
				element.remove();
			});
			localStorage.setItem("allTasks", tasksParent.innerHTML);
			window.location.reload();
		};

 // Show Remind Item On To Do
	let remindElement = document.querySelector(".remind span");
	    remindElement.textContent = tasksParent.childElementCount + " Item Left";	

	// Add Active Class & Remove From StateMent Button
		let statementBtn = document.querySelectorAll(".statement span");
			statementBtn.forEach( element => {
			 // Set Statement Button Jobs
				element.addEventListener('click', event => {
					// Remove All Active ClassName
						element.parentElement.querySelectorAll(".active").forEach((event) => {
							event.classList.remove('active');
						});
					// Add Active Class
						event.target.classList.add("active");

			   		// Statement Button Function Jobs Caller
						statementRules(event);
				});
			});

// This Function Do The Statement Button Jobs
	function statementRules(ele) {
		if (ele.target.textContent === "all") {
			tasksParent.querySelectorAll(".task-box").forEach( (task) => {
				task.style.display = 'block';
			});
		} else if (ele.target.textContent === "active") {
			tasksParent.querySelectorAll(".task-box").forEach( (task) => {
				if (task.classList.value === "task-box task-completed") {
					task.style.display = 'none';
				} else {
					task.style.display = 'block';
				}
			});
		} else if (ele.target.textContent === "completed") {					
			tasksParent.querySelectorAll(".task-box").forEach( (task) => {
				if (task.classList.value === "task-box task-completed") {
					task.style.display = 'block';
				} else {
					task.style.display = 'none';
				}
			});
		};
	};
