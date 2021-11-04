import React, { useState } from 'react';
import './JazzMainMenu.css';
import usaFlag from './usaFlag.png';
import axios from 'axios';

const book1Design = {
    zIndex: "2",
    position: "relative",
    left: "30%",
    width: "40%",
    height: "100%",
    transform: "rotateY(0deg)",
    transition: "1s",
    transformStyle: "preserve-3d",
    transformOrigin: "left",
};

const book2Design = {
    zIndex: "1",
    display: "none",
    position: "absolute",
    left: "50%",
    width: "40%",
    height: "100%",
    transform: "rotateY(0deg)",
    transition: "1s",
    transformStyle: "preserve-3d",
    transformOrigin: "left",
};

const lastPageDesign = {
    textAlign: "center",
    display: "none",
    position: "absolute",
    left: "50%",
    width: "40%",
    height: "100%",
    background: "white",
    border: "7px solid black",
    boxSizing: "border-box",
};

const JazzMainMenu = () => {

    const [cssBook1, setCssBook1] = useState(book1Design);
    const [cssBook2, setCssBook2] = useState(book2Design);
    const [cssLastPage, setCssLastPage] = useState(lastPageDesign);
    const [mainTitleAndContent, setMainTitleAndContent] = useState(
        [['내용 없음', '내용 없음'],
         ['내용 없음', '내용 없음'], 
         ['내용 없음', '내용 없음'], 
         ['내용 없음', '내용 없음']]
    );

    // 표지에서 첫 번째 장으로 들어가기 위해 표지를 누르면 API를 통해 데이터를 받아 출력하고
    // 페이지가 넘어가는 애니메이션을 출력하며 실제 데이터가 출력된 장으로 넘어가는 함수
    const goToRight1 = () => {
        setCssBook1({...cssBook1, animation: "goToRightAni 1.5s forwards"});
        
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://127.0.0.1:8000/jazzcategorys/',
            headers: { }
        };

        axios(config)
        .then(function (response) {
            for(let i=0; i<response.data.results.length; i++){
                mainTitleAndContent[i][0] = response.data.results[i].title
                mainTitleAndContent[i][1] = response.data.results[i].content
            }
            setMainTitleAndContent(mainTitleAndContent.concat());
        })
        .catch(function (error) {
            console.log(error);
        });

        setTimeout(function() {
            setCssBook1({...cssBook1, left: "50%", animation: "turnToRight 1.5s forwards"});
        }, 2000);
        setTimeout(function() {
            setCssBook2({...cssBook2, display: "block"});
        }, 1500);
    };

    // 각 요청 버튼(수정, 세부내용보기, 세부내용추가)을 누르면 페이지가 넘어가는 애니메이션을 작동시킨 후
    // 실제 요청을 실행하는 페이지로 넘어가게 하는 함수
    const goToRight2 = (id, goToUrl, goToDb) => {
        setCssLastPage({...cssLastPage, display: "block"});
        setCssBook2({...cssBook2, zIndex: "3", animation: "turnToRight 1.5s forwards"});
        setTimeout(function() {
            if(goToUrl === 'R'){
                window.open(`/JazzRecur/${id}/${goToDb}`, '_self');
            }
            else if(goToUrl === 'U'){
                window.open(`/JazzModify/${id}/jazzcategorys`, '_self');
            }
            else if(goToUrl === 'C'){
                window.open(`/JazzCreateRecur/${goToDb}`, '_self'); 
            }
        }, 1000);
    };

    return (
        <>
            <div style={cssBook1}>
                <div className="mainFirst mainCover" onClick={goToRight1}>
                    <img src={usaFlag} alt="usaFlag"></img>
                    <h1>America Jazz</h1>
                </div>
                <div className="mainFirst mainPage1">
                    <div className="InnerDiv">
                        <h1>{mainTitleAndContent[0][0]}</h1>
                        <p>{mainTitleAndContent[0][1]}</p>
                        <button type="button" id="update" onClick={() => {goToRight2(1, 'U', '');}}>수정</button>
                        <button type="button" id="read" onClick={() => {goToRight2(1, 'R', mainTitleAndContent[0][0]);}}>세부 내용 보기</button> 
                        <button type="button" id="create" onClick={() => {goToRight2(1, 'C', mainTitleAndContent[0][0]);}}>세부 내용 추가</button> 
                    </div>
                    <div className="innerDiv">
                        <h1>{mainTitleAndContent[1][0]}</h1>
                        <p>{mainTitleAndContent[1][1]}</p>
                        <button type="button" id="update" onClick={() => {goToRight2(2, 'U');}}>수정</button>
                        <button type="button" id="read" onClick={() => {goToRight2(1, 'R', mainTitleAndContent[1][0]);}}>세부 내용 보기</button>
                        <button type="button" id="create" onClick={() => {goToRight2(1, 'C', mainTitleAndContent[1][0]);}}>세부 내용 추가</button>   
                    </div>
                </div>
            </div>
            
            <div style={cssBook2}>
                <div className="mainSecond mainPage2">
                    <div className="innerDiv">
                        <h1>{mainTitleAndContent[2][0]}</h1>
                        <p>{mainTitleAndContent[2][1]}</p>
                        <button type="button" id="update" onClick={() => {goToRight2(3, 'U');}}>수정</button>
                        <button type="button" id="read" onClick={() => {goToRight2(1, 'R',  mainTitleAndContent[2][0]);}}>세부 내용 보기</button>
                        <button type="button" id="create" onClick={() => {goToRight2(1, 'C',  mainTitleAndContent[2][0]);}}>세부 내용 추가</button> 
                    </div>
                    <div className="innerDiv">
                        <h1>{mainTitleAndContent[3][0]}</h1>
                        <p>{mainTitleAndContent[3][1]}</p> 
                        <button type="button" id="update" onClick={() => {goToRight2(4, 'U');}}>수정</button>
                        <button type="button" id="read" onClick={() => {goToRight2(1, 'R', mainTitleAndContent[3][0]);}}>세부 내용 보기</button>
                        <button type="button" id="create" onClick={() => {goToRight2(1, 'C', mainTitleAndContent[3][0]);}}>세부 내용 추가</button> 
                    </div>
                </div>
                <div className="mainSecond mainPage3">

                </div>
            </div>

            <div style={cssLastPage}>

            </div>
        </>
    );
};

export default JazzMainMenu;
