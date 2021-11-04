import React, { useState } from 'react'
import './JazzCreateRecurPage.css';

const recurCreateFirstPage = {
    zIndex: "1",
    position: "absolute",
    left: "10%",
    width: "40%",
    height: "100%",
    transform: "rotateY(0deg)",
    transition: "1s",
    transformStyle: "preserve-3d",
    transformOrigin: "right",
}

const JazzModifyCreateRecurPage = ({ match }) => {

    const [cssBook1, setCssBook1] = useState(recurCreateFirstPage)
    const [recurCreateTitleAndContent, setRecurCreateTitleAndContent] = useState(
        [['내용 없음', '내용 없음'], 
        ['내용을 추가해 주세요', '내용을 추가해 주세요']]
    )
    
    // 만들어진 데이터가 출력되는 웹 페이지로 돌아가는 함수
    const goToLeft = () => {
        setCssBook1({...cssBook1, zIndex: "2", animation: "turnToRecurCreateRight 1.5s forwards"});
        setTimeout(function() {
            window.open(`/JazzRecur/1/${match.params.db}`, '_self');
        }, 1500);
    }

    // 타이틀의 내용이 바뀔때마다 그 내용을 저장하여 다시 렌더링 하는 함수
    const changeTitle = (e) => {
        const { value } = e.target;
        recurCreateTitleAndContent[1][0] = value;
        setRecurCreateTitleAndContent(recurCreateTitleAndContent.concat());
    }

    // 본문의 내용이 바뀔때마다 그 내용을 저장하여 다시 렌더링 하는 함수
    const changeContent = (e) => {
        const { value } = e.target;
        recurCreateTitleAndContent[1][1] = value;
        setRecurCreateTitleAndContent(recurCreateTitleAndContent.concat());
    }

    // API를 통해 추가 요청을 보내는 함수
    const reqUpdate = () => {
        // id와 password를 받아 base64로 encoding하여 인증정보와 함께 데이터 추가 요청을 보냄 
        var id = prompt('아이디를 입력하세요');
        var password = prompt('비밀번호를 입력하세요');
        var authStr = btoa(`${id}:${password}`)

        var axios = require('axios');
        var data = {
            "title": `${recurCreateTitleAndContent[1][0]}`,
            "content": `${recurCreateTitleAndContent[1][1]}`
        };

        var config = {
            method: 'post',
            url: `https://127.0.0.1:8000/${match.params.db}/`,
            headers: { 
                'Authorization': `Basic ${authStr}`,
                'Content-Type': 'application/json'
            },
            data : data
        };

        // 데이터 추가 요청 후 온 추가된 데이터를 사용자에게 출력
        axios(config)
        .then(function (response) {
            for(let i=0; i<2; i++){
                recurCreateTitleAndContent[i][0] = response.data.title;
                recurCreateTitleAndContent[i][1] = response.data.content;
            }
            setRecurCreateTitleAndContent(recurCreateTitleAndContent.concat());
        })
        .catch(function (error) {
            alert('계정이 일치하지 않습니다.')
        });
    }

    return (
        <>
            <div className="recurCreateZeroPage">

            </div>

            <div style={cssBook1}>
                <div className="recurCreateFirst recurCreatePage0">

                </div>
                <div className="recurCreateFirst recurCreatePage1">
                    <h1>{recurCreateTitleAndContent[0][0]}</h1>
                    <p>{recurCreateTitleAndContent[0][1]}</p>
                    <button type="button" id="cover" onClick={goToLeft}>세부 페이지로</button>
                </div>
            </div>

            <div className="recurCreateSecondPage">
                <div className="recurCreateSecond recurCreatePage2">
                    <textarea id="modifyTitle" name="story" rows="100" cols="1" value={recurCreateTitleAndContent[1][0]} onChange={changeTitle}></textarea>
                    <textarea id="modifyStory" name="story" rows="100" cols="100" value={recurCreateTitleAndContent[1][1]} onChange={changeContent}></textarea>
                    <button type="button" id="update" onClick={reqUpdate}>추가</button>
                </div>
                <div className="recurCreateSecond recurCreatePage3">

                </div>
            </div>

            <div className="recurCreateLastPage">

            </div>
        </>
    )
}

export default JazzModifyCreateRecurPage