  document.addEventListener('DOMContentLoaded', function () {
      fetch('/api/candidates')
        .then((response) => response.json())
        .then((candidates) => {
          candidates.forEach((candidate, index) => {
            $('#candidateTable tbody').append(`
              <tr>
                <td>${index + 1}</td>
                <td>${candidate.first_name} ${candidate.last_name}</td>
                <td>${candidate.role}</td>
                <td>${candidate.experience}</td>
                <td>${candidate.follow_up_date}</td>
                <td>${candidate.current_status}</td>
                <td><a href="#" class="editbtn btn" data-id="${candidate.candidate_id}"><i class="fa fa-edit"></i> Edit</a> 
                <a href="#" class="updatebtn btn" data-id="${candidate.candidate_id}"><i class="fa fa-tasks"></i> Update</a>
                <a href="#" class="deletebtn btn btn-danger" data-id="${candidate.candidate_id}"><i class="fa fa-trash"></i> Delete</a></td>
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
                $('#editModal #candidate_id').val(candidate.candidate_id);
                document.getElementById('editModal').style.display = 'block';
              })
              .catch((error) =>
                console.error('Error fetching candidate details:', error)
              );
          });

          $('#candidateTable').on('click', '.updatebtn', function (e) {
            e.preventDefault();
            const candidateId = $(this).data('id');
            fetch(`/api/update-candidate/${candidateId}`)
              .then((response) => response.json())
              .then((candidate) => {
                let salary = candidate.expected_salary;
                if(candidate.sal_type === 'Monthly'){
                  salary = salary * 12;
                }
                
                const interviewAt = candidate.interview_at ? new Date(candidate.interview_at).toISOString().slice(0, 16) : '';
                const reInterviewAt = candidate.re_interview_at ? new Date(candidate.re_interview_at).toISOString().slice(0, 16) : '';
                $('#updateModal #taskName').val(candidate.task_name || '');
                $('#updateModal #assignedDate').val(candidate.assigned_date ||'');
                $('#updateModal #deadlineDate').val(candidate.deadline || '');
                $('#updateModal #status').val(candidate.task_status || '').get(0).dispatchEvent(new Event("change"));
                $('#updateModal #reworkAssignDate').val(candidate.rework_assigned || '');
                $('#updateModal #reworkDeadlineDate').val(candidate.rework_deadline || '');
                $('#updateModal #rework_status').val(candidate.rework_status);
                $('#updateModal #remark1').val(candidate.task_remark || '');
                $('#updateModal #interviewer').val(candidate.interviewer ||'')
                $('#updateModal #interviewAt').val(interviewAt);
                $('#updateModal #result').val(candidate.interview_status||'');
                $('#updateModal #reinterviewAt').val(reInterviewAt);
                $('#updateModal #re-result').val(candidate.re_interview||'');
                $(`#updateModal input[name="technical_skills"][value="${parseInt(candidate.technical_skills)}"]`).prop("checked", true);
                $(`#updateModal input[name="communication_skills"][value="${parseInt(candidate.communication_skills)}"]`).prop("checked", true);
                $(`#updateModal input[name="problem_solving"][value="${parseInt(candidate.problem_solving)}"]`).prop("checked", true);
                $(`#updateModal input[name="overall_ratings"][value="${parseInt(candidate.overall_ratings)}"]`).prop("checked", true);
                $(`#updateModal input[name="re_interview_ratings"][value="${parseInt(candidate.re_interview_ratings)}"]`).prop("checked", true);
                $('#updateModal #remark2').val(candidate.interview_remark||'');
                $('#updateModal #esalary').val(salary||'');
                $('#updateModal #onboardDate').val(candidate.reporting_date||'');
                $('#updateModal #report_time').val(candidate.reporting_time||'');
                $('#updateModal #location').val(candidate.reporting_location||'');
                $(`#updateModal input[name="document_verified"][value="${candidate.document_verified}"]`).prop("checked", true);
                $('#updateModal #onboardStatus').val(candidate.onboarding_status||'');
                $('#updateModal #candidate_id').val(candidate.candidate_id);
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