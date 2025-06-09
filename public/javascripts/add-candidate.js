fetch('../html/add-candidate.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    const modal = document.getElementById('addModal');
    const closeBtn = document.querySelector('.addclosebtn');

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    document.querySelectorAll('.openAddModalLink').forEach(btn => {
      btn.addEventListener('click',e=>{
        e.preventDefault();
        modal.style.display = 'block';
      })
    });

    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
    setTimeout(() => {
      const skillInput = document.querySelector("input[name='basic']");
      if (skillInput && !skillInput._tagify) {
        new Tagify(skillInput);
      }
    }, 50);

    const email = document.getElementById('email');
    if (email) {
      email.addEventListener('input', async () => {
        const res = await fetch('/api/candidates');
        const candidates = await res.json();
        const exists = candidates.some(c => c.email_id === email.value);
        if (exists) {
          document.getElementById('candidate_profile').innerHTML = `<p style="color : red; font-size: 14px;">This email already exist</p>`
          email.classList.add('is-invalid'); 
        } else {
          email.classList.remove('is-invalid');
        }
      });
    }
});
function toggleOtherInput() {
  const select = document.getElementById("source");
  const otherField = document.getElementById("referral_field");
  if (select.value === "Referral") {
      otherField.style.display = "block";
  } else {
      otherField.style.display = "none";
  }
}
