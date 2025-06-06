const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidates = sequelize.define('candidate', {
  candidate_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  first_name: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  email_id: {
    type: DataTypes.STRING(254),
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  contact_no: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  qualification: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  resume: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  gitlink: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  source: {
    type: DataTypes.ENUM('Linked in', 'Indeed', 'Naukri', 'Referral'),
    allowNull: false,
  },
  emp_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('App Developer','Full Stack Developer', 'Human Resource','Customer Trainer','Web/App Tester','Admin'),
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  designation: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  experience_year: {
    type: DataTypes.INTEGER,
    validate: {
        min: 0,
        max: 255 
    }
  },
  experience_month:{
    type: DataTypes.INTEGER,
    validate: {
        min: 0,
        max: 255 
    }
  },
  notice_period: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  sal_type: {
    type: DataTypes.ENUM ('CTC', 'Monthly'),
    allowNull: true,
  },
  current_salary: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true,
  },
  expected_salary: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true,
  },
  skill_set: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  pre_intv_at :{
    type : DataTypes.DATE,
    allowNull : true
  },
  pre_intv_status :{
    type : DataTypes.ENUM('Needs task', 'Direct interview','Rejected'),
    allowNull : true
  },
  pre_intv_remark:{
    type : DataTypes.TEXT,
    allowNull : true,
  },
  task_name: {
    type: DataTypes.STRING(64),
    allowNull : true
  },
  task_status: {
    type: DataTypes.ENUM('Completed','Rejected', 'Pending', 'Task Rework'),
    allowNull: true,
  },
  assigned_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  rework_status: {
    type: DataTypes.ENUM('Completed','Rejected', 'Pending'),
    allowNull: true,
  },
  rework_assigned: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  rework_deadline: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  task_remark: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  interview_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  interviewer:{
    type: DataTypes.STRING(128),
    allowNull: true
  },
  interview_status: {
    type: DataTypes.ENUM('Selected', 'Rejected', 'Pending', 'Re-interview'),
    allowNull: true,
  },
  technical_skills: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
  },
  communication_skills: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
  },
  problem_solving: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
  },
  overall_ratings: {
    type: DataTypes.DECIMAL(2,1),
    allowNull: true,
  },
  interview_remark: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  re_interview: {
    type: DataTypes.ENUM('Selected', 'Rejected', 'Pending'),
    allowNull: true,
  },
  re_interview_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  re_interview_ratings: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
  },
  reporting_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  reporting_time: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  reporting_location: {
    type: DataTypes.ENUM('KT Telematic Solutions Pvt. Ltd, Coimbatore', 'KT Telematic Solutions Pvt. Ltd, Salem'),
    allowNull: true,
  },
  verified_docs :{
    type: DataTypes.TEXT,
    allowNull: true,
  },
  document_verified:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  onboarding_status: {
    type: DataTypes.ENUM('Onboarded', 'Pending', 'Withdrawn', 'Rejected'),
    allowNull: true,
  },
  current_status:{
    type: DataTypes.STRING(255),
    allowNull: true
  },
  follow_up_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  overall_remark: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
},
{
    paranoid : true,
    deletedAt : "deleted_at"
}
);

module.exports = Candidates;
