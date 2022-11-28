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
                <h4 className="info-title">{post.company}</h4>
                <h6 className="info-subtitle">Kontakt:</h6>
                <h5 className="info-value">{post.contact}</h5>
                <h6 className="info-subtitle">Email:</h6>
                <h5 className="info-value">{post.applyToEmail}</h5> 
                <h6 className="info-subtitle">Hjemmeside:</h6>
                <h5 className="info-value">{post.website}</h5>
                <img className="contact-img" src={face} alt="contactImg"></img>
            </div>
        </div>
    );
}

export default PostContactInfo; 