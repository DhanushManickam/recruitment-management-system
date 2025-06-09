document.addEventListener('DOMContentLoaded',function(){
    const token = localStorage.getItem('jwt_token'); 
    
      if (!token) {
        console.warn('No token found. Redirecting to login...');
        window.location.href = '/'; 
        return;
      }

      fetch('/api/emp_profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(employee => {
        document.getElementById('profile').innerHTML = `<p><i class ="fa fa-user pro_logo"></i>${employee.name}</p>`;
      })
      .catch(error => {
        console.log(token);
        console.error('Error:', error);
        alert('Session expired or unauthorized');
        window.location.href = '/';
    });
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

})
