document.addEventListener('DOMContentLoaded', () => {
    let deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
    let confirmbtn = document.getElementById('confirmBtn');
    document.body.addEventListener('click', async (e) => {

        const deleteBtn = e.target.closest('.deletebtn');
        if (!deleteBtn) return;
        e.preventDefault();

        const candidateId = deleteBtn.getAttribute('data-id');
        if(!candidateId) return alert("Candidate Not found");
        document.querySelector('#deleteModal .modal-body').innerHTML = `<p> Are you sure want to delete candidate ${candidateId}`
        deleteModal.show();

        confirmbtn.addEventListener('click',async(e)=>{
        e.preventDefault();
        try{
            const date = new Date();
            let jsonData = JSON.stringify({ deleted_at: date.toISOString() });
            const token = localStorage.getItem('jwt_token');
            const response = await fetch( `/api/delete-candidate/${candidateId}`,{
                method : 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: jsonData
            })
            if(!response.ok){
                console.log("Deletition failed");
                return;
            }
            deleteModal.hide();
            location.reload();
        }
        catch(err){
            console.error(err);
        }
        })
    });
});
