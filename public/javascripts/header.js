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
        document.getElementById('profile').innerHTML = `
            <div class="dropdown">
                <button class="btn btn-light dropdown-toggle d-flex align-items-center rounded-pill w-auto" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-user pro_logo me-2"></i>${employee.name}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li class="d-block">
                        <span class="m-2 d-inline-flex align-items-center">
                            <i class="fa fa-user me-2"></i>${employee.email_id}
                        </span>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                        <a class="dropdown-item" href="#" onclick="localStorage.removeItem('jwt_token'); window.location.href='/';">
                            <i class="fa fa-sign-out-alt me-2"></i>Log out
                        </a>
                    </li>
                </ul>
            </div>
        `;
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
