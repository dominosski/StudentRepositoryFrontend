import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper, Button } from '@mui/material';
import Popup from './Popup';


export default function Student() {
    const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" }
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [indexNumber, setIndexNumber] = useState('')
    const [updateFirstName, setUpdateFirstName] = useState('')
    const [updateLastName, setUpdateLastName] = useState('')
    const [updateIndex, setUpdateIndex] = useState('')
    const [students, setStudents] = useState([])
    const [id, setId] = useState('')
    const [buttonPopup, setButtonPopup] = useState(false)

    const handleClick = async (e) => {
        e.preventDefault()
        const student = { firstName, lastName, indexNumber }
        await fetch("http://localhost:8080/api/student", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }
        ).then(() => {
            console.log("New student has been added")
        })
    }

    const HandleSearchClick = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:8080/api/student", {
            method: "GET"
        })

        const result = await response.json()

        setStudents(result)
    }

    const HandleUpdateClick = async (e, id) => {
        e.preventDefault()

        const student = { id: id, firstName: updateFirstName, lastName: updateLastName, indexNumber: updateIndex }
        console.log(id)
        await fetch("http://localhost:8080/api/student", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("Student has been updated")
        })
    }

    const HandleDeleteClick = async (e, id) => {
        e.preventDefault()

        await fetch(`http://localhost:8080/api/student/${id}`, {
            method: "DELETE"
        }).then(() => {
            console.log(`Student with ID: ${id} has been deleted`)
        })

    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Students list</h1>
                {students.map(student => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
                        ID: {student.id} <br />
                        First Name: {student.firstName}<br />
                        Last Name: {student.lastName}<br />
                        Index Number: {student.indexNumber}<br />
                        <Button variant="contained" color="secondary" style={{ marginTop: "10px", marginLeft: "10px" }} onClick={(e) => { setButtonPopup(true); setId(student.id) }}>Update</Button>
                        <Button variant="contained" color="error" style={{ marginTop: "10px", marginLeft: "10px" }} onClick={(e) => HandleDeleteClick(e, student.id)}>Delete</Button>

                    </Paper>
                ))}


                <Button variant="contained" color="success" onClick={HandleSearchClick} style={{ marginTop: "10px" }}>Show students list</Button>

                <h1 style={{ color: "#121212" }}>Add Student</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <TextField id="outlined-basic" label="Index Number" variant="outlined" fullWidth value={indexNumber} onChange={(e) => setIndexNumber(e.target.value)} />
                    <Button variant="contained" color="success" onClick={handleClick} style={{ marginTop: "10px" }}>
                        Add Student
                    </Button>
                </Box>
            </Paper>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} id={setId}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="First Name" variant="outlined" style={{ marginTop: "30px" }} fullWidth value={updateFirstName} onChange={(e) => setUpdateFirstName(e.target.value)} />
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth value={updateLastName} onChange={(e) => setUpdateLastName(e.target.value)} />
                    <TextField id="outlined-basic" label="Index Number" variant="outlined" fullWidth value={updateIndex} onChange={(e) => setUpdateIndex(e.target.value)} />
                    <Button variant="contained" color="success" onClick={(e) => HandleUpdateClick(e, id)} style={{ marginTop: "10px" }}>
                        Update Student
                    </Button>


                </Box>
            </Popup>

        </Container>
    );
}
