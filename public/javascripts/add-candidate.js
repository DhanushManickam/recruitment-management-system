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

