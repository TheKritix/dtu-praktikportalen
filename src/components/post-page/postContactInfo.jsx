import "./postContactInfo.css";
import logo from "../../res/images/dtu-logo.png"
import face from "../../res/images/employee.png"

const PostContactInfo = () => {


    return (
        <div className="post-company-container">
            <div className="comp-logo-div">
                <img className="comp-logo" src={logo}></img>
            </div>
            <div className="comp-info">
                <h4>Firma</h4>
                <h4>Personnavn</h4>
                <h4>Tlf</h4> 
                <h4>Email</h4>
                <img className="contact-img" src={face}></img>
            </div>
        </div>
    );
}

export default PostContactInfo; 