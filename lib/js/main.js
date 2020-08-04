
// get the reference using the dom
const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
let db =  firebase.database().ref(); // getting the reference for the database -db

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    // data schema-structure the way you want to organize your data
    // added new data in our database
    let value = {
        // 2 columns within each rom
        NAME: username,
        MESSAGE: message,
    };

    db.push(value); // making the row

}
let messageContainer = document.querySelector(".allMessages");
// Set database "child_added" event listener here
db.on("child_added", addMessageToBoard);
function addMessageToBoard(rowData){
    // extract row data
   // console.log("what are you", rowData);
    let row = rowData.val(); // return onject just like the object we pushed for
    console.log(row);

   // this is where we start using the informaton from out database
    let name= row.NAME;
    let sentence= row.MESSAGE;

    // add a new p tag to the page
    let newP = document.createElement("p");
    newP.innerText = name + ": " + sentence;
    messageContainer.appendChild(newP);
}