
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('deletebtn').addEventListener('click', async(e)=> {
    e.preventDefault();
    const candidateId = $(this).data('id');
    console.log(candidateId);
})
});