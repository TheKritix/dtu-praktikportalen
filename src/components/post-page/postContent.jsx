import "./postContent.css";
import bannerPlaceholder from "../../res/images/PlaceholderBanner.png"
import {observer} from 'mobx-react-lite';


const PostContent = ({post}) => {

    return (
        <div className="post-left-column">
            <div className="post-banner-div">
                <h1 className="post-banner-text">Placeholder Banner</h1>
                <img className="post-banner" src={bannerPlaceholder} alt="postbanner"></img>    
            </div>
            <div className="post-content">
                <div>
                    <h3>{post.position}</h3>
                    <hr className="post-divider"></hr>
                    <h5>{post.type} - {post.startdate} - {post.location}</h5>
                </div>
                <div className="post-overview">
                    <h4>Overblik</h4>
                    <h6 className="post-description">{post.description}</h6>
                </div>
            </div>
        </div>
    );
}

export default observer(PostContent); 