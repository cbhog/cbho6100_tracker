// Get references to HTML elements
const taskForm = document.getElementById("taskform");
const taskList = document.getElementById("tasklist");
const taskModal = document.getElementById("task-modal");
const pushButton = document.getElementById("pushButton");
const pullButton = document.getElementById("pullButton");
const legsButton = document.getElementById("legsButton");
const pushSection = document.getElementById("push-sec");
const pullSection = document.getElementById("pull-sec");
const legsSection = document.getElementById("legs-sec");
const taskTypeSelect = document.getElementById("taskType");

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
});

pullSection.addEventListener("click", () => {
  updateMuscleGroupOptions("Back", "Biceps");
});

legsSection.addEventListener("click", () => {
  updateMuscleGroupOptions("Quads", "Hamstrings", "Calves");
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

    const taskWeight = document.createElement("p");
    taskWeight.innerHTML = `Weight: <span id="taskWeight-${index}">${task.rate}</span> ${task.metric}`;

    const taskSets = document.createElement("p");
    taskSets.textContent = `Sets: ${task.time}`;

    const taskReps = document.createElement("p");
    taskReps.textContent = `Reps: ${task.client}`;

    taskItem.appendChild(taskName);
    taskItem.appendChild(taskWeight);
    taskItem.appendChild(taskSets);
    taskItem.appendChild(taskReps);

    // Open the modal on task item click
    taskItem.addEventListener("click", () => showTaskDetails(index));

    // Prepend the task item to the task list
    taskList.insertAdjacentElement("afterbegin", taskItem);
  });
}


function showTaskDetails(index) {
  const task = tasks[index];
  const modalContent = `
    <h3>${task.name}</h3>
    <p>Muscle Group: ${task.type}</p>
    <p>Weight: <span id="taskWeight">${task.rate}</span> ${task.metric}</p>
    <p>Sets: ${task.time}</p>
    <p>Reps: ${task.client}</p>
    <h4>Notes</h4>
    <ul>${task.notes.map((note) => `<li>${note}</li>`).join("")}</ul>
    <form id="noteForm">
      <label for="noteInput">Add Note:</label>
      <input type="text" id="noteInput" required />
      <button type="submit">Add</button>
    </form>
    <button id="deleteTask">Delete</button>
    <button id="closeModal">Close</button>
  `;

  taskModal.innerHTML = modalContent;
  taskModal.showModal();

  // Handle note submission
  const noteForm = document.getElementById("noteForm");
  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const noteInput = document.getElementById("noteInput");
    const note = noteInput.value.trim();
    if (note) {
      task.notes.push(note);
      showTaskDetails(index); // Re-render the modal to display the updated notes
      noteInput.value = ""; // Clear the note input field
      saveTasks(); // Save tasks to local storage
    }
  });

  // Handle task deletion
  const deleteButton = document.getElementById("deleteTask");
  deleteButton.addEventListener("click", () => {
    tasks.splice(index, 1); // Remove the task from the array
    renderTasks(); // Re-render the tasks list
    saveTasks(); // Save tasks to local storage
    taskModal.close(); // Close the modal
  });

  // Handle modal close
  const closeModalButton = document.getElementById("closeModal");
  closeModalButton.addEventListener("click", () => {
    taskModal.close();
  });
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

  // Create a new task object
  const newTask = {
    name: taskName,
    type: taskType,
    rate: taskRate,
    metric: taskMetric,
    time: taskTime,
    client: taskClient,
    notes: [],
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
