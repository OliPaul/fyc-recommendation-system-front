import React, {Fragment} from "react";

const Navbar = () => {
    return (
        <Fragment>
            <div className={"navbar"}>
                <div className={"navbar-content"}>
                    <img className={"logo"} src={"logo5x.png"} alt={""}/>
                </div>
            </div>
            <style jsx>{`
                .navbar {
                    background-color: #C4C4C4;
                    position: fixed;
                    height: 70px;
                    width: 100%;
                    left: 0;
                    top: 0;
                    padding-top: 30px;
                }
                
                .logo {
                    max-height: 50px;
                    box-fit: contain;
                }
                
                .field {
                    background: #FFFFFF;
                    border-radius: 4px;
                    width: 180px;
                    height: 20px;
                }
                
                .navbar-content {
                    width: 70%;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: row;
                    margin: auto
                }
                
                .search {
                    display: flex;
                    flex-direction: row
                }
                
                .search-button {
                    background: #03A4FF;
                    border-radius: 5px;
                    width: 73px;
                    height: 30px;
                    text-align: center;
                }
            `}</style>
        </Fragment>
    );
}

export default Navbar;