import "./postContent.css";



const PostContent = () => {

    

    return (
        <div className="post-left-column">
            <div className="post-banner">
                <h1 className="post-banner-text">Banner for stilling/firma</h1>   
            </div>
            <div className="post-content">
                <div>
                    <h3>Post navn (stilling)</h3>
                    <hr className="post-divider"></hr>
                    <h5>Type - Tidsramme - Placering</h5>
                </div>
                <div className="post-overview">
                    <h4>Overblik</h4>
                    <h6 className="post-description">Her kommer der en beskrivelse af stillingen</h6>
                </div>
            </div>
        </div>
    );
}

export default PostContent; 