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
      btn.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'block';
      });
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
      const token = localStorage.getItem('jwt_token');

      try {
        const res = await fetch('api/verify_candidate', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch candidates');

        const candidates = await res.json();
        const exists = candidates.some(c => c.email_id === email.value);
        const profileMsg = document.getElementById('candidate_profile');
        if (exists) {
          profileMsg.innerHTML = `<a style="color: red; font-size: 14px;" herf="#" id="existingCandidate">This email already exists</a>`;
          email.classList.add('is-invalid');
        } else {
          profileMsg.innerHTML = '';
          email.classList.remove('is-invalid');
        }
      } catch (err) {
        console.error('Email check failed:', err);
      }
      });
      }

    const form = document.getElementById('addcandidateForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt_token');
        if (!token) {
          alert("You are not authorized. Please log in.");
          return;
        }

        const formData = new FormData(form);

        try {
          const res = await fetch('/add_candidate', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });

          if (res.ok) {
            form.reset();
            modal.style.display = 'none';
            location.reload();
          } else {
            alert("Failed to add candidate.");
          }
        } catch (error) {
          console.error("Submission error:", error);
          alert("Something went wrong!");
        }
      });
    }
    // document.getElementById('existingCandidate').addEventListener('click', ()=>{
    //   const modal = documnet.getElementById('existingCandidateModal');
    //   modal.show();
    // })
  });

function toggleOtherInput() {
  const select = document.getElementById("source");
  const otherField = document.getElementById("referral_field");
  otherField.style.display = (select.value === "Referral") ? "block" : "none";
}
