const Candidates = require('./candidate');
const Audit_log = require('./candidate_audit_log');
const Employees = require('./employee');

Candidates.hasMany(Audit_log, { foreignKey: 'candidate_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Audit_log.belongsTo(Candidates, { foreignKey: 'candidate_id' });

Employees.hasMany(Audit_log, { foreignKey: 'modified_by_emp_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Audit_log.belongsTo(Employees, { foreignKey: 'modified_by_emp_id' });

Candidates.addHook('beforeUpdate', async (candidate, options) => {
  const oldData = await Candidates.findByPk(candidate.candidate_id);
  const modifiedBy = 1;

  await Audit_log.create({
    candidate_id: candidate.candidate_id,
    action: 'UPDATE',
    modified_by_emp_id: modifiedBy,
    old_value: oldData ? oldData.toJSON() : {},
    new_value: candidate.toJSON()
  });
});

Candidates.addHook('afterCreate', async (candidate, options) => {
  const modifiedBy = 1;

  await Audit_log.create({
    candidate_id: candidate.candidate_id,
    action: 'CREATE',
    modified_by_emp_id: modifiedBy,
    old_value: {},
    new_value: candidate.toJSON()
  });
});

Candidates.addHook('beforeDestroy',async (candidate, options) =>{
    const old_data = Candidates.findByPk(candidate.candidate_id);
    const modifiedBy  =  1; 

    await Audit_log.create({
        candidate_id: candidate.candidate_id,
        action: 'DELETE',
        modified_by_emp_id : modifiedBy,
        old_value : old_data ? old_data.toJSON() : {},
        new_value : {}
    });
});

module.exports = {
  Candidates,
  Audit_log,
  Employees
};
