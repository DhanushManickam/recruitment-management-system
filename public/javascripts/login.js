document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email_id').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_id: email, password })
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = '/candidate';
      } else {
        alert(result.message || 'Login failed');
      }

    } catch (error) {
      console.error('Login request failed:', error);
      alert('Network error');
    }
  });
});