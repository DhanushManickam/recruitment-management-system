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

  if (!candidateId) {
    console.log("Candiate Not found");
    return;
  }

  const formData = new FormData(form);
  const jsonData = Object.fromEntries(formData.entries());
  try {
    const response = await fetch(`/api/update-candidate/${candidateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
  let newdate = new Date(rework_assign.value);
  newdate.setDate(newdate.getDate() + 15);
  form.rework_deadline.value = newdate.toISOString().split('T')[0];
})


let rework_status = document.getElementById('rework_status')
rework_status.addEventListener('input', async (e) => {
  const otherFields = document.getElementsByClassName('interview');
  for (let i = 0; i < otherFields.length; i++) {
    otherFields[i].style.display = (rework_status.value === 'Completed') ? 'block' : 'none';
  }
})

let interview_status = document.getElementById('result');
interview_status.addEventListener('input', async (e) => {
  const otherFields = document.getElementsByClassName('candidate-onboard');
  for (let i = 0; i < otherFields.length; i++) {
    otherFields[i].style.display = (interview_status.value === 'Selected') ? 'block' : 'none';
  }
})

let re_interview = document.getElementById('re-result');
re_interview.addEventListener('input', async (e) => {
  const otherFields = document.getElementsByClassName('candidate-onboard');
  for (let i = 0; i < otherFields.length; i++) {
    otherFields[i].style.display = (re_interview.value === 'Selected') ? 'block' : 'none';
  }
})

window.addEventListener('DOMContentLoaded', async (e) => {
  let task_status = document.getElementById('status');
  task_status.addEventListener('change',  (e) => {
    debugger;
    const otherFields = document.getElementsByClassName('interview');
    for (let i = 0; i < otherFields.length; i++) {
      otherFields[i].style.display = (task_status.value === 'Completed') ? 'block' : 'none';
    }
  });
})

