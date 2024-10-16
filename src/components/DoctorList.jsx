import { useNavigate } from "react-router-dom"

function DoctorList({doctor}){
    const navigate=useNavigate()
    return(
        <>
        <div className="card m-3" style={{cursor:'pointer'}} onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`)}>
            <div className="card-header">
                Dr. {doctor.firstname} {doctor.lastname}
            </div>
            <div className="card-body">
                <p>
                    <b>Specification : </b> {doctor.specification}
                </p>
                <p>
                    <b>Experience : </b> {doctor.experience}
                </p>
                <p>
                    <b>Fees Per Consaltation : </b> {doctor.feesPerConsaltation}
                </p>
                <p>
                    <b>Timings : </b> {doctor.timings[0]} - {doctor.timings[1]}
                </p>
            </div>
        </div>
        </>
    )
}

export default DoctorList