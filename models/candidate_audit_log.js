const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Audit_log = sequelize.define('audit_log', {
    log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      candidate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      modified_by_emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE'),
        allowNull: false
      },
      modified_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      old_value: {
        type: DataTypes.JSON,
        allowNull: false
      },
      new_value: {
        type: DataTypes.JSON,
        allowNull: false
      }
});
const Candidates = require('./candidate');
const Employees = require('./employee');

Candidates.hasMany(Audit_log, { foreignKey: 'candidate_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Audit_log.belongsTo(Candidates, { foreignKey: 'candidate_id' });

Employees.hasMany(Audit_log, { foreignKey: 'modified_by_emp_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Audit_log.belongsTo(Employees, { foreignKey: 'modified_by_emp_id' });

Candidates.addHook('afterCreate', async (candidate, options) => {
  const modifiedBy = options.user?.id || null;
  await Audit_log.create({
    candidate_id: candidate.candidate_id,
    action: 'CREATE',
    modified_by_emp_id: modifiedBy,
    old_value: {},
    new_value: candidate.toJSON()
  });
});

Candidates.addHook('beforeUpdate', async (candidate, options) => {
  const oldData = await Candidates.findByPk(candidate.candidate_id);
  const modifiedBy = options.user?.id || null;
  await Audit_log.create({
    candidate_id: candidate.candidate_id,
    action: 'UPDATE',
    modified_by_emp_id: modifiedBy,
    old_value: oldData ? oldData.toJSON() : {},
    new_value: candidate.toJSON()
  });
});

Candidates.addHook('beforeDestroy', async (candidate, options) => {
  const oldData = await Candidates.findByPk(candidate.candidate_id);
  const modifiedBy = options.user?.id || null;
  await Audit_log.create({
    candidate_id: candidate.candidate_id,
    action: 'DELETE',
    modified_by_emp_id: modifiedBy,
    old_value: oldData ? oldData.toJSON() : {},
    new_value: {}
  });
});

module.exports = Audit_log;