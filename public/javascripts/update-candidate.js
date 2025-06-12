function toggleOtherField() {
  const select = document.getElementById('status');
  const otherFields = document.getElementsByClassName('otherField');

  for (let i = 0; i < otherFields.length; i++) {
    otherFields[i].style.display = (select.value === 'Task Rework') ? 'block' : 'none';
  }
}

function onreinterview() {
  const select = document.getElementById('result');
  const otherFields = document.getElementsByClassName('re-interview');
  for (let i = 0; i < otherFields.length; i++) {
    if (select.value === 'Re-interview') {
      otherFields[i].style.display = (i === 2) ? 'flex' : 'block';
    } else {
      otherFields[i].style.display = 'none';
    }
  }
}

document.getElementById('submitBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  const form = document.getElementById("recruitment_form");
  const candidateId = document.getElementById('candidate_id').value;
  let checkboxs = document.querySelectorAll('input[name = "documents"]:checked');
  let verified_document = [];

  checkboxs.forEach(checkbox => {
    verified_document.push(checkbox.value);
  });
  document.getElementById('verifieddocs').value = verified_document.toString();

  if (!candidateId) {
    console.log("Candidate Not found");
    return;
  }
  const formData = new FormData(form);
  const jsonData = Object.fromEntries(formData.entries());
  const token = localStorage.getItem('jwt_token');
  try {
    const response = await fetch(`/api/update-candidate/${candidateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jsonData),
    });
    if (!response.ok) throw new Error("update failed");
    document.getElementById('updateModal').style.display = 'none';
    location.reload();
  }
  catch (err) {
    console.error(err);
  }
});

let form = document.getElementById("recruitment_form");
let assign_date = document.getElementById("assignedDate");
assign_date.addEventListener('input', async (e) => {
  let newdate = new Date(assign_date.value);
  newdate.setDate(newdate.getDate() + 15);
  form.deadline.value = newdate.toISOString().split('T')[0];
});

let rework_assign = document.getElementById("reworkAssignDate");

rework_assign.addEventListener('input', async (e) => {
  const assignDate = new Date(assign_date.value);
  const reworkDate = new Date(rework_assign.value);
  const dateError = document.getElementById('dateValidation');
  if (reworkDate < assignDate) {
    dateError.innerHTML = `<p style="color: red; font-size: 14px;">Date must be after the first task assigned</p>`;
    dateError.classList.add('is-invalid');
  } else {
    dateError.innerHTML = '';
    dateError.classList.remove('is-invalid');

    const deadlineDate = new Date(reworkDate);
    deadlineDate.setDate(deadlineDate.getDate() + 15);
    form.rework_deadline.value = deadlineDate.toISOString().split('T')[0];
  }
});

let interview_at = document.getElementById('interviewAt');
let reinterview_at = document.getElementById('reinterviewAt');

reinterview_at.addEventListener('input', async(e)=>{
  const interview = new Date(interview_at.value);
  const reinterview = new Date(reinterview_at.value);
  const interview_date = document.getElementById('interviewdate');
  if(interview > reinterview){
    interview_date.innerHTML = `<p style="color: red; font-size: 14px;">Date must be after the first Interview</p>`;
    interview_date.classList.add('is-invalid');
  }
  else{
    interview_date.innerHTML = '';
    interview_date.classList.remove('is-invalid');
  }
})