# cbho6100_tracker
# PPL Split
## DECO2017 A3: Web App Prototype
This application aims to provide users with a method of tracking their workouts and exercises over time.

## Development Documentation

### Setup
1. Install [Node.js](https://nodejs.org/en)
2. Clone the GitHub repository
3. Using the terminal, install Parcel by running the following command: npm install --save-dev parcel
5. Using the terminal, run `npm run dev` to start the web server 
6. View on a web browser at http://localhost:1234/

### Screen Specifications
Responsiveness was made according to most monitors and phones. Testing during development was done between two specific screens.
- Desktop Monitor (1920 x 1080)
- Iphone XR (414 x 896)

### Development Log

#### Log 1
- Initial wireframe for app
![Image of wireframe of app design](/documentation/iteration1.png)

#### Log 2
- Created the basic HTML structure for the application, featuring:
    - Input form
    - List element to display data from the form
- Added JavaScript to handle form submission and displaying the data
- Implemented the use of localstorage in JS to save data in the user's browser
![Image of basic HTML structure](/documentation/iteration2.png)

#### Third Iteration
- Added images that correspond to each muscle group
- Created modal elements to display:
    - Input form
    - All assosciated data for each list item (each list item created will also create a modal)
- Added floating labels over form input fields
![Image of images that correspond to muscle group chosen](/documentation/iteration3-1.png)
![Image of modal element containing input form](/documentation/iteration3-2.png)
![Image of modal element containing all assosciated data for each list item](/documentation/iteration3-3.png)

#### Current Iteration
- Created landing page
- Moved everything to be below the landing page
- CSS styling was applied after website functionality was developed
- Webpage was made responsive for mobile and desktop devices after all elements were styled

#### Future Iterations
Jym Journey can be improved in the future through the implementation of additional features such as:
- Filtering data (sorting by date/session, exercise, etc.)
- Display an image for each exercise rather than the muscle group
- Data visualisation
- Ability to login/create an account
- Ability to edit existing items

#### Known Bugs/Issues
- When the input form popup (modal)  is open, sometimes dragging the text to highlight it causes the popup to close if the mouse is released outside the popup window, since there is the functionality to close the popup by clicking outside the box.
- After the user selects an option for the dropdown (select) menu, the placeholder text will be grey if the element is not selected, i.e. user chooses ‘Easy’ but the text appears grey in the dropdown even after choosing. If this text were instead set to black, the placeholder text would appear black before the user chooses an option i.e. ‘Select Difficulty’ would appear black.
- If the note content is too long, the close button of the popup/modal may be hidden unless the user scrolls down


## References

### Code References
- F, R. (2020, April 13). Floating Label over input. Retrieved June 7, 2023, from DEV Community website: https://dev.to/yne/floating-label-over-input-cci

- How To Create a Scroll Back To Top Button. (2019). Retrieved from W3schools.com website: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

- Modals Will Never Be The Same - HTML dialog Element. (2023, April 24). Retrieved June 7, 2023, from blog.webdevsimplified.com website: https://blog.webdevsimplified.com/2023-04/html-dialog/

- Waqleh. (2013, May 2). html/css buttons that scroll down to different div sections on a webpage. Retrieved June 7, 2023, from Stack Overflow website: https://stackoverflow.com/questions/16349490/html-css-buttons-that-scroll-down-to-different-div-sections-on-a-webpage

### Image References
- Biceps Arm Muscle. (n.d.). In PNGEGG. Retrieved from https://www.pngegg.com/en/png-zfrph

- bsd studio. (2017). Muscular male torso icon stock illustration. In istockphoto. Retrieved from https://www.istockphoto.com/vector/muscular-male-torso-icon-gm858902142-141867015

- Girven, S. (2021). people in a room with a black table and chairs. In unsplash. Retrieved from https://unsplash.com/photos/fqMu99l8sqo

- Muscles Used In Chest And Back Workouts. (2023). In Garage Gym Reviews. Retrieved from https://www.garagegymreviews.com/chest-and-back-workout

- Shoulders - Muscle. (n.d.). In PNGITEM. Retrieved from https://www.pngitem.com/middle/hJmiTTb_shoulders-muscle-hd-png-download/

- Vashchuk, S. (2018). Vector image lower body man. The muscles of the legs. White background stock illustration. In istockphoto. Retrieved from https://www.istockphoto.com/vector/vector-image-lower-body-man-the-muscles-of-the-legs-white-background-gm941124588-257238338

