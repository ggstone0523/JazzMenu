import React, { useState, useEffect } from 'react';
import './JazzModifyPage.css';
import usaFlag from './usaFlag.png';
import axios from 'axios';

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

const JazzModifyPage = ({ match }) => {
    const [cssFirstPage, setCssFirstPage] = useState(firstPageDesign);
    const [cssLastPage, setCssLastPage] = useState(lastPageDesign);
    const [modifyTitleAndContent, setModifyTitleAndContent] = useState(
        [['내용 없음', '내용 없음'], 
        ['내용을 추가해 주세요', '내용을 추가해 주세요']]
    )

    // 이 페이지가 처음 렌더링 될 때 API 서버로부터 데이터를 가져와 사용자에게 출력하는 함수
    useEffect(() => {
        var axios = require('axios');

        var config = {
        method: 'get',
        url: `https://127.0.0.1:8000/${match.params.page}/${match.params.id}/`,
        headers: { }
        };

        axios(config)
        .then(function (response) {
            for(let i=0; i<2; i++){
                modifyTitleAndContent[i][0] = response.data.title;
                modifyTitleAndContent[i][1] = response.data.content;
            }
            setModifyTitleAndContent(modifyTitleAndContent.concat());
        })
        .catch(function (error) {
            console.log(error);
        });

    }, [])

    // 맨 처음 표지로 돌아가는 함수
    const goToLeft = () => {
        setCssFirstPage({...cssFirstPage, animation: "turnToLeft 1.5s forwards"});
        setTimeout(function() {
            setCssLastPage({...cssLastPage, display: "none"});
            setCssFirstPage({...cssFirstPage, transform: "rotateY(180deg)", animation: "goToLeftAni 1.5s forwards"});
        }, 1500);
        setTimeout(function() {
            window.open('/', '_self');
        }, 3500);
    };

    // 본문의 내용이 바뀔때마다 그 내용을 저장하여 다시 렌더링 하는 함수
    const changeContent = (e) => {
        const { value } = e.target;
        modifyTitleAndContent[1][1] = value;
        setModifyTitleAndContent(modifyTitleAndContent.concat());
    }

    // API를 통해 수정요청을 보내는 함수
    const reqUpdate = () => {
        // id와 password를 받아 base64로 encoding하여 인증정보와 함께 데이터 수정 요청을 보냄  
        var id = prompt('아이디를 입력하세요');
        var password = prompt('비밀번호를 입력하세요');
        var authStr = btoa(`${id}:${password}`)

        var axios = require('axios');
        var data = {
            "title": `${modifyTitleAndContent[1][0]}`,
            "content": `${modifyTitleAndContent[1][1]}`
        };

        var config = {
            method: 'put',
            url: `https://127.0.0.1:8000/${match.params.page}/${match.params.id}/`,
            headers: { 
                'Authorization': `Basic ${authStr}`,
                'Content-Type': 'application/json'
            },
            data : data
        };

        // 데이터 수정 요청 후 온 수정된 데이터를 사용자에게 출력
        axios(config)
        .then(function (response) {
            for(let i=0; i<2; i++){
                modifyTitleAndContent[i][1] = response.data.content;
            }
            setModifyTitleAndContent(modifyTitleAndContent.concat());
        })
        .catch(function (error) {
            alert('계정이 일치하지 않습니다.')
        });
    }

    return (
        <>
            <div style={cssFirstPage}>
                <div className="modifyFirst modifyCover">
                    <img src={usaFlag} alt="usaFlag"></img>
                    <h1>America Jazz</h1>
                </div>
                <div className="modifyFirst modifyPage1">
                    <div className="innerDiv">
                        <h1>{modifyTitleAndContent[0][0]}</h1>
                        <p>{modifyTitleAndContent[0][1]}</p>
                        <button type="button" id="cover" onClick={goToLeft}>표지로</button>
                    </div>
                </div>
            </div>
            
            <div style={cssLastPage} className="modifyLastPage">
                <h1 id="modifyTitle">{modifyTitleAndContent[1][0]}</h1>
                <textarea id="modifyStory" name="story" rows="100" cols="100" value={modifyTitleAndContent[1][1]} onChange={changeContent}></textarea>
                <button type="button" id="update" onClick={reqUpdate}>수정</button>
            </div>
        </>
    );
};

export default JazzModifyPage
