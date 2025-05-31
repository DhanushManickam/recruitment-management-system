function username(){
    var today = new Date()
    var curHr = today.getHours()
    let greet = "";
    if (curHr < 12) {
        greet = "Good Morning ";
    } 
    else if (curHr < 18) {
        greet = "Good Afternoon ";
    } else {
        greet = "Good evening ";
    }
    document.getElementById("greeting").innerHTML = greet;
}
username();