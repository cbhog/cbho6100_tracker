// Get references to HTML elements
const taskForm = document.getElementById("taskform"); // Reference to the task form element
const taskList = document.getElementById("tasklist"); // Reference to the task list element
const taskModal = document.getElementById("task-modal"); // Reference to the task details modal element
const pushSection = document.getElementById("push-sec"); // Reference to the push section element
const pullSection = document.getElementById("pull-sec"); // Reference to the pull section element
const legsSection = document.getElementById("legs-sec"); // Reference to the legs section element
const taskTypeSelect = document.getElementById("taskType"); // Reference to the task type select element
const taskTitle = document.getElementById("taskTitle"); // Reference to the task title element

// Initialize tasks array
let tasks = [];

// Check if tasks exist in local storage
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderTasks();
}

// Update muscle group options based on section click
pushSection.addEventListener("click", () => {
  updateMuscleGroupOptions("Chest", "Shoulders", "Triceps");
  updateTaskTitle("Push");
  scrollToTracker();
});

pullSection.addEventListener("click", () => {
  updateMuscleGroupOptions("Back", "Biceps");
  updateTaskTitle("Pull");
  scrollToTracker();
});

legsSection.addEventListener("click", () => {
  updateMuscleGroupOptions("Quads", "Hamstrings", "Calves");
  updateTaskTitle("Legs");
  scrollToTracker();
});

function updateMuscleGroupOptions(...options) {
  // Clear existing options
  taskTypeSelect.innerHTML = "";

  // Add new options
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    taskTypeSelect.appendChild(optionElement);
  });
}

function updateTaskTitle(title) {
  taskTitle.textContent = title;
}

function scrollToTracker() {
  const trackerSection = document.getElementById("taskform");
  trackerSection.scrollIntoView({ behavior: "smooth" });
}

function renderTasks() {
  // Clear task list
  taskList.innerHTML = "";

  // Create HTML for each task
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    // Add hover effect and color change on hover
    taskItem.addEventListener("mouseenter", () => {
      taskItem.classList.add("hovered");
    });

    taskItem.addEventListener("mouseleave", () => {
      taskItem.classList.remove("hovered");
    });

    const taskName = document.createElement("h4");
    taskName.textContent = task.name;

    const taskSetsReps = document.createElement("p");
    taskSetsReps.textContent = `${task.time} x ${task.client}`;

    const taskWeight = document.createElement("p");
    taskWeight.innerHTML = `Weight: <span id="taskWeight-${index}">${task.rate}</span> ${task.metric}`;

    const taskDate = document.createElement("p");
    taskDate.textContent = `Date Added: ${task.dateAdded}`;

    const taskImage = document.createElement("img");
    taskImage.src = getMuscleGroupImage(task.type);
    taskImage.alt = task.name;
    taskImage.classList.add("task-image");

    taskItem.appendChild(taskName);
    taskItem.appendChild(taskSetsReps);
    taskItem.appendChild(taskWeight);
    taskItem.appendChild(taskDate);
    taskItem.appendChild(taskImage);

    // Open the modal on task item click
    taskItem.addEventListener("click", () => showTaskDetails(index));

    // Prepend the task item to the task list
    taskList.insertAdjacentElement("afterbegin", taskItem);
  });
}

function getMuscleGroupImage(muscleGroup) {
  switch (muscleGroup) {
    case "Chest":
      return "images/muscles-chest.png";
    case "Shoulders":
      return "images/muscles-chest.png";
    case "Triceps":
      return "C:/Users/chand/OneDrive - The University of Sydney (Students)/Desktop/cbho6100_tracker/public/images/muscles-tri.png";
    case "Back":
      return "images/muscles-back.png";
    case "Biceps":
      return "images/muscles-bicep.png";
    case "Quads":
      return "images/muscles-quad.png";
    case "Hamstrings":
      return "images/muscles-hamcalf.png";
    case "Calves":
      return "images/muscles-hamcalf.png";
    default:
      return "path/to/default-image.jpg";
  }
}

function showTaskDetails(index) {
  const task = tasks[index];
  const modalContent = `
    <h3>${task.name}</h3>
    <p>Muscle Group: ${task.type}</p>
    <p>Sets x Reps: ${task.time} x ${task.client}</p>
    <p>Weight: <span id="taskWeight">${task.rate}</span> ${task.metric}</p>
    <p>Date Added: ${task.dateAdded}</p>
    <img src="${getMuscleGroupImage(task.type)}" alt="${task.name}" class="task-modal-image">

    <h4>Feedback</h4>
    <p>${getFeedback(task.time, task.client)}</p>

    <button id="deleteTask">Delete</button>
    <button id="closeModal">Close</button>
  `;

  taskModal.innerHTML = modalContent;
  taskModal.showModal();

  // Remove previous event listeners
  const deleteButton = document.getElementById("deleteTask");
  const closeModalButton = document.getElementById("closeModal");
  deleteButton.removeEventListener("click", deleteTask);
  closeModalButton.removeEventListener("click", closeModal);

  // Handle task deletion
  function deleteTask() {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
    taskModal.close();
  }
  deleteButton.addEventListener("click", deleteTask);

  // Handle modal close
  function closeModal() {
    taskModal.close();
  }
  closeModalButton.addEventListener("click", closeModal);
}

function getFeedback(sets, reps) {
  let feedback = "";

  if (reps < 8) {
    feedback += "Depending on your goals, increase the amount of reps to 8-12. Train close or to failure with good form to maximise hypertrophy. ";
  }

  if (reps >= 10 && reps <= 12) {
    feedback += "Consider increasing weight. ";
  }

  if (sets > 4) {
    feedback += "Consider dropping the number of sets to 3-4 and increase weight to train with higher intensity.";
  }

  return feedback;
}



function addTask(event) {
  event.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const taskType = document.getElementById("taskType").value;
  const taskRate = document.getElementById("taskRate").value;
  const taskTime = document.getElementById("taskTime").value;
  const taskClient = document.getElementById("taskClient").value;
  const taskMetric = document.getElementById("taskMetric").value;

  // Validate sets and reps inputs
  if (taskTime <= 0 || taskClient <= 0 || taskRate <= 0) {
    alert("Values must be positive.");
    return; // Exit the function if validation fails
  }

  const newTask = {
    name: taskName,
    type: taskType,
    rate: taskRate,
    metric: taskMetric,
    time: taskTime,
    client: taskClient,
    notes: [],
    dateAdded: new Date().toLocaleDateString(),
  };

  tasks.push(newTask);

  renderTasks();

  taskForm.reset();

  saveTasks();
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}




taskForm.addEventListener("submit", addTask);