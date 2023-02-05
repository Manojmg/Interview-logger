import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddDetails from './AddDetails';
import { isEmpty, get } from 'lodash';
import moment from 'moment';
import {
    Badge, Button, Form, Input
} from "reactstrap";

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        listData();
    }, []);

    const listData = async () => {
        const response = await axios({
            url: `${process.env.REACT_APP_BASE_URL}list`,
            method: 'GET'
        });
        const candidatesData = response.data;
        setCandidates(candidatesData);
    }

    const searchCandidate = async () => {
        const response = await axios({
            url: `${process.env.REACT_APP_BASE_URL}searchname/${searchText}`,
            method: 'GET'
        });
        const candidatesData = get(response, 'data', []);
        setCandidates(candidatesData);
    }

    const onChangeSearchText = (event) => {
        let searchText = event.target.value;
        setSearchText(searchText);
    };

    const onClickSearch = () => {
        if (searchText.length === 0) {
            listData()
        }
        else {
            searchCandidate();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let searchText = event.target.value;
            if (searchText.length === 0) {
                listData();
            }
            else {
                setSearchText(searchText);
                searchCandidate();
            }

        }
    }
    const candidateStatus = (status) => {
        if (status) {
            if (status === 'Rejected') {
                return (<Badge style={{ backgroundColor: "crimson", fontSize: "15px" }}>{status}</Badge>)
            }
            else if (status === 'Selected') {
                return (<Badge style={{ backgroundColor: "green", fontSize: "15px" }}>{status}</Badge>)
            }
            else {
                return (<Badge style={{ backgroundColor: "grey", fontSize: "15px" }}>{status}</Badge>)
            }
        }
        else {
            return ("")
        }
    }

    const candidateInterviewDate = (interviewDate) => {
        return interviewDate ? (moment(interviewDate, "YYYY-MM-DD").format("Do MMM YYYY")) : ""
    }

    const displayCandidates = () => {
        {
            if (candidates.length !== 0) {
                return (
                    candidates.map(candidate => (
                        <tr>
                            <th>
                                <Link className="text-decoration-none" to={`/candidate/${candidate.candidateId}`}>
                                    {candidate.candidateId}
                                    </Link>
                            </th>
                            <td>{`${candidate.firstName} ${candidate.lastName}`}</td>
                            <td> {candidate.emailId} </td>
                            <td>{candidateStatus(candidate.status)}</td>
                            <td>{candidate.interviewer}</td>
                            <td> {candidateInterviewDate(candidate.interviewDate)} </td>
                        </tr>
                    )))
            }
            else {
                return (
                    <div className=" container" style={{ position: "absolute" }}>
                        <h1 className="text-danger">Candidate not found </h1>
                    </div>
                )
            }
        }
    }

    return (
        <div>
            <div className="p-3 text-white fw-bold" style={{ backgroundColor: '#823287' }}>
                <h1 className="fw-bold pe-5">INTERVIEW LOGGER</h1>
            </div>
            <div className="d-flex flex-row mt-4">
                <Form className="ms-5 ps-5" inline style={{ margin: "8px", display: "flex", width: "30%" }}>
                    <Input className="rounded-pill"
                        type="text"
                        name="searchText"
                        placeholder="Type here to search Candidates.."
                        onChange={onChangeSearchText}
                        onKeyDown={handleKeyDown}
                    />
                    <Button className="btn btn-sm rounded-pill" color="primary" onClick={onClickSearch} style={{ position: "relative", left: "20px" }}>
                        <span className="me-2 ms-2">
                            Search
                        </span>
                    </Button>
                </Form>
                <AddDetails />
            </div>
            <div class="container-float m-3">
                {
                    <table class="table table-striped table-hover table-bordered">
                        <thead className="text-white" style={{ backgroundColor: '#823287' }}>
                            <tr>
                                <th scope="col">CANDIDATE ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">EMAIL ID</th>
                                <th scope="col">STATUS</th>
                                <th scope="col">INTERVIEWER</th>
                                <th scope="col">SCHEDULED ON</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayCandidates()
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default CandidateList;
