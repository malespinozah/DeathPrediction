window.onload = function() {
    
    /* ARRAYS : MESSAGES ACCORDING TO THE CAUSE OF DEATH */
    // Here the messages are saved ready to show to the user
    var natural = [
        
        "Seems that you didn't understand when your mom told you to eat slowly, did you?. You chocked on food and died alone.",
        "You slipped on the wet floor and cracked your head on the stairs. Stop looking at your phone.",
        "Following your cheater lover costed you your life. Putting yourself in front of the car wasn't a smart move.",
        "You were so young, why did you use Viagra? You didn't need it. Rest in peace.",
        "You went to the Bahamas and a shark ate you alive. Bon appétit, sharky.",
        "You were told not to touch it. Stubborn. How does it feel to be inside a crocodile?",
        "Laughing too much was your only flaw. Laughing next to the window was a bad idea. Sorry.",
        "How long did it take you to get to heaven? You were thrown out of a roller coaster.",
        "Eating mushrooms in the forest was a good way to survive, but you ate the wrong one.",
        "You shouldn't have stayed out so late walking along the train tracks drunk. You lost both legs.",
        "Why do people like so much Red Bull? It really gave you wings.",
        "Tarantulas were your friends until one decided to kill you. Bad owner.",
        "Skating alone in a lake of ice turned you into an ice statue, but no one will ever know.",
        "Modeling on a balcony to get a selfie is good, but vanity is not. Don't worry, it didn't hurt.",
        "You are now trending! Spontaneous human combustion is something to talk about.",
        "Lighting a cigarette near a gas station was a brilliant idea. This girl is on fireeee!",
        "You didn't see the signals? A wrecking ball demolished your body. Miley Cirus is proud.",
        "You didn't know biting your tongue was dangerous. You became a vampire.",
        "Surfing is fun until the waves make you roll over a rocky shore.",
    ]
    
    var accident = [
        
        "Your parachute didn't open. But you know, you were on TV News! Congratulations, falling star.",
        "Your Aerial rope broke. You died on the scene and traumatized a lot of kids. Not your fault, tho.",
        "A stampede killed you, it was a really Black Friday.",
        "You fell into a hole, and then it was covered. It was kinda hurtful.",
        "Inhale helium from a balloon was funny until you suffered from asphyxiation.",
        "You fell asleep on your bathtub. Or wel..., that is what your lover says. Who knows better than you. ",
        "A golf ball hit your nose. You couldn't stop the bleeding, you already had recent nose surgery. You wasted your money.",
        "An ambulance in a hurry hit and run over you. It saved you from this life.",
        "The elevator fell 10 floors. You didn't survive but you saved other lives. You did a good one!",
        "You were too much obsessed with cleaning the house. The toxic fumes cleaned your body. God found grace on you because of your purity.",
        "Noise Cancelling didn't let you hear when trees were cutting down. ",
        "Drinking detergent was a tragedy. You didn't notice the smell? You were too thirsty.",
        "A strong earthquake stroke while camping. You were near a cliff of rocks.",
        "A lightning strike hit you. For one second, you were God for having your own light.",
        "Has no one ever told you to make sure the gun is not loaded before cleaning?",
        "A meteorite fell on you when you were walking at night.",
        "A hurricane took you. For a moment you believed you could fly. ",
        "The airplane fell in the forest. You survived but you were eaten by animals.",
        "You created a car that works with water. Yes, your 'death' was an accident.",
        
    ]    
    
    /* ---VARIABLES : querySelector---- */
    // Variables used in the whole javascript
    var alertage = document.querySelector('.alert__age')
    var starting = document.querySelector('.starting');
    var button = document.querySelector('.starting__button');
    var welcome = document.querySelector('.welcome__box');
    var userName = document.querySelector('.username');
    var userForm = document.querySelector('#user__form');
    var videoBox = document.querySelector('.video__box');
    var form = document.querySelector('.prediction');
    var inputName = document.querySelector('.starting input');
    var inputDate = document.querySelector('.bdate');
    var submitButton = document.querySelector('#btn');
    var outputPrediction = document.querySelector('.output__prediction')
    var outputDate = document.querySelector('.death__date');
    var outputCause = document.querySelector('.death__cause');
    var outputMessage = document.querySelector('.death__msg');
    var clean = document.querySelector('.clean');
    
    /* EVENT HANDLER FOR SUBMITING USER INFORMATION */
    form.onsubmit = submittedForm;
    
    /*--- SUBMITTED FORM FUNCTION ---*/
    // Validates if the birth date information was given correctly
    // Display the prediction and the message (cause of death)
    function submittedForm() {
    
        if (validationData() === true) {
            outputPrediction.style.display = "block";
            displayCauseOfDeath();
            alertage.style.display = "none";
            clean.style.display = "block";
            submitButton.style.display = "none";
            inputDate.disabled = true;
        }
        return false;
    }
    
    /*--- VALIDATION DATA FUNCTION ---*/
    // Extracts the birth date input to verify it's not empty
    function validationData() {
        const birthDate = inputDate.value; 
        
        if (birthDate === ""){
            inputDate.focus();
            return false;
        }
        return validDate(birthDate);
        
    }

    /*--- VALID DATE FUNCTION ---*/
    // Takes the birth date to compare it with current year
    // And if the user is not 18 years-old, they won't be able to use it
    function validDate(birthDate) {
        var selectedDate = new Date(birthDate);
        var currentYear = new Date().getFullYear();
        var inputYear = selectedDate.getFullYear();
        var age = currentYear - inputYear;
    
        // Comparing years
        if(age < 18){
            console.log("Age:", age);
            inputDate.focus();
            alertage.innerHTML = "You must be at least 18 years-old.";
            return false;
        }
        if(age > 100){
            console.log("Age:", age);
            inputDate.focus();
            alertage.innerHTML = "You are already dead.";
            return false;
        }
    
        return true;
    }
    
    /*--- GET RANDOM CAUSE FUNCTION ---*/
    // Picks a random element from any given array.
    function getRandomCause(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    /*--- GET RANDOM DEATH DATE FUNCTION---*/
    // Calculates a random death date based on the birthdate, not exceeding the 99th birthday.
    function getRandomDeathDate(birthDate) {
        var birth = new Date(birthDate);
        var today = new Date();
        var maxDeathDate = new Date(birth);
        maxDeathDate.setFullYear(birth.getFullYear() + 99);
    
        // Ensure maxDeathDate is not before today
        if (maxDeathDate < today) {
            maxDeathDate = today;
        }
    
        // Generate a random date between today and maxDeathDate
        var randomDeathDate = new Date(today.getTime() + Math.random() * (maxDeathDate.getTime() - today.getTime()));
        return randomDeathDate.toLocaleDateString();
    }
    
    /*--- DISPLAY CAUSE OF DEATH FUNCTION ---*/
    // Determines randomly whether to use the natural or accident array
    // Selects a random cause from that array
    // And then updates the HTML to display the type of cause and the specific cause of death.
    function displayCauseOfDeath() {
    
        var causeType = Math.random() < 0.5 ? 'natural' : 'accident';
        var causeArray = causeType === 'natural' ? natural : accident;
        var randomCause = getRandomCause(causeArray);
    
        // Sets the inner HTML of the outputCause element to the causeType, with the first character capitalized.
        outputCause.innerHTML = causeType.charAt(0).toUpperCase() + causeType.slice(1);
    
        // Sets the inner HTML of the outputPrediction element to the randomly selected cause of death.
        outputMessage.innerHTML = randomCause;
    
        // Change video source here
        var video = videoBox.querySelector('video');
        video.src = 'videos/Screamer.mp4';
        video.autoplay = true;
        video.loop = false; 
    
        // Get and set the random death date
        const birthDate = inputDate.value; 
        var deathDate = getRandomDeathDate(birthDate);
        outputDate.innerHTML = deathDate;
    }
    
    /*--- DISPLAY VIDEO FUNCTION---*/
    // Show the video with autoplay
    function displayVideo(){
        // Creates the video element
        var video = document.createElement('video');
        
        // Sets the video source
        video.src = 'videos/CoffinDance.mp4';
            
        // Sets the video attributes
        video.width = 640; // Sets the width of the video
        video.height = 360; // Sets the height of the video
        video.controls = false; // Adds controls to the video
        video.loop = true; // Sets the video to loop
        video.autoplay = true; // Ensures the video plays automatically
        video.mute = true; // Mutes the video to allow autoplay in most browsers
            
        // Append the video to the container
        videoBox.appendChild(video);
    }

    /*--- SHOW CONTENT FUNCTION---*/
    // Shows the content for user
    function showContent(){

        const username = inputName.value;

        if(username === "") {
            inputName.style.background = "red";
            inputName.style.color = "white";
            inputName.focus();
            return false;
        }
        
        starting.style.display = 'none';
        userForm.style.display = 'flex';
        videoBox.style.display = 'block';
        welcome.style.display = 'block';
        userName.innerHTML = username;
        displayVideo();
     }

    /*--- CLEAR LOCAL STORAGE FUNCTION---*/    
    // Function to clear local storage
    function clearLocalStorage() {
        localStorage.clear(); // Clear all items in local storage
        location.reload();
    }
    
    /*--- EVENT LISTENERS ---*/    
    // Attaches click event handler to the button
    clean.addEventListener('click', clearLocalStorage);
    
    // This button display the content and allows the autoplay 
    button.addEventListener('click', showContent)

    }
    
    
    
    