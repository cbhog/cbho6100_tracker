# cbho6100_tracker
# PPL Split
## DECO2017 A3: Web App Prototype
This application aims to provide users with a method of tracking their workouts and exercises over time, whilst providing feedback based off user input.
![Landing page](/docu/websitecap1.PNG)
![Tracker](/docu/websitecap2.PNG)

## Development Documentation

### Setup
1. Install [Node.js](https://nodejs.org/en)
2. Clone the GitHub repository
3. Using the terminal, install Parcel by running the following command: npm install --save-dev parcel
5. Using the terminal, run `npm run dev` to start the web server 
6. View on a web browser at http://localhost:1234/

### Development Log

#### Log 1
- Initial wireframe/mockup for PPL split
![Wireframe of website](/docu/mockups.jpeg)

#### Log 2
- Created a basic form using Week 4 content, emulating the basic structure of form.
- Added JavaScript to handle form submission and displaying the data
- Implemented the use of localstorage in JS to save data in the user's browser

#### Log 3
- Created first draft of homepage (html and css styling) with the addition of images corresponding to muscle group/day
- Fixed and customised tracker issues, adding functionality for the basics of exercise tracking

#### Log 4
- Combined both html pages (landing and input form)
- CSS styling was applied after website functionality was developed, changed it from the original wireframe to make the workouts/tasks added more compact for the user's benefit.
![CSS Styling of tasks added](/docu/cssstyle.PNG) 
- Responsiveness was made according to most monitors and phones. Testing during development was done between two specific screens.
![Website in Iphone dimensions](/docu/iphone.PNG)
- Modal function gives feedback based off user input and data, with feedback changing depending on what reps and sets you input.
![Feedback based off user input/data](/docu/feedback.PNG)

(Responsiveness)
Desktop Monitor (1920 x 1080)
Iphone XR (414 x 896)


#### Future Changes
- Displaying images corresponding towards the specific muscle groups, this was not implemented due to issues with the javascript failing to load images. Tried to troubleshoot but could not fix issue so finally decided not to go forward with the change. Specific muscle group images can be found in the /images file
- Recreating design closer to the initial wireframe designs, this can be done with the use of dynamic image loading, but since images failed to load it was hard to follow the initial wireframes.