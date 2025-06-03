const candidates = require('../models/candidate');

module.exports.add_candidate = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email_id,
      contact_no,
      qualification,
      location,
      gitlink,
      source,
      emp_id,
      role,
      company,
      designation,
      experience,
      notice_period,
      sal_type,
      current_salary,
      expected_salary,
      basic
    } = req.body;

    let skill_set = [];
    try {
      skill_set = basic ? JSON.parse(basic) : [];
    } catch {
      skill_set = [];
    }

    const parsedEmpId = emp_id && !isNaN(emp_id) ? parseInt(emp_id, 10) : null;
    const parsedExperience = experience && !isNaN(experience) ? parseFloat(experience) : null;
    const parsedNoticePeriod = notice_period && !isNaN(Date.parse(notice_period)) ? new Date(notice_period) : null;
    const parsedCurrentSalary = current_salary && !isNaN(current_salary) ? parseInt(current_salary, 10) : null;
    const parsedExpectedSalary = expected_salary && !isNaN(expected_salary) ? parseInt(expected_salary, 10) : null;

    const maxId = await candidates.max('candidate_id');
    const newId = maxId ? maxId + 1 : 1;
    const resumepath = req.file ? req.file.path : null;

    await candidates.create({
      candidate_id: newId,
      first_name,
      last_name,
      email_id,
      contact_no,
      qualification: qualification || null,
      location: location || null,
      resume: resumepath,
      gitlink: gitlink || null,
      source,
      emp_id: parsedEmpId,
      role: role || null,
      company: company || null,
      designation: designation || null,
      experience: parsedExperience,
      notice_period: parsedNoticePeriod,
      sal_type: sal_type || null,
      current_salary: parsedCurrentSalary,
      expected_salary: parsedExpectedSalary,
      skill_set
    });

    console.log(`Candidate #${newId} added successfully`);
    return res.redirect('/candidate');
  } catch (err) {
    console.error('Error creating candidate:', err);
    return res
      .status(500)
      .json({ error: 'Candidate not created', details: err.message || err });
  }
};

module.exports.candidate_list  =  async (req, res) => {
  try {
    const Candidates = await candidates.findAll();

    if (Candidates.length === 0) {
      return res.status(404).json({ message: 'No candidates found' });
    }
    res.json(Candidates);

  } catch (err) {
    console.error('Error fetching candidates:', err);
    res.status(500).send('Server Error');
  }
};

module.exports.get_candidate =  async (req, res) => {
  try {
    const candidateId = req.params.id;
    const candidate = await candidates.findOne({
      where: { candidate_id: candidateId }
    });
    
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (err) {
    console.error('Error fetching candidate:', err);
    res.status(500).send('Server Error');
  }
}

module.exports.edit_canididate =  async (req, res) => {
  try {
    const candidateId = req.params.id;
    const {
      first_name,
      last_name,
      email_id,
      contact_no,
      qualification,
      location,
      gitlink,
      source,
      emp_id,
      role,
      company,
      designation,
      experience,
      notice_period,
      sal_type,
      current_salary,
      expected_salary,
      basic
    } = req.body;

    let skill_set = [];
    try {
      skill_set = basic ? JSON.parse(basic) : [];
    } catch (e) {
      skill_set = [];
    }

    const parsedEmpId = emp_id && !isNaN(emp_id) ? parseInt(emp_id, 10) : null;
    const parsedExperience = experience && !isNaN(experience) ? parseFloat(experience) : null;
    const parsedNoticePeriod = notice_period && !isNaN(Date.parse(notice_period)) ? new Date(notice_period) : null;
    const parsedCurrentSalary = current_salary && !isNaN(current_salary) ? parseInt(current_salary, 10) : null;
    const parsedExpectedSalary = expected_salary && !isNaN(expected_salary) ? parseInt(expected_salary, 10) : null;

    const candidate = await candidates.findOne({ where: { candidate_id: candidateId } });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    const resumepath = req.file ? req.file.path : candidate.resume;

    await candidate.update({
      first_name,
      last_name,
      email_id,
      contact_no,
      qualification,
      location,
      resume: resumepath,
      gitlink,
      source,
      emp_id: parsedEmpId,
      role,
      company,
      designation,
      experience: parsedExperience,
      notice_period: parsedNoticePeriod,
      sal_type,
      current_salary: parsedCurrentSalary,
      expected_salary: parsedExpectedSalary,
      skill_set
    });

    res.json({ message: 'Candidate updated successfully', candidate });
  } catch (err) {
    console.error('Error updating candidate:', err);
    res.status(500).send('Server Error');
  }
}

module.exports.get_update_candidate =  async (req, res) => {
  try {
    const candidateId = req.params.id;
    const candidate = await candidates.findOne({
      where: { candidate_id: candidateId }
    });
    
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (err) {
    console.error('Error fetching candidate:', err);
    res.status(500).send('Server Error');
  }
}

module.exports.put_update_candidate = async(req,res) =>{
  try{
    const candidateId = req.params.id;
    const{
      task_name,
      assigned_date ,
      deadline,
      task_status,
      rework_assigned,
      rework_deadline,
      rework_status,
      task_remark,
      interviewer,
      interview_at,
      interview_status,
      re_interview_at,
      re_interview,
      technical_skills,
      communication_skills,
      problem_solving,
      overall_ratings,
      re_interview_ratings,
      interview_remark,
      expected_salary,
      reporting_date,
      reporting_time,
      reporting_location,
      document_verified,
      onboarding_status
    } = req.body;

    const candidate = await candidates.findOne({where: {candidate_id : candidateId}});
    if(!candidate) return res.status(404).json({message: "Candidate not found to update"});

    const assignedDate = assigned_date && !isNaN(Date.parse(assigned_date)) ? new Date(assigned_date) : null;
    const deadLine = deadline && !isNaN(Date.parse(deadline)) ? new Date(deadline) : null;
    const reworkAssigned = rework_assigned && !isNaN(Date.parse(rework_assigned)) ? new Date(rework_assigned) : null;
    const reworkDeadline = rework_deadline && !isNaN(Date.parse(rework_deadline)) ? new Date(rework_deadline) : null;
    const interviewAt = interview_at && !isNaN(Date.parse(interview_at)) ? new Date(interview_at) : null;
    const reInterviewAt = re_interview_at && !isNaN(Date.parse(re_interview_at)) ? new Date(re_interview_at) : null;
    const reportingDate = reporting_date && !isNaN(Date.parse(reporting_date)) ? new Date(reporting_date) : null;
    const reportingTime = reporting_time && reporting_time.trim() !== '' ? reporting_time : null;
    const onboardingStatus = (onboarding_status ==="") ? null : onboarding_status;
    console.log("Onboarding"+onboardingStatus);

    await candidate.update({
      task_name,
      assigned_date : assignedDate,
      deadline : deadLine,
      task_status,
      rework_assigned : reworkAssigned,
      rework_deadline : reworkDeadline,
      rework_status,
      task_remark,
      interviewer,
      interview_at : interviewAt,
      interview_status,
      re_interview_at : reInterviewAt,
      re_interview,
      technical_skills,
      communication_skills,
      problem_solving,
      overall_ratings,
      re_interview_ratings,
      interview_remark,
      expected_salary,
      reporting_date : reportingDate,
      reporting_time : reportingTime,
      reporting_location,
      document_verified,
      onboarding_status : onboardingStatus
    })

    res.json({message: "Candidate updated successfully", candidate});
  }
  catch(err){
    console.error("Error in candidate updating"+err);
    res.status(500).send('Server Error');
  }
}