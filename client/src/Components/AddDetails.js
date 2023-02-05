import React, { useState } from 'react';
import {
    Modal, ModalHeader, ModalBody, Button, Label
} from 'reactstrap';
import { isEmpty } from 'lodash';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Select from "react-select";

const AddDetails = () => {
    const [alert, setAlert] = useState("");
    const [skills, setSkills] = useState("");
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        mode: "onChange"
    });

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const addCandidates = async (candidateJson) => {
        const response = await axios({
            url: `${process.env.REACT_APP_BASE_URL}create/`,
            method: 'POST',
            data: candidateJson
        });

        if (!isEmpty(response)) {
            setAlert("New candidate has been added!!");
            setModal();
            window.location = "/";
        } else {
            setAlert("Candidate creation failed");
        }
    }

    const onClickSaveCandidate = (data) => {
        const candidateJson = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "emailId": data.emailId,
            "phoneNo": data.phoneNo,
            "gender": data.gender,
            "skills": skills.toString(),
            "experienceYears": data.experienceYears,
            "experienceMonths": data.experienceMonths,
            "linkedinLink": data.linkedinLink,
            "resumeLink": data.resumeLink,
            "noticePeriod": data.noticePeriod
        }

        addCandidates(candidateJson);

    }

    const skillData = [{
        value: "C",
        label: "C"
    }, {
        value: "C++",
        label: "C++"
    }, {
        value: "Python",
        label: "Python"
    }, {
        value: "Javascript",
        label: "Javascript"
    }, {
        value: "Golang",
        label: "Golang"
    }, {
        value: "Ruby",
        label: "Ruby"
    }]

    const handleSkillChange = (event) => {
        setSkills(Array.isArray(event) ? event.map(e => (e.value)) : [])
    }

    return (
        <div>
            <span className="d-flex flex-row-reverse bd-highlight">
                <Button className="me-5 mt-2 btn btn-primary text-right rounded-pill float-end" color="primary" onClick={toggle} style={{ position: "relative", left: "700px" }}><span className="me-2 ms-2">Add Candidate</span> </Button>
            </span>
            <Modal isOpen={modal} toggle={toggle} className="modal-xl" backdrop="static">
                <ModalHeader toggle={toggle} color="primary">Add New Candidate</ModalHeader>
                <ModalBody color="info">
                    <form onSubmit={handleSubmit(onClickSaveCandidate)}>
                        <div class="row mb-4">
                            <div class="col">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    class="form-control text-colo"
                                    placeholder="Bill"
                                    {...register("firstName", {
                                        required: "this is a required *",
                                    })}
                                />
                                {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                            </div>
                            <div class="col">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    class="form-control"
                                    placeholder="Morgan"
                                    {...register("lastName", {
                                        required: "this is a required *",
                                    })}
                                />
                                {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                            </div>
                            <div class="col">
                                <label htmlFor="email">Email</label>
                                <input
                                    class="form-control"
                                    placeholder="morganbill1049@hotmail.com"
                                    type="text"
                                    {...register("emailId", {
                                        required: "this is required *",
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.emailId && <p className="text-danger">{errors.emailId.message}</p>}
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col">
                                <label htmlFor="phoneNo">Phone No</label>
                                <input
                                    class="form-control"
                                    placeholder="phoneNo"
                                    {...register("phoneNo", {
                                        required: "this is a required *",
                                        maxLength: {
                                            value: 10,
                                            message: "Phone number is invalid"
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "Phone number is invalid"
                                        }
                                    })}
                                />
                                {errors.phoneNo && <p className="text-danger">{errors.phoneNo.message}</p>}
                            </div>
                            <div class="col">
                                <label htmlFor="email">Gender</label>
                                <div class="col" required >
                                    <input class="form-check-input-sm mt-3" type="radio" value="male" name="flexRadioDefault" id="flexRadioDefault1"
                                        {...register("gender", {
                                        })} />
                                    <label class="form-check-label mt-2 ms-3 me-5" for="flexRadioDefault1">
                                        Male
                                    </label>
                                    <input class="form-check-input-sm mt-2" type="radio" value="female" name="flexRadioDefault" id="flexRadioDefault1"
                                        {...register("gender", {
                                            required: "*",
                                        })} />
                                    <label class="form-check-label mt-2 ms-3 me-5" for="flexRadioDefault1" style={{ display: "inline-block" }}>
                                        Female
                                    </label>
                                    {errors.gender && <p class="text-danger" style={{ margin: "-55px 0 0 70px" }}>{errors.gender.message}</p>}
                                </div>
                            </div>
                            <div class="col">
                                <div class="d-flex flex-row">
                                    <label htmlFor="experience">Experience</label>
                                    <input
                                        class="form-control"
                                        placeholder="Years"
                                        {...register("experienceYears", {
                                            required: "*",
                                            maxLength: {
                                                value: 2,
                                                message: " Enter valid experience"
                                            },
                                            minLength: {
                                                value: 1,
                                                message: "Enter valid experience"
                                            }
                                        })}
                                        style={{ width: "40%", margin: "25px 0px 0 -75px" }} />
                                    {errors.experienceYears && <p className="text-danger" style={{ margin: "0 0 +10px" }}>{errors.experienceYears.message}</p>}

                                    <input
                                        class="form-control"
                                        placeholder="Months"
                                        {...register("experienceMonths", {
                                            required: "*",
                                            maxLength: {
                                                value: 2,
                                                message: "Enter valid experience"
                                            },
                                            minLength: {
                                                value: 1,
                                                message: "Enter valid experience"
                                            }
                                        })}
                                        style={{ width: "40%", display: "inline-block", margin: "25px 0px 0 +10px" }} />
                                    {errors.experienceMonths && <p className="text-danger">{errors.experienceMonths.message}</p>}
                                </div>
                            </div>

                        </div>

                        <div class="row mb-4">
                            <div class="col">
                                <label htmlFor="linkedinLink">Linkedin Link</label>
                                <input
                                    class="form-control"
                                    placeholder="linkedin link"
                                    {...register("linkedinLink", {
                                        required: "this is a required *",
                                    })}
                                />
                                {errors.linkedinLink && <p className="text-danger">{errors.linkedinLink.message}</p>}
                            </div>

                            <div class="col">
                                <label htmlFor="resumeLink">Resume Link</label>
                                <input
                                    class="form-control"
                                    placeholder="resume link"
                                    {...register("resumeLink", {
                                        required: "this is a required",
                                    })}
                                />
                                {errors.resumeLink && <p className="text-danger">{errors.resumeLink.message}</p>}
                            </div>
                            <div class="col">
                                <label htmlFor="noticePeriod">Notice Period <span className="fw-lighter fs-6">(in days)</span></label>
                                <input
                                    class="form-control"
                                    placeholder="notice period"
                                    {...register("noticePeriod", {
                                        required: "this is a required *",
                                        maxLength: {
                                            value: 2,
                                            message: "Enter valid number of days"
                                        }
                                    })}
                                />
                                {errors.noticePeriod && <p className="text-danger">{errors.noticePeriod.message}</p>}
                            </div>
                        </div>

                        <div class="row  mb-4">
                            <div class="col" >
                                <div className="mb-2 me-5">
                                    <Label id="skills">Skills</Label>
                                    <Select isMulti options={skillData} onChange={handleSkillChange} id="skills" placeholder="Skills" />

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                        </div>
                        <button class="btn btn-primary rounded-pill ps-4 pe-4" type="submit" style={{ position: "relative", left: "820px" }}>Submit</button>
                        <Button color="secondary pe-4 ps-4 ms-4 rounded-pill" onClick={toggle} style={{ position: "relative", left: "820px" }}>Cancel</Button>

                    </form>
                </ModalBody>
            </Modal >
        </div >
    )
}

export default AddDetails;