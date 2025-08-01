document.addEventListener("DOMContentLoaded", function () {
  candidateDate();
  function candidateDate() {
    fetch("/api/candidates")
      .then((response) => response.json())
      .then((candidates) => {
        let rows = "";

        // Retrieving all candidates data and display in candidates page
        candidates.forEach((candidate, index) => {
          let exp = "Not Assigned";
          if (candidate.experience_year && candidate.experience_month) {
            exp =
              candidate.experience_year +
              " yrs " +
              candidate.experience_month +
              " mos";
          } else if (candidate.experience_year) {
            exp = candidate.experience_year + " yrs " + "0 mos";
          } else if (candidate.experience_month) {
            exp = "0 yrs " + candidate.experience_month + " mos";
          }
          let role = candidate.role;
          if (candidate.role === null) {
            role = "Role not assigned";
          }
          rows += `
              <tr>
                <td>${index + 1}</td>
                <td>${candidate.first_name} ${candidate.last_name}</td>
                <td>${role}</td>
                <td>${exp}</td>
                <td>${candidate.follow_up_date}</td>
                <td>${candidate.current_status}</td>
                <td><a href="#" class="editbtn btn" data-id="${
                  candidate.candidate_id
                }"><i class="fa fa-edit"></i></a> 
                <a href="#" class="updatebtn btn" data-id="${
                  candidate.candidate_id
                }"><i class="fa fa-tasks"></i></a>
                <a href="#" class="deletebtn btn btn-danger" data-id="${
                  candidate.candidate_id
                }"><i class="fa fa-trash"></i></a></td>
              </tr>
            `;
        });
        document.querySelector("tbody").innerHTML = rows;
        $("#candidateTable").DataTable();
        document
          .querySelector(".filterBtn")
          .addEventListener("click", function (e) {
            e.preventDefault();
            loadCandidates();
          });

        document
          .querySelector("#candidateTable")
          .addEventListener("click", async function (e) {
            const editButton = e.target.closest(".editbtn");
            if (!editButton) return;
            e.preventDefault();
            const candidateId = editButton.getAttribute("data-id");
            if (!candidateId) return;

            try {
              const response = await fetch(`/api/candidates/${candidateId}`);
              const candidate = await response.json();
              document.querySelector("#editModal #fname").value =
                candidate.first_name || "";
              document.querySelector("#editModal #lname").value =
                candidate.last_name || "";
              document.querySelector("#editModal #email").value =
                candidate.email_id || "";
              document.querySelector("#editModal #phone_no").value =
                candidate.contact_no || "";
              document.querySelector("#editModal #qualification").value =
                candidate.qualification || "";
              document.querySelector("#editModal #location").value =
                candidate.location || "";
              document.querySelector("#editModal #gitlink").value =
                candidate.gitlink || "";
              document.querySelector("#editModal #source").value =
                candidate.source || "";
              document.querySelector("#editModal #emp_id").value =
                candidate.emp_id || "";
              document.querySelector("#editModal #role").value =
                candidate.role || "";
              document.querySelector("#editModal #company").value =
                candidate.company || "";
              document.querySelector("#editModal #designation").value =
                candidate.designation || "";
              document.querySelector("#editModal #experience_year").value =
                candidate.experience_year || "";
              document.querySelector("#editModal #experience_month").value =
                candidate.experience_month || "";
              document.querySelector("#editModal #notice_period").value =
                candidate.notice_period || "";
              const salTypeInputs = document.querySelectorAll(
                '#editModal input[name="sal_type"]'
              );
              salTypeInputs.forEach((input) => {
                input.checked = input.value === candidate.sal_type;
              });
              document.querySelector("#editModal #current_salary").value =
                candidate.current_salary || "";
              document.querySelector("#editModal #expected_salary").value =
                candidate.expected_salary || "";
              const skillsInput = document.querySelector("#editModal #skills");
              skillsInput.value = (candidate.skill_set || [])
                .map((skill) => Object.values(skill)[0])
                .join(", ");
              document.querySelector("#editModal #candidate_id").value =
                candidate.candidate_id;
              const resumeLink = document.querySelector(
                "#editModal #resumeLink"
              );
              if (candidate.resume) {
                resumeLink.href = candidate.resume;
                resumeLink.target = "_blank";
                resumeLink.style.display = "inline";
              } else {
                resumeLink.style.display = "none";
              }
              let sourceSelect = document.querySelector("#editModal #source");
              let referralField = document.querySelector(
                "#editModal #referral_field"
              );

              if (sourceSelect && referralField) {
                referralField.style.display =
                  sourceSelect.value === "Referral" ? "block" : "none";
              }
              document.getElementById("editModal").style.display = "block";
            } catch (error) {
              console.error("Error fetching candidate details:", error);
            }
          });

        document
          .querySelector("#candidateTable")
          .addEventListener("click", async function (e) {
            const updateButton = e.target.closest(".updatebtn");
            if (!updateButton) return;

            const candidateId = updateButton.getAttribute("data-id");
            if (!candidateId);

            try { 
              const response = await fetch(
                `/api/update-candidate/${candidateId}`
              );
              const candidate = await response.json();
              let salary = candidate.expected_salary;
              if (candidate.sal_type === "Monthly") {
                salary = salary * 12;
              }

              document.querySelector("#updateModal #pre_intv_status").value =
                candidate.pre_intv_status || "";
              document.querySelector("#updateModal #pre_intv_remark").value =
                candidate.pre_intv_remark || "";
              document.querySelector("#updateModal #taskName").value =
                candidate.task_name || "";
              document.querySelector("#updateModal #assignedDate").value =
                candidate.assigned_date || "";
              document.querySelector("#updateModal #deadlineDate").value =
                candidate.deadline || "";
              document.querySelector("#updateModal #status").value =
                candidate.task_status || "";
              document.querySelector("#updateModal #reworkAssignDate").value =
                candidate.rework_assigned || "";
              document.querySelector("#updateModal #reworkDeadlineDate").value =
                candidate.rework_deadline || "";
              document.querySelector("#updateModal #rework_status").value =
                candidate.rework_status;
              document.querySelector("#updateModal #remark1").value =
                candidate.task_remark || "";
              document.querySelector("#updateModal #interviewer").value =
                candidate.interviewer || "";
              document.querySelector("#updateModal #result").value =
                candidate.interview_status || "";
              document.querySelector("#updateModal #re-result").value =
                candidate.re_interview || "";
              const technical = document.querySelector(
                `#updateModal input[name="technical_skills"][value="${parseInt(
                  candidate.technical_skills
                )}"]`
              );
              if (technical) technical.checked = true;
              const communication = document.querySelector(
                `#updateModal input[name="communication_skills"][value="${parseInt(
                  candidate.communication_skills
                )}"]`
              );
              if (communication) communication.checked = true;
              const problemSolving = document.querySelector(
                `#updateModal input[name="problem_solving"][value="${parseInt(
                  candidate.problem_solving
                )}"]`
              );
              if (problemSolving) problemSolving.checked = true;
              const overall = document.querySelector(
                `#updateModal input[name="overall_ratings"][value="${parseInt(
                  candidate.overall_ratings
                )}"]`
              );
              if (overall) overall.checked = true;
              const reInterview = document.querySelector(
                `#updateModal input[name="re_interview_ratings"][value="${parseInt(
                  candidate.re_interview_ratings
                )}"]`
              );
              if (reInterview) reInterview.checked = true;
              document.querySelector("#updateModal #remark2").value =
                candidate.interview_remark || "";
              document.querySelector("#updateModal #esalary").value =
                salary || "";
              document.querySelector("#updateModal #onboardDate").value =
                candidate.reporting_date || "";
              document.querySelector("#updateModal #location").value =
                candidate.reporting_location || "";
              const doc_verified = document.querySelector(
                `#updateModal input[name="document_verified"][value="${candidate.document_verified}"]`
              );
              if (doc_verified) doc_verified.checked = true;
              if (candidate.verified_docs) {
                const documents = candidate.verified_docs.split(",");
                documents.forEach((docs) => {
                  let data = document.querySelector(
                    `#updateModal input[name="documents"][value="${docs}"]`
                  );
                  if (data) data.checked = true;
                });
              }
              document.querySelector("#updateModal #onboardStatus").value =
                candidate.onboarding_status || "";
              document.querySelector("#updateModal #remark3").value =
                candidate.overall_remark || "";
              document.querySelector("#updateModal #candidate_id").value =
                candidate.candidate_id;

              flatpickr("#updateModal #pre_intv_at", {
                enableTime: true,
                dateFormat: "Y-m-d h:i K",
                time_24hr: false,
                defaultDate: candidate.pre_intv_at
              });

              flatpickr("#updateModal #interviewAt", {
                enableTime: true,
                dateFormat: "Y-m-d h:i K",
                time_24hr: false,
                defaultDate: candidate.interview_at
              });

              flatpickr("#updateModal #reinterviewAt", {
                enableTime: true,
                dateFormat: "Y-m-d h:i K",
                time_24hr: false,
                defaultDate: candidate.re_interview_at
              });

              flatpickr("#updateModal #report_time", {
                enableTime: true,
                noCalendar: true,
                dateFormat: "h:i K",
                time_24hr: false,
                defaultDate: candidate.reporting_time,
                defaultHour: 10,
                defaultMinute: 0,
              });

              if (candidate.task_status) {
                toggleOtherField();
              }
              if (candidate.interview_status) {
                onreinterview();
              }
              const updateModal = new bootstrap.Modal(
                document.getElementById("updateModal")
              );
              updateModal.show();
            } catch (err) {
              console.error(err);
            }
          });
      })
      .catch((error) => console.error("Error fetching candidates:", error));
  }

  // Filter for Candidate table
  function loadCandidates() {
    const roleFilter = document.getElementById("role_filter").value.trim();
    const statusFilter = document.getElementById("status_filter").value.trim();
    let startDate = document.getElementById("follow_start_filter").value;
    let endDate = document.getElementById("follow_end_filter").value;
    let queryParams = "";
    queryParams +=
      "?role=" + (roleFilter && roleFilter != "Select Role" ? roleFilter : "");
    queryParams +=
      "&status=" +
      (statusFilter && statusFilter != "Select Status" ? statusFilter : "");
    queryParams += "&startDate=" + (startDate ? startDate : "");
    queryParams += "&endDate=" + (endDate ? endDate : "");
    let URL = "/api/candidates" + queryParams;

    fetch(URL)
      .then((response) => response.json())
      .then((candidates) => {
        let rows = "";

        candidates.forEach((candidate, index) => {
          let exp = "Not Assigned";
          if (candidate.experience_year && candidate.experience_month) {
            exp =
              candidate.experience_year +
              " yrs " +
              candidate.experience_month +
              " mos";
          } else if (candidate.experience_year) {
            exp = candidate.experience_year + " yrs " + "0 mos";
          } else if (candidate.experience_month) {
            exp = "0 yrs " + candidate.experience_month + " mos";
          }
          let role = candidate.role;
          if (candidate.role === null) {
            role = "Role not assigned";
          }
          rows += `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${candidate.first_name} ${candidate.last_name}</td>
                    <td>${role}</td>
                    <td>${exp}</td>
                    <td>${candidate.follow_up_date}</td>
                    <td>${candidate.current_status}</td>
                    <td><a href="#" class="editbtn btn" data-id="${
                      candidate.candidate_id
                    }"><i class="fa fa-edit"></i></a> 
                    <a href="#" class="updatebtn btn" data-id="${
                      candidate.candidate_id
                    }"><i class="fa fa-tasks"></i></a>
                    <a href="#" class="deletebtn btn btn-danger" data-id="${
                      candidate.candidate_id
                    }"><i class="fa fa-trash"></i></a></td>
                  </tr>
                `;
        });

        if ($.fn.DataTable.isDataTable("#candidateTable")) {
          $("#candidateTable").DataTable().clear().destroy();
        }
        document.querySelector("tbody").innerHTML = rows;

        $("#candidateTable").DataTable();
      });
  }
  document.querySelector(".refreshBtn").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
  //Filter data fetching api
  fetch("/api/candidates/filter")
    .then((res) => res.json())
    .then((data) => {
      const roles = [...new Set(data.map((item) => item.role))];
      const statuses = [...new Set(data.map((item) => item.current_status))];

      populateDropdown("role_filter", roles);
      populateDropdown("status_filter", statuses);
    })
    .catch((err) => console.error("Error fetching filters:", err));

  function populateDropdown(selectId, items) {
    const select = document.getElementById(selectId);
    items.forEach((item) => {
      if (item) {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
      }
    });
  }
});
