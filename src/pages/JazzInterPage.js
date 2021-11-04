import React, { useState, useEffect } from 'react';
import './JazzInterPage.css';
import usaFlag from './usaFlag.png';

const firstPageDesign = {
    zIndex: "2",
    position: "relative",
    left: "10%",
    width: "40%",
    height: "100%",
    transform: "rotateY(0deg)",
    transition: "1s",
    transformStyle: "preserve-3d",
    transformOrigin: "right",
};

const lastPageDesign = {
    textAlign: "center",
    position: "absolute",
    left: "50%",
    width: "40%",
    height: "100%",
    background: "white",
    border: "7px solid black",
    boxSizing: "border-box",
};

const JazzInterPage = () => {
    const [cssFirstPage, setCssFirstPage] = useState(firstPageDesign);
    const [cssLastPage, setCssLastPage] = useState(lastPageDesign);
    
    // 이 페이지가 렌더링 되자 마자 바로 goToLeft 함수 실행
    useEffect(() => {
        goToLeft();
    }, [])

    // 페이지가 왼쪽으로 넘어가며 책을 표지 쪽으로 닫는 애니메이션을 보여주는 함수
    const goToLeft = () => {
        setCssFirstPage({...cssFirstPage, animation: "turnToLeft 1.5s forwards"});
        setTimeout(function() {
            setCssLastPage({...cssLastPage, display: "none"});
            setCssFirstPage({...cssFirstPage, transform: "rotateY(180deg)", animation: "goToLeftAni 1.5s forwards"});
        }, 1500);
        setTimeout(function() {
            window.open('/', '_self');
        }, 3000);
    };

    return (
        <>
            <div style={cssFirstPage}>
                <div className="modifyFirst modifyCover">
                    <img src={usaFlag} alt="usaFlag"></img>
                    <h1>America Jazz</h1>
                </div>
                <div className="modifyFirst modifyPage1">

                </div>
            </div>
            
            <div style={cssLastPage} className="modifyLastPage">

            </div>
        </>
    )
}

export default JazzInterPage
