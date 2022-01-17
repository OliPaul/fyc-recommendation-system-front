import React, {Fragment} from "react";

const Card = ({title, image, category, episodes, score, scored_by, onClick}) => {
    return(
        <Fragment>
            <div className="card" onClick={onClick}>
                <div className="card-header">
                    <div className="profile">
                        <span className="letter">{title[0]}</span>
                    </div>
                    <div className="card-title-group">
                        <h5 className="card-title">{title}</h5>
                        <div className="card-date">{episodes} episodes</div>
                    </div>
                </div>
                <div className="card-image-container">
                    <img className="card-image" src={image} alt="Logo" />
                </div>
                <div className="card-text">{category}</div>
                <div className="card-like-bar">
                    <div className="like-text">
                        <b>Score : </b> {score}
                    </div>
                    <div className="like-text">
                        <b>by</b> {scored_by} people.
                    </div>
                </div>
            </div>
            <style jsx>{`
                .card {
                    background-color: white;
                    color: #272727;
                    padding: 5px;
                    border-radius: 10px;
                    border: 0px;
                    border-color: tomato;
                    border-style: solid;
                    transition: 2ms;
                    max-width: 300px;
                    margin: 20px;
                }
                    
                .card:hover {
                    transition: 2ms;
                    border: 1px;
                    border-color: tomato;
                    border-style: solid;
                }
                    
                .card-header {
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                }
                    
                .profile {
                    width: 2.5rem;
                    height: 2.5rem;
                    background-color: tomato;
                    border-radius: 50%;
                    margin: 10px;
                    font-size: 20pt;
                    text-align: center;
                    font-weight: bold;
                    color: white;
                    justify-content: center;
                }
                    
                .letter {
                    vertical-align: middle;
                }
                    
                .card-title-group {
                    justify-content: center;
                }
                    
                .card-title {
                    flex: 0.5;
                    font-size: medium;
                    margin-bottom: 0;
                    margin-top: 0;
                }
                .card-date {
                    flex: 0.3;
                    font-size: small;
                    margin-top: 0;
                }
                
                .card-image-container {
                    display: flex;
                    justify-content: center;
                }
                    
                .card-image {
                    border-radius: 10px;
                    margin-bottom: 10px;
                    margin-top: 10px;
                    width: 180px;
                }
                .card-like-icon {
                    height: 25px;
                }
                    
                .card-text {
                    width: 300px;
                    font-size: medium;
                }
                    
                .card-like-bar {
                    display: flex;
                    align-items: center;
                    margin-top: 20px;
                    justify-content: space-between;
                }
                    
                .like-text {
                    font-size: small;
                    margin-left: 10px;
                }
            
            `}</style>
        </Fragment>
    );
}

export default Card;