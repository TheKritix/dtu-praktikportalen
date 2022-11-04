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
                <h6 style={{marginBottom: '50px'}}>{post.company}</h6>
                <h6>Kontakt: {post.contact}</h6>
                <h6>TLF: +45 {post.phonenumber}</h6> 
                <h6>Mail: {post.email}</h6>
                <img className="contact-img" src={face} alt="contactImg"></img>
            </div>
        </div>
    );
}

export default PostContactInfo; 