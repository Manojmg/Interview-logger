module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define("Candidate", {
        candidateId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNo: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        experienceYears: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        experienceMonths: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        linkedinLink: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resumeLink: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ratings: {
            type: DataTypes.INTEGER
        },
        prosComments: {
            type: DataTypes.STRING
        },
        consComments: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        interviewer: {
            type: DataTypes.STRING
        },
        interviewDate: {
            type: DataTypes.DATE
        },
        noticePeriod: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "candidates",
        underscored: true,
        timestamps: false,
        schema: 'public',
        freezeTableName: true
    });

    Candidate.sync({ force: true }, () => {
        console.log("Table is created!");
    })

    return Candidate;
}