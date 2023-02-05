import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Label, Form, Input, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from "moment";
import Select from "react-select";
import { isEmpty } from 'lodash';
import '../App.css';

function Candidate({ match }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [gender, setGender] = useState("");
    const [experienceYears, setExperienceYears] = useState("");
    const [experienceMonths, setExperienceMonths] = useState("");
    const [linkedinLink, setLinkedInLink] = useState("");
    const [resumeLink, setResumeLink] = useState("");
    const [skills, setSkills] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");
    const [prosComments, setProsComments] = useState("");
    const [consComments, setConsComments] = useState("");
    const [ratings, setRatings] = useState("");
    const [status, setStatus] = useState("");
    const [interviewer, setInterviewer] = useState("");
    const [interviewDate, setInterviewDate] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchData = await fetch(`${process.env.REACT_APP_BASE_URL}search/${match.params.id}`);
        const candidate = await fetchData.json();
        setFirstName(candidate.firstName);
        setLastName(candidate.lastName);
        setEmailId(candidate.emailId);
        setPhoneNo(candidate.phoneNo);
        setGender(candidate.gender);
        setExperienceYears(candidate.experienceYears);
        setExperienceMonths(candidate.experienceMonths);
        setLinkedInLink(candidate.linkedinLink);
        setResumeLink(candidate.resumeLink);
        setSkills(candidate.skills);
        setNoticePeriod(candidate.noticePeriod);
        setRatings(candidate.ratings);
        setProsComments(candidate.prosComments);
        setConsComments(candidate.consComments);
        setStatus(candidate.status);
        setInterviewer(candidate.interviewer);
        setInterviewDate(candidate.interviewDate);
    }

    const minDate = moment().format("YYYY-MM-DD");
    const maxDate = moment().add(1, 'month').calendar();

    const updateCandidates = async (candidateJson) => {
        const response = await axios({
            url: `${process.env.REACT_APP_BASE_URL}update/${match.params.id}`,
            method: 'PUT',
            data: candidateJson
        });
    }

    const onClickSaveCandidate = () => {

        let statusValue = ""
        if (!isEmpty(status)) {
            statusValue = status.value
        }
        else {
            statusValue = ""
        }

        const candidateJson = {
            "firstName": firstName,
            "lastName": lastName,
            "emailId": emailId,
            "phoneNo": phoneNo,
            "gender": gender,
            "experienceYears": experienceYears,
            "experienceMonths": experienceMonths,
            "linkedinLink": linkedinLink,
            "resumeLink": resumeLink,
            "skills": skills,
            "noticePeriod": noticePeriod,
            "prosComments": prosComments,
            "consComments": consComments,
            "ratings": ratings,
            "status": statusValue,
            "interviewer": interviewer,
            "interviewDate": interviewDate
        }
        updateCandidates(candidateJson);
    }

    const data = [{
        value: "Selected",
        label: "Selected"
    }, {
        value: "Rejected",
        label: "Rejected"
    }, {
        value: "Pending",
        label: "Pending"
    }];

    const handleChange = (event) => {
        setStatus((event))
    }

    return (
        <div className="App">
            <div className="p-3 text-white fw-bold" style={{ backgroundColor: '#823287' }}>
                <h1 className="fw-bold pe-5" >UPDATE DETAILS </h1>
            </div>
            <Link className="text-decoration-none text-white" to={`/candidate/${match.params.id}`}><Button className="ms-5 mt-4 mb-2 pe-4 ps-4 rounded-pill" color="secondary" style={{ position: "relative", right: "500px" }}> Back </Button></Link>
            <Link className="text-decoration-none text-dark" to={`/candidate/${match.params.id}`}><Button onClick={onClickSaveCandidate} className="ms-5 mt-4 mb-2 pe-4 ps-4 rounded-pill" color="primary" style={{ position: "relative", left: "450px" }}>Save</Button></Link>
            <div className="container ">
                <Form className="mt-3 mb-3">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="form-floating mb-2 me-5 ">
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} class="form-control" id="fname" placeholder="fname" disabled />
                                    <label for="fname">First Name</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5 ">
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} class="form-control" id="lname" placeholder="lname" disabled />
                                    <label for="lname">Last Name</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} class="form-control" id="floatingInput" placeholder="name@example.com" disabled />
                                    <label for="floatingInput">Email ID</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} class="form-control" id="phoneno" placeholder="phoneno" disabled />
                                    <label for="phoneno" >Phone No</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="gender" value={gender} onChange={(e) => setGender(e.target.value)} class="form-control" id="floatingGender" placeholder="Gender" disabled />
                                    <label for="floatingGender">Gender</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="text" value={`${experienceYears}.${experienceMonths}`} class="form-control" id="expereince" placeholder="expereince" disabled />
                                    <label for="expereince">Experience<span className="fw-lighter fs-6">(y.m)</span></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} class="form-control" id="skills" placeholder="skills" disabled />
                                    <label for="skills">Skills</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="url" value={linkedinLink} onChange={(e) => setLinkedInLink(e.target.value)} class="form-control" id="linkedinlink" placeholder="linkedlink" />
                                    <label for="linkedinlink">Linkedin link</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="url" value={resumeLink} onChange={(e) => setResumeLink(e.target.value)} class="form-control" id="resumelink" placeholder="resumelink" />
                                    <label for="resumelink">Resume link</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="text" value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} class="form-control" id="noticeperiod" placeholder="noticeperiod" />
                                    <label for="noticeperiod">Notice Period<span className="fw-lighter ">(days)</span></label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="text" value={interviewer} onChange={(e) => setInterviewer(e.target.value)} class="form-control" id="interviewr" placeholder="interviewr" />
                                    <label for="interviewr">Interviewer</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="date" min={minDate} max={maxDate} value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} class="form-control" id="interviewdate" placeholder="interviewdate" />
                                    <label for="interviewdate">Interview Date</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <Select class="mt-4 mb-4" options={data} id="status" onChange={handleChange} placeholder="status" />

                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <input type="number" min={1} max={10} value={ratings} onChange={(e) => setRatings(e.target.value)} class="form-control" id="ratings" placeholder="ratings" />
                                    <label for="ratings">Ratings</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <textarea class="form-control" value={prosComments} onChange={(e) => setProsComments(e.target.value)} placeholder="Pros Comments" id="prosComment" ></textarea>
                                    <label for="prosComment">Pros Comments</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-2 me-5">
                                    <textarea class="form-control" value={consComments} onChange={(e) => setConsComments(e.target.value)} placeholder="Cons Comments" id="consComment" ></textarea>
                                    <label for="consComment">Cons Comments</label>
                                </div>
                            </div>

                        </div>
                    </div>
                </Form>
            </div>
        </div >
    );
}

export default Candidate;
