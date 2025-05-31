function toggleOtherField() {
    const select = document.getElementById('status');
    const otherFields = document.getElementsByClassName('otherField');
  
    for (let i = 0; i < otherFields.length; i++) {
      otherFields[i].style.display = (select.value === 'rework') ? 'block' : 'none';
    }
}

function onreinterview() {
  const select = document.getElementById('result');
  const otherFields = document.getElementsByClassName('reinterviewdate');

  console.log(select.value);
  for (let i = 0; i < otherFields.length; i++) {
    otherFields[i].style.display = (select.value === 'reinterview') ? 'block' : 'none';
  }
}

document.getElementById('submitBtn').addEventListener('click', function() {
  const activeTab = document.querySelector('.nav-link.active').getAttribute('href').substring(1); 
  const form = document.getElementById(activeTab + 'Form');
  if (form) {
      form.submit();
  } else {
      console.error("Form not found for the active tab!");
  }
});