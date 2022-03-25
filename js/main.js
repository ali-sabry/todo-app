/*======== Start Set My Main Vars ===============*/

	let  input         = document.querySelector(".field input");
	let taskscontainer = document.querySelector(".tasks");
	let	taskBoxes      = document.querySelectorAll(".tasks .task-box");
	let addButton      = document.getElementById("addTask");
	let	note           = document.querySelector(".note");
	let remindElement  = document.querySelector(".remind span");
	let switchIcon     = document.querySelector(".icon");
	let clearCompBtn   = document.querySelector(".clear a");
	let clearAll       = document.querySelector(".clear-all a");
	let statementBtns  = document.querySelectorAll(".statement span");

/*============== End Set My Main Vars ===================*/

/*============== Start Switch Mode Function =====================*/
		(function switchMode() {

			//=== Set Title Attribute Of The Icon
				switchIcon.onmouseover = () => {
					if (document.body.classList.value === "dark-mode") {
						switchIcon.setAttribute("title", "Light Mode");
					} else {
						switchIcon.setAttribute("title", "Dark Mode");
					};
				};

			//=== Mode Icon On Click	
				switchIcon.onclick = () => {
					//==== Change Icon Color
					if (document.body.classList.value === "dark-mode") {
						localStorage.setItem("dark-off", "dark-mode-off");
						localStorage.removeItem("dark-on");
					} else {
						localStorage.setItem("dark-on", "dark-mode");
						localStorage.removeItem("dark-off");
					};
					//========== Toggle Class Dark Mode
					document.body.classList.toggle("dark-mode");
				};
			
			//===  Switch Mode Localstorage Handler .
				if (localStorage.getItem("dark-on") !== null) {
					document.body.classList.add("dark-mode");
				} else {
					document.body.classList.remove("dark-mode");
				};
		}());
/*============== End Switch Mode Function =====================*/

/*============== Start Generate Tasks Boxes ================*/
		function createTask() {
		  //====== Create Tasks Element
			let taskBox     = document.createElement("div");
			let	compIcon    = document.createElement("span");
			let	taskMission = document.createElement("h5");
			let	closeParent = document.createElement("div");
			let	closeIcon   = document.createElement("i");

			//====== Set The ClassName
				taskBox.className      = "task-box";
				compIcon.className     = "completed-icon";
				taskMission.className  = "task-mission";
				closeParent.className  = "close";
				closeIcon.className    = "fa fa-close";

			//====== Appended The Element
				taskBox.appendChild(compIcon);
				taskBox.appendChild(taskMission);
				closeParent.appendChild(closeIcon);
				taskBox.appendChild(closeParent);

			//====== Append Task Box To Parent Tasks
				taskscontainer.prepend(taskBox);

			//====== Set The Content On Task Mission
			   taskMission.textContent = input.value;

			//====== Run Function Handler Completed Task & Delete Task .
				boxesHandler(".completed-icon", "completed");
				boxesHandler(".close i", "delete");
		};
/*=============== End Generate Tasks Boxes  ===================*/

/*========== Start Function Set Local Storage  ==========*/
		function setLocalStorage() {
			localStorage.setItem("allTasks", taskscontainer.innerHTML);
			
			// Show All Left Tasks Items On To Do App .
			remindElement.textContent = `${taskscontainer.childElementCount} Items`;	
		};
/*============ End Function Set Local Storage  ==========*/

/*================= Start Add Todo  ===================*/
		(function add_Todo()	 {

			//=== Add Button Handler
				addButton.onclick = () => {
					if (input.value === "") {
						//===== Show Error Messsage If Field Is Empty
						note.style.display = "block";
					} else {
						//====== Run Create Tasks Boxes Function .
						createTask();
						//===== Run Set Local Storage Function .
						setLocalStorage();
						//======== Hide The Error Message & Empty Input Feild .
						note.style.display = "none";
						input.value = "";
					};
				};

			//=== Hide The Error Message On Focus At Input .
				input.onfocus = () => {note.style.display = "none"};

			//=== Add The Saved Todos On localStorage To Tasks Container .
				taskscontainer.innerHTML = localStorage.getItem("allTasks");

			//==== Run function	
			setLocalStorage();

		}());
/*================= End Add Todo  ===================*/

/*====== Start Function Handel The Completed	& Deleted Task =======*/
		function boxesHandler(elements, job) {
			document.querySelectorAll(elements).forEach((ele) => {
				ele.onclick = () => {
					if(job === 'completed') {
						ele.parentElement.classList.toggle("task-completed");
					} else if(job === 'delete') {
						ele.parentElement.parentElement.remove();
					};
					//=== Run Set LocalStorage Function .
					setLocalStorage();
				};
			});
		};
		//==== Run Function Handler Completed Task & Delete Task .
		boxesHandler(".completed-icon", "completed");
		boxesHandler(".close i", "delete");
/*====== End Function Handel The Completed	& Deleted Task =======*/

/*============ Start Delete All Completed Tasks Handler ==============*/
	(function completedTasksHandler() {
		clearCompBtn.onclick = () => {
			
			//===== Loop On All Completed Tasks & Remove It .
			document.querySelectorAll('.task-completed').forEach( (ele) => {
				ele.remove();
			});

			//===== Run Set LocalStorage Function .
			setLocalStorage();

			//==== Click On Show All Tasks Button .
			statementBtns.forEach((ele)=> {
				if(ele.textContent === 'all') {
					ele.click();
				}
			});
		};
	}());
/*============ End Delete All Completed Tasks Handler ==============*/

/*============== Start Delete All Tasks ================*/
	(function deleteAll() {
		clearAll.onclick = () => {
			//=== Loop On All Tasks & Remove From Dom Tree
			Array.from(taskscontainer.children).forEach( (element) => {
				element.remove();
			});
			
			//=== Run Set LocalStorage Function .
			setLocalStorage();
		};
	}())
/*============== End Delete All Tasks ================*/

/*========= Start Function Handle Bottom Statement Buttons ==============*/
	function statementRules(ele) {
	let completedTask  = document.querySelectorAll(".task-completed");
	let otherBoxes     = document.querySelectorAll(".task-box");
		taskscontainer.querySelectorAll(".task-box").forEach((task) => {
			if(ele.target.textContent === 'all') {
				task.style.display = 'flex';
				setLocalStorage();
			} else if (ele.target.textContent === 'active') {
				remindElement.textContent = `${otherBoxes.length - completedTask.length} items`;
				task.classList.contains('task-completed') ?(task.style.display = 'none') :(task.style.display = 'flex');
			} else if (ele.target.textContent === 'completed') {
				remindElement.textContent = `${completedTask.length} items`;
				task.classList.value === "task-box" ?(task.style.display = 'none' ) :(task.style.display = 'flex');
			};
		});
	};
/*========= End Function Handle Bottom Statement Buttons ==============*/


/*======== Start Function Handle Bottom Bar Statement Buttons ==========*/ 	
	(function bottomBarHandler()	 {
		statementBtns.forEach( element => {
			//==== Set Statement Button Jobs
			element.addEventListener('click', event => {

				//====== Remove All Active ClassName .
					element.parentElement.querySelectorAll(".active").forEach((event) => {
						event.classList.remove('active');
					});
				//======= Add Active Class
					event.target.classList.add("active");

				//======== Run Handler Statements Function .
					statementRules(event);
			});
		});
	}());
/*======== End Function Handle Bottom Bar Statement Buttons ==========*/ 	

