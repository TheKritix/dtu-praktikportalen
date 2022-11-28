import "./postContent.css";
import bannerPlaceholder from "../../res/images/PlaceholderBanner.png"
import {postStore} from '../../stores/post-store'
import {useState, useEffect} from "react"


const PostContent = ({post, review}) => {

    const [banner, setBanner] = useState(bannerPlaceholder);


    const getBannerImage = () => {
    
        if (review === false) {
            postStore.fetchBannerImage(post).then(() => {
                setBanner(postStore.bannerImage);
                console.log(banner)
              });
        } else {
            setBanner(post.bannerImg);
        }
    };

    useEffect(() => {
        getBannerImage()
    })

    return (
        <div className="post-left-column">
            <div className="post-banner-div">
                {/* <h1 className="post-banner-text">Placeholder Banner</h1> */}
                <img className="post-banner" src={banner} alt="postbanner"></img>  
                {/* {post.bannerImg != null ? (
                    <img className="post-banner" src={banner} alt="postbanner"></img>    
                    ) : (
                    <img className="post-banner" src={banner} alt="postbanner"></img>  
                    ) }
                 */}
            </div>
            <div className="post-content">
                <div>
                    <h3>{post.title}</h3>
                    <hr className="post-divider"></hr>
                    <h5>{post.type} - {post.startdate} - {post.location}</h5>
                </div>
                <div className="post-overview">
                    <h4>Overblik</h4>
                    {post.description.split("\n").map((text) => {
                        return (
                            <h6 className="post-description">
                                {text}
                                <br/>
                            </h6>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    );
}

export default PostContent; 