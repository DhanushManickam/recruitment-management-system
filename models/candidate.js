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
    type: DataTypes.ENUM('App Developer','Full Stack Developer', 'Human Resource','Customer Trainer','Web/App Tester'),
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
  experience: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: true,
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
  task_rework: {
    type: DataTypes.STRING(10),
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
  interview_date: {
    type: DataTypes.DATE,
    allowNull: true,
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
  re_interview_date: {
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
    type: DataTypes.ENUM('Coimbatore', 'Salem'),
    allowNull: true,
  },
  onboarding_status: {
    type: DataTypes.ENUM ('Completed', 'Pending', 'Withdrawn', 'Rejected'),
    allowNull: true,
  },
  follow_up_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  overall_remark: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
},
{
    paranoid : true,
    deletedAt : "Deleted_time"
}
);

module.exports = Candidates;
