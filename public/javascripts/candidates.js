  document.addEventListener('DOMContentLoaded', function () {
      fetch('/api/candidates')
        .then((response) => response.json())
        .then((candidates) => {
          let rows = '';
          
          // Retrieving all candidates data and display in candidates page
          candidates.forEach((candidate, index) => {
            rows += (`
              <tr>
                <td>${index + 1}</td>
                <td>${candidate.first_name} ${candidate.last_name}</td>
                <td>${candidate.role}</td>
                <td>${candidate.experience_year} yrs ${candidate.experience_month} mos</td>
                <td>${candidate.follow_up_date}</td>
                <td>${candidate.current_status}</td>
                <td><a href="#" class="editbtn btn" data-id="${candidate.candidate_id}"><i class="fa fa-edit"></i></a> 
                <a href="#" class="updatebtn btn" data-id="${candidate.candidate_id}"><i class="fa fa-tasks"></i></a>
                <a href="#" class="deletebtn btn btn-danger" data-id="${candidate.candidate_id}"><i class="fa fa-trash"></i></a></td>
              </tr>
            `);
          });
          document.querySelector('tbody').innerHTML  = rows;

          $('#candidateTable').DataTable();
          document.querySelector('#candidateTable').addEventListener('click', async function (e) {
            if (e.target.classList.contains('editbtn')) {
              e.preventDefault();
              const candidateId = e.target.getAttribute('data-id');
              try {
                const response = await fetch(`/api/candidates/${candidateId}`);
                const candidate = await response.json();
                document.querySelector('#editModal #fname').value= candidate.first_name || '';
                document.querySelector('#editModal #lname').value= candidate.last_name || '';
                document.querySelector('#editModal #email').value= candidate.email_id || '';
                document.querySelector('#editModal #phone_no').value= candidate.contact_no || '';
                document.querySelector('#editModal #qualification').value = candidate.qualification || '';
                document.querySelector('#editModal #location').value = candidate.location || '';
                document.querySelector('#editModal #gitlink').value =candidate.gitlink || '';
                document.querySelector('#editModal #source').value = candidate.source || '';
                document.querySelector('#editModal #emp_id').value = candidate.emp_id || '';
                document.querySelector('#editModal #role').value = candidate.role || '';
                document.querySelector('#editModal #company').value = candidate.company || '';
                document.querySelector('#editModal #designation').value = candidate.designation || '';
                document.querySelector('#editModal #experience_year').value = candidate.experience_year || '';
                document.querySelector('#editModal #experience_month').value = candidate.experience_month || '';
                document.querySelector('#editModal #notice_period').value = candidate.notice_period || '';
                const salTypeInputs = document.querySelectorAll('#editModal input[name="sal_type"]');
                salTypeInputs.forEach(input => {
                  input.checked = input.value === candidate.sal_type;
                });
                document.querySelector('#editModal #current_salary').value = candidate.current_salary || '';
                document.querySelector('#editModal #expected_salary').value = candidate.expected_salary || '';
                const skillsInput = document.querySelector('#editModal #skills');
                skillsInput.value = (candidate.skill_set || []).map(skill => Object.values(skill)[0]).join(', ');
                document.querySelector('#editModal #candidate_id').value = candidate.candidate_id;
                const resumeLink = document.querySelector('#editModal #resumeLink');
                if (candidate.resume) {
                  resumeLink.href = candidate.resume;
                  resumeLink.target = '_blank';
                  resumeLink.style.display = 'inline';
                } else {
                  resumeLink.style.display = 'none';
                }

                document.getElementById('editModal').style.display = 'block';

              } catch (error) {
                console.error('Error fetching candidate details:', error);
              }
            }
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
                $('#updateModal #status').val(candidate.task_status || '')
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
                $('#updateModal #esalary').val(candidate.expected_salary||'');
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