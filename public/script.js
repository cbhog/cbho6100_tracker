// Get references to HTML elements
const taskForm = document.getElementById("taskform");
const taskList = document.getElementById("tasklist");
const taskModal = document.getElementById("task-modal");
const pushSection = document.getElementById("push-sec");
const pullSection = document.getElementById("pull-sec");
const legsSection = document.getElementById("legs-sec");
const taskTypeSelect = document.getElementById("taskType");
const taskTitle = document.getElementById("taskTitle");

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

// Function to update the muscle group options in the task form
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

// Function to update the task title in the form
function updateTaskTitle(title) {
  taskTitle.textContent = title;
}

// Function to scroll to the task tracker section
function scrollToTracker() {
  const trackerSection = document.getElementById("taskform");
  trackerSection.scrollIntoView({ behavior: "smooth" });
}

// Function to render the list of tasks
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

    taskItem.appendChild(taskName);
    taskItem.appendChild(taskSetsReps);
    taskItem.appendChild(taskWeight);
    taskItem.appendChild(taskDate);

    // Open the modal on task item click
    taskItem.addEventListener("click", () => showTaskDetails(index));

    // Prepend the task item to the task list
    taskList.insertAdjacentElement("afterbegin", taskItem);
  });
}

// Function to show task details in the modal
function showTaskDetails(index) {
  const task = tasks[index];
  const modalContent = `
    <h3>${task.name}</h3>
    <p>Muscle Group: ${task.type}</p>
    <p>Sets x Reps: ${task.time} x ${task.client}</p>
    <p>Weight: <span id="taskWeight">${task.rate}</span> ${task.metric}</p>
    <p>Date Added: ${task.dateAdded}</p>
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

// Function to add a new task
function addTask(event) {
  event.preventDefault();

  // Get input values
  const taskName = document.getElementById("taskName").value;
  const taskType = document.getElementById("taskType").value;
  const taskRate = document.getElementById("taskRate").value;
  const taskTime = document.getElementById("taskTime").value;
  const taskClient = document.getElementById("taskClient").value;
  const taskMetric = document.getElementById("taskMetric").value;

  // Create a new task object with the current date
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

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Render tasks
  renderTasks();

  // Clear form inputs
  taskForm.reset();

  // Save tasks to local storage
  saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener for form submission
taskForm.addEventListener("submit", addTask);
