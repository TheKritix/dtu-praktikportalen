import "./feedbackStyles.css";
import star from "../../res/icons/star.png"
import user from "../../res/icons/user.png"

//XXXX Bootstrap XXXX
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginEmployee from "../login/login";


const FeedbackCard = ({data}) => {



    return (
        <div className="feedbackCard">
            
            <Container>
                <Row className="feedback">
                    <Col sm={2}>
                        <span className="rating"><img src={star} alt="rating-star-img" className="rating-star"/><p> {data['ratingOutOfFive']} / 5</p></span>
                        
                    </Col>
                    <Col sm={10}>
                        <p className="feedback-text">{data['text']}</p>
                    </Col>
                </Row>
                    
            </Container>
            <Container >
                <Row className="feedback-info">
                    <Col sm={6}>
                        <img src={user} alt="profile-pic"/>
                        <p className="feedback-signature">{data['firstName'] } {data['lastName']}</p>
                    </Col>
                    <Col sm={6}>
                        <p className="postedAt">Posted at: {data['postedAt']}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FeedbackCard; 