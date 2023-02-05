import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../App.css';

function Candidate({ match }) {
    const [candidate, setCandidate] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}search/${match.params.id}`)
        const candidate = await response.json();
        setCandidate(candidate);
    }
    const TextView = ({ label, value }) =>
        <div className="col mt-3 mb-3 me-5 text-start fw-bold">
            {label} : <span className="fw-normal">{value}</span>
        </div>;

    const candidateInterviewDate = (interviewDate) => {
        if (interviewDate) {
            return (moment(interviewDate, "YYYY-MM-DD").format("Do MMM YYYY"))
        }
        else {
            return ("")
        }
    }

    return (
        <div className="App">
            <div>
                <div className="p-3 text-white fw-bold" style={{ backgroundColor: '#823287' }}>
                    <h1 className="fw-bold pe-5">DETAILS OF CANDIDATE</h1>
                </div>
                <Link className="text-decoration-none text-white" to={`/`}><button type="button" class="btn btn-sm btn-secondary mb-3 mt-4 rounded-pill" style={{ position: "relative", right: "500px" }}><span className="me-3 ms-3">Back</span></button></Link>
                <Link className="text-decoration-none text-dark" to={`/candidate/update/${candidate.candidateId}`}><button type="button" class="btn btn-sm btn-warning mb-3 mt-4 rounded-pill" style={{ position: "relative", left: "450px" }}><span className="me-3 ms-3">Edit</span></button></Link>
                <div className="container mt-4" style={{ border: "3px solid #823287", borderRadius: "20px" }}>
                    <div class="row">
                        <TextView label="Candidate ID" value={candidate.candidateId} />
                        <TextView label="Candidate Name" value={`${candidate.firstName} ${candidate.lastName}`} />
                        <TextView label="Email Id" value={candidate.emailId} />
                    </div>
                    <div class="row">
                        <TextView label="Phone No" value={candidate.phoneNo} />
                        <TextView label="Gender" value={candidate.gender} />
                        <TextView label="Experience" value={`${candidate.experienceYears}.${candidate.experienceMonths}`} />
                    </div>
                    <div class="row">
                        <TextView label="Notice Period" value={candidate.noticePeriod} />
                        <TextView label="Interviewer" value={candidate.interviewer} />
                        <TextView label="Skills" value={candidate.skills} />
                    </div>
                    <div class="row">
                        <div class="col mt-3 mb-3 me-5 text-start fw-bold">
                            Linkedin Link : <span className="fw-normal"><a href={candidate.linkedinLink} > {candidate.linkedinLink}</a></span>
                        </div>
                        <div class="col mt-3 mb-3 me-5 text-start fw-bold">
                            Resume Link : <span className="fw-normal"><a href={candidate.resumeLink} > {candidate.resumeLink}</a></span>
                        </div>
                        {/* <TextView label="Scheduled On" value={candidate.interviewDate} /> */}
                        <TextView label="Scheduled On" value={candidateInterviewDate(candidate.interviewDate)} ></TextView>
                    </div>
                    <div class="row">

                        <TextView label="Status" value={candidate.status} />
                        <TextView label="Ratings" value={candidate.ratings} />

                    </div>
                    <div class="row">
                        <TextView label="Pros Comments" value={candidate.prosComments} />
                        <TextView label="Cons Comments" value={candidate.consComments} />
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Candidate;
