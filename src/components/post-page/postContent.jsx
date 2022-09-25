import "./postContent.css";



const PostContent = ({post}) => {



    return (
        <div className="post-left-column">
            <div className="post-banner-div">
                <h1 className="post-banner-text">Placeholder Banner</h1>
                <img className="post-banner" src={post[0].bannerImg}></img>    
            </div>
            <div className="post-content">
                <div>
                    <h3>{post[0].position}</h3>
                    <hr className="post-divider"></hr>
                    <h5>{post[0].type} - {post[0].timeframe} - {post[0].location}</h5>
                </div>
                <div className="post-overview">
                    <h4>Overblik</h4>
                    <h6 className="post-description">{post[0].description}</h6>
                </div>
            </div>
        </div>
    );
}

export default PostContent; 