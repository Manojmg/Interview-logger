const { isEmpty, orderBy } = require("lodash");
const { Op } = require("sequelize");
const { Candidate } = require('../../Model');

const listCandidates = async (req, res) => {
    try{
        const candidates = await Candidate.findAll({ order: ['candidateId'] });
        const result = candidates.map(r => r.get({ plain: true }));
        if (!isEmpty(result)) {
            res.send(result);
        } else {
            res.send([]);
        }
    } catch (err){
        console.log(err)
    }
}

const createNewCandidate = async (req, res) => {
    const payload = req.body;
    try {
        const result = await Candidate.create(payload);
        if (!isEmpty(result)) {
            res.send(result);
        } else {
            res.send({ error: "Candidate creation Failed" });
        }
    } catch (err){
        console.log(err)
    }
}

const searchByCandidateId = async (req, res) => {
    try {
        const { Id } = req.params;
        const candidate = await Candidate.findOne({
            where: {
                candidateId: Id
            }
        })
        if (!candidate) {
            return res.status(404).json({
                message: "Candidate Id not found please try again with valid id."
            });
        }
        return res.json(candidate);
    } catch (err){
        console.log(err);
    }
}
const searchByCandidateName = async (req, res) => {
    try {
        const { firstName } = req.params;
        const candidate = await Candidate.findAll({
            where: {
                firstName: {
                    [Op.or]: {
                        [Op.substring]: firstName,
                        [Op.like]: '%' + firstName + '%'
                    }
                }
            }
        });
        if (!isEmpty(candidate)) {
            return res.json(candidate);
        }
        else {
            return res.send([])
        }
    } catch (err){
        console.log(err);
    }
}

const updateCandidate = async (req, res) => {
    try {
        const { Id } = req.params;
        const payload = req.body;
        const result = await Candidate.update(payload, {
            where: {
                candidateId: Id
            }
        });
        if (result) {
            return res.json({ message: "Candidate updated successfully" });
        }
        else {
            return res.json({ message: "Invalid Candidate Id. Please provide valid Candidate Id" });
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteCandidate = async (req, res) => {
    try {
        const { Id } = req.params;
        const result = await Candidate.destroy({
            where: {
                candidateId: Id
            }
        });
        if (result) {
            return res.json({ message: "Candidate deleted successfully" });
        }
        else {
            return res.json({ message: "Invalid Candidate Id. Please provide valid Candidate Id" });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { listCandidates, createNewCandidate, searchByCandidateId, searchByCandidateName, updateCandidate, deleteCandidate };
