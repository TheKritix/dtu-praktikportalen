import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {internshipListStore} from "./internship-list-store";
import {values} from "mobx";


const locations = [
    {location: "Danmark"},
    {location: "Sverige"},
    {location: "Norge"},
    {location: "Remote"}
]

/*const FilterMethod = () => {
    const [location, setLocation] = useState([])
    const [filteredLocation, setFilteredLocation] = useState([])

    const handleChange = e => {
        if (e.target.checked) {
            setLocation([...location, e.target.value])
        } else {
            setLocation(location.filter(id => id !== e.target.value))
        }
    }

    useEffect(() => {
        if (location.length === 0) {
            setFilteredLocation(internshipListStore.internships)
        } else {
            setFilteredLocation(
                internshipListStore.internships.filter(internship =>
                location.some(location => [internship.location].flat().includes(location))
                )
            )
        }
    }, [location])
}*/


function CheckBox()  {

    const [location, setLocation] = useState([])
    const [filteredLocation, setFilteredLocation] = useState([])

    const handleChange = e => {
        if (e.target.checked) {
            setLocation([...location, e.target.value])
        } else {
            setLocation(location.filter(id => id !== e.target.value))
        }
    }

    useEffect(() => {
        if (location.length === 0) {
            setFilteredLocation(internshipListStore.internships)
        } else {
            setFilteredLocation(
                internshipListStore.internships.filter(internship =>
                    location.some(location => [internship.location].flat().includes(location))
                )
            )
        }
    }, [location])


    return(
        <div>
            <h6>Lokation</h6>
            <Form>
                {locations.map(location => (
                    <React.Fragment key={location.location}>
                        <Form.Check
                            onChange={handleChange}
                            type="checkbox"
                            label={location.location}
                            value={location.location}
                        />
                    </React.Fragment>
                ))}
            </Form>

        </div>
    )
}

export default CheckBox