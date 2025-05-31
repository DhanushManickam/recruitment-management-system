  document.addEventListener('DOMContentLoaded', function () {
      fetch('/api/candidates')
        .then((response) => response.json())
        .then((candidates) => {
          candidates.forEach((candidate, index) => {
            let follow_up_date = candidate.followUp
              ? candidate.followUp
              : new Date(candidate.createdAt).toISOString().split('T')[0];
            let status = candidate.status ? candidate.status : 'Waiting for Task';

            $('#candidateTable tbody').append(`
              <tr>
                <td>${index + 1}</td>
                <td>${candidate.first_name} ${candidate.last_name}</td>
                <td>${candidate.role}</td>
                <td>${candidate.experience}</td>
                <td>${follow_up_date}</td>
                <td>${status}</td>
                <td><a href="#" class="editbtn" data-id="${candidate.candidate_id}"><i class="fa fa-edit"></i> Edit</a></td>
                <td><a href="#" class="updatebtn btn" data-id="${candidate.candidate_id}"><i class="fa fa-tasks"></i> Update</a></td>
              </tr>
            `);
          });

          $('#candidateTable').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
          });

          $('#candidateTable').on('click', '.editbtn', function (e) {
            e.preventDefault();
            const candidateId = $(this).data('id');
            fetch(`/api/candidates/${candidateId}`)
              .then((response) => response.json())
              .then((candidate) => {
                $('#editModal #fname').val(candidate.first_name || '');
                $('#editModal #lname').val(candidate.last_name || '');
                $('#editModal #email').val(candidate.email_id || '');
                $('#editModal #phone_no').val(candidate.contact_no || '');
                $('#editModal #qualification').val(candidate.qualification || '');
                $('#editModal #location').val(candidate.location || '');
                $('#editModal #gitlink').val(candidate.gitlink || '');
                $('#editModal #source').val(candidate.source || '');
                $('#editModal #emp_id').val(candidate.emp_id || '');
                $('#editModal #role').val(candidate.role || '');
                $('#editModal #company').val(candidate.company || '');
                $('#editModal #designation').val(candidate.designation || '');
                $('#editModal #experience').val(candidate.experience ||'');
                $('#editModal #notice_period').val(candidate.notice_period || '');
                $(`#editModal input[name="sal_type"][value="${candidate.sal_type}"]`).prop("checked", true);
                $('#editModal #current_salary').val(candidate.current_salary || '');
                $('#editModal #expected_salary').val(candidate.expected_salary || '');
                $('#editModal #skills').val((candidate.skill_set || []).map(skill => Object.values(skill)[0]).join(', '));
                $('#editModel #candidate_id').val(candidate.candidate_id);
                document.getElementById('editModal').style.display = 'block';
              })
              .catch((error) =>
                console.error('Error fetching candidate details:', error)
              );
          });

          $('#candidateTable').on('click', '.updatebtn', function (e) {
            e.preventDefault();
            const candidateId = $(this).data('id');

            fetch(`/api/candidates/${candidateId}`)
              .then((response) => response.json())
              .then((candidate) => {
                $('#updateModal #update_fname').val(
                  candidate.first_name + ' ' + candidate.last_name || ''
                );
                $('#updateModal #update_status').val(candidate.status || 'Waiting for Task');
                $('#updateModal #update_followup').val(
                  candidate.followUp
                    ? candidate.followUp.split('T')[0]
                    : new Date(candidate.createdAt).toISOString().split('T')[0]
                );

                const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
                updateModal.show();
              })
              .catch((error) =>
                console.error('Error fetching candidate details for update:', error)
              );
          });
        })
        .catch((error) => console.error('Error fetching candidates:', error));
});