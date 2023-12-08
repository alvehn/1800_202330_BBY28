# Project Title

## 1. Project Description
Our team bby28 is developing What’s Happening to help you find events tailored to your interests as easily as possible by creating a central hub for local events and community gatherings. Some of our core features are viewing events, saving events to favourites, viewing and editing your profile, and creating an event. 

## 2. Names of Contributors

* Alvin, I like eating ramen
* Sohail, I like coding
* Navjot, I like programming
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.

Technologies: 
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* VScode

Resources: 
* https://www.youtube.com/watch?v=ifi6dXOl3g4 
* COMP 1800 demo's #7-13
* Tech Tips B01a, B01b, B01c, B06
* https://stackoverflow.com/questions/12790297/hiding-button-using-jquery 
* https://www.sitepoint.com/delay-sleep-pause-wait/
* https://stackoverflow.com/questions/5138719/change-default-text-in-input-type-file
* https://chat.openai.com/c/9b8fc48a-2c73-437e-9323-86883b187830
* https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
* https://www.w3schools.com/

Images: 
* https://www.youtube.com/watch?v=6b5Sd_S4aUo
* https://www.shutterstock.com/search/indian-food?image_type=photo 
* https://dianacooper.com/knowlege-base/unicorns/

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Git pull or git clone
* edit edit edit
* stage commit push (add commit push)

## 5. Known Bugs and Limitations
Here are the limitations of this app:
* 
* 
* 

## 6. Features for Future
What we'd like to build in the future:
* Google maps api built in to find exact location of events
* viewing other peoples profiles and chatting with others in app
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore              # Git ignore file
├── 404.html                # loads this when page is not found or cannot be loaded
├── firebase.json           # holds json code for hosting our app
├── firestore.indexes.json  # holds more json code for app hosting
├── firestore.rules         # holds rules for firebase hosting
├── storage.rules           # holds rules for firebase storage when hosting
├── index.html              # landing page that promotes our website; can be viewed when not loggedd in
├── footer_after_login.html # holds html code for footer that only displays for logged in users
├── event.html              # dipslays full event details of a given event
├── favourites.html         # shows events that a user has favourited
├── login.html              # login page 
├── main.html               # defalut page after login displaying event cards and nav bar with search and menu options
├── newEvent.html           # page where user can create a new event 
├── profile.html            # profile of currently logged in user
└── README.md               # Contains details about source code (what you're reading right now!)

It has the following subfolders and files:
├── images                   # Folder for images
    /favicon.ico             # By 
├── scripts                  # Folder for scripts
    /authentication.js       # authenticates user with account or new user 
    /favourite.js            # controls what happens when event is favourited
    /filter.js               # contains all filter functionality on the main page 
    /interested.js           # contains all the code for storing user id when attend button is clicked
    /map.js                  # uses mapbox api to make location filtering function properly
    /newEvent.js             # controls logic and database writing of a new event creation
    /profile.js              # reads and displays profile info onto profile.html
    /readEvents.js           # displays event cards on main.html
    /readEventsPage.js       # displays full event details on event.html
    /search.js               # controls how search works when searching for events in main.html
    /skeleton.js             # loads appropriate nav bar whether user is logged in or not
├── styles                   # Folder for styles
    /style.css               # minor style adjustments to certain classes



```


