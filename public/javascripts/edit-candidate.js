fetch('../html/edit-candidate.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const modal = document.getElementById('editModal');
    const closeBtn = modal.querySelector('.editclosebtn');

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    document.querySelectorAll('.openEditModalBtn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'block';
      });
    });

    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });

    const skillInput = modal.querySelector("input[name='basic']");
    if (skillInput) {
      new Tagify(skillInput);
    }

    const sourceSelect = modal.querySelector("#source");
    const referralField = modal.querySelector("#referral_field");
    if (sourceSelect && referralField) {
      sourceSelect.addEventListener("change", () => {
        referralField.style.display = sourceSelect.value === "Referral" ? "block" : "none";
      });
    }

    const form = document.getElementById('editcandidateForm'); 
    let updateBtn = document.querySelector("#candidateFormUpdateBtn");
    updateBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const candidateid = document.querySelector("#candidate_id").value || '';
      console.log(candidateid);
      if (!candidateid) {
        console.log("Candidate Not found");
      }
      const formData = new FormData(form);  
 
      try {
        const response = await fetch(`/api/candidates/${candidateid}`, {
          method: 'PUT', 
          body: formData
        });

        if (!response.ok) throw new Error('Update failed');

        const data = await response.json();
        alert('Candidate updated successfully!');
        document.getElementById('editModal').style.display = 'none';
        location.reload();
      } catch (err) {
        console.error(err);
        alert('Error updating candidate');
      }
    });
  });
