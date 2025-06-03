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
  console.log(otherFields.length);
  for (let i = 0; i < otherFields.length; i++) {
    if(i===2){
       otherFields[i].style.display = (select.value === 'reinterview') ? 'flex' : 'none';
    }
    otherFields[i].style.display = (select.value === 'reinterview') ? 'block' : 'none';
  }
}

document.getElementById('submitBtn').addEventListener('click', async(e)=> {
  e.preventDefault();
  const form = document.getElementById("recruitment_form");
  const candidateId = document.getElementById('candidate_id').value;

  if(!candidateId){
    console.log("Candiate Not found");
    return;
  }
  
  const formData = new FormData(form);
  const jsonData = Object.fromEntries(formData.entries());
  try{
    const response = await fetch(`/api/update-candidate/${candidateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData),
    });
    if(!response.ok) throw new Error("update failed");
    document.getElementById('updateModal').style.display = 'none';
    location.reload();
  }
  catch(err){
    console.error(err);
  }
});