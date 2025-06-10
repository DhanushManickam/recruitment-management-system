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
      experience_year,
      experience_month,
      notice_period,
      sal_type,
      current_salary,
      expected_salary,
      basic,
    } = req.body;

    let skill_set = [];
    try {
      skill_set = basic ? JSON.parse(basic) : [];
    } catch {
      skill_set = [];
    }

    const parsedEmpId = emp_id && !isNaN(emp_id) ? parseInt(emp_id, 10) : null;
    const parsedNoticePeriod = notice_period && !isNaN(Date.parse(notice_period)) ? new Date(notice_period) : null;
    const parsedCurrentSalary = current_salary && !isNaN(current_salary) ? parseInt(current_salary, 10) : null;
    const parsedExpectedSalary = expected_salary && !isNaN(expected_salary) ? parseInt(expected_salary, 10) : null;
    const parsedExperienceYear = experience_year && !isNaN(experience_year) ? parseInt(experience_year, 10) : null;
    const parsedExperienceMonth = experience_month && !isNaN(experience_month) ? parseInt(experience_month, 10) : null;
    const resumepath = req.file ? `/uploads/${req.file.filename}` : null;
    const currentStatus = 'Candidate added';
    const followUpDate = new Date().toISOString().split('T')[0];
    console.log(req.user);
    await candidates.create({ 
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
      experience_year :parsedExperienceYear,
      experience_month : parsedExperienceMonth,
      notice_period: parsedNoticePeriod,
      sal_type: sal_type || null,
      current_salary: parsedCurrentSalary,
      expected_salary: parsedExpectedSalary,
      skill_set,
      current_status : currentStatus,
      follow_up_date : followUpDate
    },{ user: req.user });

    console.log(`Candidate added successfully`);
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
      experience_year,
      experience_month,
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
    const parsedNoticePeriod = notice_period && !isNaN(Date.parse(notice_period)) ? new Date(notice_period) : null;
    const parsedCurrentSalary = current_salary && !isNaN(current_salary) ? parseInt(current_salary, 10) : null;
    const parsedExpectedSalary = expected_salary && !isNaN(expected_salary) ? parseInt(expected_salary, 10) : null;

    const candidate = await candidates.findOne({ where: { candidate_id: candidateId } });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    const resumepath = req.file ? `/uploads/${req.file.filename}` : candidate.resume;

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
      experience_year,
      experience_month,
      notice_period: parsedNoticePeriod,
      sal_type,
      current_salary: parsedCurrentSalary,
      expected_salary: parsedExpectedSalary,
      skill_set
    },{ user: req.user });

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
      pre_intv_at,
      pre_intv_status,
      pre_intv_remark,
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
      verifieddocs,
      document_verified,
      onboarding_status,
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
    const preIntvAT = pre_intv_at && !isNaN(Date.parse(pre_intv_at)) ? new Date(pre_intv_at) : null;
    const onboardingStatus = (onboarding_status ==='') ? null : onboarding_status;

    const toNullIfEmpty = (val) => (val === '' ? null : val);
    let expectedSalary = toNullIfEmpty(expected_salary);
    let technicalSkills = toNullIfEmpty(technical_skills);
    let communicationSkills = toNullIfEmpty(communication_skills);
    let problemSolving = toNullIfEmpty(problem_solving);
    let overallratings = toNullIfEmpty(overall_ratings);
    let reInterviewRatings = toNullIfEmpty(re_interview_ratings);

    let followUpDate = new Date(candidate.createdAt)
    let status = 'Candidate Added';
    if(pre_intv_status === 'Rejected' || task_status ==='Rejected' || rework_status ==='Rejected' || interview_status=== 'Rejected'|| re_interview ==='Rejected'|| onboardingStatus ==='Rejected' ||onboardingStatus ==='Withdrawn'){
      status = 'Rejected';
      followUpDate = candidate.follow_up_date ? new Date(candidate.follow_up_date) : new Date();
    }
    else if(onboardingStatus ==='Onboarded' && document_verified === 'true' && (interview_status === 'Selected' || re_interview ==='Selected')){
      status = 'Onboarded';
      followUpDate = candidate.follow_up_date ? new Date(candidate.follow_up_date) : new Date();
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && document_verified === 'true' && (interview_status === 'Selected' || re_interview ==='Selected')){
      status = 'Documents verified';
      followUpDate = reportingDate? new Date(reportingDate) : new Date();
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Selected' || re_interview ==='Selected')){
      status = 'Documents not verified';
      followUpDate =  reportingDate? new Date(reportingDate) : new Date();
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Re-interview') && (re_interview === 'Pending' || re_interview === undefined)&& !reInterviewAt){
      status = 'Re-Interview not scheduled';
      followUpDate = candidate.follow_up_date ? new Date(candidate.follow_up_date) : new Date();
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Re-interview') && (re_interview === 'Pending' || re_interview === undefined)){
      status = 'Waiting for re-Interview';
      followUpDate = new Date(reInterviewAt);
    } 
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Pending' ||interview_status === undefined) && (re_interview === 'Pending' || re_interview === undefined) && (pre_intv_status === 'Direct Interview' || (task_status ==='Completed' || rework_status ==='Completed')) ){
      status = 'Waiting for Interview';
      followUpDate = new Date(interviewAt);
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Pending' ||interview_status === undefined) && (re_interview === 'Pending' || re_interview === undefined) && (task_status === 'Task Rework' && assignedDate) && (rework_status === 'Pending' || rework_status === undefined)){
      status = 'Task rework assigned'
      followUpDate = new Date(reworkDeadline);
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Pending' ||interview_status === undefined) && (re_interview === 'Pending' || re_interview === undefined) && ((task_status === 'pending' || task_status === undefined) && assignedDate)){
      status = 'Task assigned';
      followUpDate = new Date(deadLine);
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Pending' ||interview_status === undefined) && (pre_intv_status === 'Needs task' && preIntvAT) && !assignedDate){
      status = 'Task Not assinged';
      followUpDate = candidate.follow_up_date ? new Date(candidate.follow_up_date) : new Date();
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Pending' ||interview_status === undefined) && (pre_intv_status === 'Needs task' && preIntvAT) && assignedDate && !preIntvAT){
      status = 'Task assigned';
      followUpDate = new Date(deadLine);
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Pending' ||interview_status === undefined) && (pre_intv_status === 'Direct interview' && preIntvAT) && !interviewAt){
      status = 'Interview not scheduled';
      followUpDate = candidate.follow_up_date ? new Date(candidate.follow_up_date) : new Date();
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Pending' ||interview_status === undefined) && (pre_intv_status === 'Direct interview' && preIntvAT) ){
      status = 'Waiting for interview';
      followUpDate = new Date(interviewAt);
    }
    else if((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Pending' ||interview_status === undefined) && (preIntvAT) ){
      status = 'waiting for pre-interview';
      followUpDate = new Date(interviewAt);
    }
    console.log((onboardingStatus ==='Pending'|| onboardingStatus === null) && (document_verified === 'false' || document_verified === undefined) && (interview_status === 'Pending' ||interview_status === undefined) && (pre_intv_status === 'Direct interview' && preIntvAT))

    await candidate.update({
      pre_intv_at : preIntvAT,
      pre_intv_status,
      pre_intv_remark,
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
      technical_skills : technicalSkills,
      communication_skills : communicationSkills,
      problem_solving : problemSolving,
      overall_ratings : overallratings,
      re_interview_ratings : reInterviewRatings,
      interview_remark,
      expected_salary : expectedSalary,
      reporting_date : reportingDate,
      reporting_time : reportingTime,
      reporting_location,
      verified_docs : verifieddocs,
      document_verified,
      onboarding_status : onboardingStatus,
      current_status : status,
      follow_up_date : followUpDate
    },{ user: req.user })

    res.json({message: "Candidate updated successfully", candidate});
  }
  catch(err){
    console.error("Error in candidate updating"+err);
    res.status(500).send('Server Error');
  }
}

module.exports.delete_candidate = async(req,res)=>{
  try{
    const candidateId = req.params.id;
    if(!candidateId) return res.status(404).json({message: "Candidate id not found to delete"})
    const {deleted_at} = req.body; 

    const candidate = await candidates.findOne({where:{candidate_id : candidateId}});
    if(!candidate) return res.status(404).json({message: "Candidate not found to delete"});
    await candidate.destroy({ user: req.user });
    res.json({message: "candidate deleted,", candidate});
  }
  catch(err){
    console.error(err);
    res.status(500).send("server Error");
  }
}