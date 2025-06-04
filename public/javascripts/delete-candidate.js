document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', async (e) => {

        const deleteBtn = e.target.closest('.deletebtn');
        if (!deleteBtn) return;
        e.preventDefault();

        const candidateId = deleteBtn.getAttribute('data-id');
        if(!candidateId) return alert("Candidate Not found");
        
        const check = confirm(`Are you sure want to delete the candidate ${candidateId}?`);
        if(!check) return;

        try{
            const date = new Date();
            let jsonData = JSON.stringify({ deleted_at: date.toISOString() });
            const response = await fetch( `/api/delete-candidate/${candidateId}`,{
                method : 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            })
            if(!response.ok){
                console.log("Deletition failed");
                return;
            }
            alert(`Candidate ${candidateId} deleted successfully`);
            location.reload();
        }
        catch(err){
            console.error(err);
        }
    });
});
