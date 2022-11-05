import "./postContactInfo.css";
import logo from "../../res/images/dtu-logo.png"
import face from "../../res/images/employee.png"

const PostContactInfo = ({post}) => {


    return (
        <div className="post-company-container">
            <div className="comp-logo-div">
                <img className="comp-logo" src={logo} alt="compLogo"></img>
                
            </div>
            <div className="comp-info">
                <h4 style={{marginBottom: '50px', fontWeight: "bold"}}>{post.company}</h4>
                <h6 style={{fontWeight: "bold"}}>Kontakt:</h6>
                <h5 style={{marginBottom: '30px'}}>{post.contact}</h5>
                <h6 style={{fontWeight: "bold"}}>Email:</h6>
                <h5 style={{marginBottom: '30px'}}>{post.applyToEmail}</h5> 
                <h6 style={{fontWeight: "bold"}}>Hjemmeside:</h6>
                <h5 style={{marginBottom: '30px'}}>{post.website}</h5>
                <img className="contact-img" src={face} alt="contactImg"></img>
            </div>
        </div>
    );
}

export default PostContactInfo; 