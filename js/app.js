
// Check If There's local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

  // console.log('Local Storage Is Not Empty You Can Set It On Root Now');
  document.documentElement.style.setProperty('--main-color', mainColors);

   // Remove Active Class From All Colors List Item 
   document.querySelectorAll(".colors-list li").forEach(element => {

    element.classList.remove("active");    
    
    // Add Active Class On Element With Data-Color === Local Storage Item
    if(element.dataset.color === mainColors){

      // Add Active Class 
      
      element.classList.add("active");
    }
 });
  
}
// Random Background Option 
let backgroundOption= true;

// Variable To Control The Background Interval 
let backgroundInterval;

// Check If There's Local Storage Random Background Item 
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty 
if (backgroundLocalItem !== null) {
 
  if(backgroundLocalItem === 'true'){

    backgroundOption = true;

  }else {
    backgroundOption =false; 
  }
}

// Remove Active Class From All Spans 
document.querySelectorAll(".random-backgrounds span").forEach(ele => {

   ele.classList.remove("active");

}); 

if( backgroundLocalItem === 'true'){
   
  document.querySelector(".random-backgrounds .yes").classList.add("active");
  
}else {
  document.querySelector(".random-backgrounds .no").classList.add("active");
}


// Toggle Spin Class on icon 
document.querySelector(".toggle-setting .fa-cog").onclick = function (){
   
  // Toggle Class fa-spin For Rotation on Self
    this.classList.toggle("fa-spin");

  // Toggle Class Open On Main Settings Box  
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors 
let colorsList= document.querySelectorAll(".colors-list li");

// Loop On All List Items 
colorsList.forEach(ele => {

   // Click On Every List Items 
   ele.addEventListener("click", (e) =>{

     // Set Color On Root 
      document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
    
     // Set Color On Local Storage 
     localStorage.setItem("color_option", e.target.dataset.color); 

     handleActive(ev);
   });
});

// Switch Random Background Option 
const  randomBackElement = document.querySelectorAll(".random-backgrounds span");

// loop On All Spans
randomBackElement.forEach(sp =>{
   
  // click on Every Span 
   sp.addEventListener("click",(e) => {
    
      
     handleActive(e);

     if (e.target.dataset.background === "yes"){

        backgroundOption = true;
        randomizeImgs();
        localStorage.setItem("background_option", true);
        
     }else {

       backgroundOption = false;
       clearInterval(backgroundInterval);
       localStorage.setItem("background_option", false);
     }
   });
});

// Select landing Page Element
let landingPage = document.querySelector(".landing-page"); 

// Get Array Of Images
let imageArray = ["image_1.jpg","image_2.jpg","image_3.jpg","image_4.jpg","image_5.jpg"]




// Function Randomize Imgs 
function randomizeImgs () {
  
  if(backgroundOption === true){

   backgroundInterval = setInterval(function(){
        
        // Get Random Number 
        let randomNumber = Math.floor(Math.random() * imageArray.length); 
        // Change background Image URL 
        landingPage.style.backgroundImage = 'url("images/'+imageArray[randomNumber]+'")';
  
  },1000);

  }
}

// Start App On Div Our Skills 

// Select Skills Selector 
 let ourSkills =document.querySelector(".skills");

 // Event On Scrolling 
 window.onscroll = function () {

    // Skills Offset Top 
    let skillsOffsetTop =ourSkills.offsetTop;
    // this.console.log(skillsOffsetTop);
     
    // Skills Outer Height 
    let skillsOuterHeight = ourSkills.offsetHeight;
    // this.console.log(skillsOuterHeight);

    // Window Height 
    let windowHeight = this.innerHeight;
    // this.console.log(windowHeight);
    
    // window ScrollTop 
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
      
      // Get All Skills (span)
      let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

      allSkills.forEach(skill => {

        skill.style.width = skill.dataset.progress;
      });
    }
 };
// End App On Div Our Skills 

// Start App On Div Our Gallery 

// Create Popup With The Image 
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach(img =>{

  img.addEventListener('click', (e)=>{

  //  Create Overlay Element 
  let overlay = document.createElement("div"); 

  // Add Class To Div overlay 
  overlay.className="popup-overlay"; 

  // Append Overlay To Body 
  document.body.appendChild(overlay);


  // Create Element  The Popup Box 
  let popupBox = document.createElement("div"); 

  // Add Class To Div PopupBox 
  popupBox.className = "popup-box";


  // Create The Close Span 
  let closeButton = document.createElement("span");

  // Create The Close Button Text 
  let closeButtonText = document.createTextNode("X");

  // Append The Text To close Button 
  closeButton.appendChild(closeButtonText);

  // Add Class To Close Button 
   closeButton.className = 'close-button';

  // Append Close Button To Popup Box 
  popupBox.appendChild(closeButton);
   


  // ADD Heading To Popup Box 
  if (img.alt !== null) {

    // Create Heading 
    let imgHeading = document.createElement("h3");

    // Create Text For Heading 
    let imgText = document.createTextNode(img.alt);

    // Append Text To The Heading 
    imgHeading.appendChild(imgText)

   // Append The Heading To The Popup Box 
   popupBox.appendChild(imgHeading);

   }

  // Create Element Image 
  let popupImage = document.createElement("img");
  
   // Set Image Source 
   popupImage.src =img.src  

   // Append popupImage To popupBox
   popupBox.appendChild(popupImage);

   // Append popupBox To Body 
   document.body.appendChild(popupBox);

  });
});

// Close Popup Box 
document.addEventListener('click', function(e){

  if(e.target.className == 'close-button'){

    // Remove The Current Popup 
     e.target.parentNode.remove();

    // Remove Overlay 
    document.querySelector(".popup-overlay").remove(); 
  }

});


// End App On Div Our Gallery 


// Start App On Div Bullets 
 const allBullets = document.querySelectorAll(".nav-bullets .bullet");


// Start App On Div Links 
 const allLinks= document.querySelectorAll(".links  a");

function scrollSomeWhere(element){

  element.forEach(ele => {
    
   ele.addEventListener('click', (e) =>{
 
       e.preventDefault();
       document.querySelector(e.target.dataset.section).scrollIntoView({
 
         behavior:'smooth'
       });
 
   });
  }); 
}

scrollSomeWhere(allBullets);
scrollSomeWhere(allLinks);



// Handle Active Stats 
function handleActive(ev) {

  ev.target.parentElement.querySelectorAll(".active").forEach(element => {

    element.className.remove("active");
  });

  ev.target.className.add("active");
}


const bulletsContainer = document.querySelector(".nav-bullets");
const bulletsSpan = document.querySelectorAll("bullets-option span");
let bulletsLocalItem = localStorage.getItem("bullets_option");


if(bulletsLocalItem !== null){

  bulletsSpan.forEach(span =>{
    
    span.classList.remove("active");

  });

  if(backgroundLocalItem === 'block'){
   
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  }else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach(span =>{

   span.addEventListener('click', (e) => {

     if(span.target.dataset.display === 'show'){
      
        bulletsContainer.style.display = "block";

        bulletsLocalItem.setItem("bullets_option", "block");
     }else {

      bulletsContainer.style.display ="none";

      bulletsLocalItem.setItem("bullets_option", "none");
     }

     handleActive(e);

   });
});

// Rest Button 

document.querySelector(".rest-button").onclick = function () {
  

  // Clear Local Storage
  // localStorage.clear();

  localStorage.removeItem("color_option"); 
  localStorage.removeItem("background_option"); 
  localStorage.removeItem("bullets_option"); 

  // Reload Window 
  window.location.reload();
};
// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links-container .links");

toggleBtn.onclick = function (e) {

  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");



};

// Click AnyWhere Outside Menu And Toggle Button

document.addEventListener("click", (e) =>{
 
  if(e.target !== toggleBtn && e.target !== tLinks){
    console.log("");
  }
  // Check If Menu The Open
  if(tLinks.classList.contains("open")){
    
    toggleBtn.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
  }
});


// Stop Propagation On Menu 
tLinks.onclick = function(e){
  e.stopPropagation();
}