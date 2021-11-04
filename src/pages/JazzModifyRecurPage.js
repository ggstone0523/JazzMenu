import React, { useState, useEffect } from 'react'
import './JazzModifyRecurPage.css';

const recurModifyFirstPage = {
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

const JazzModifyRecurPage = ({ match }) => {

    const [cssBook1, setCssBook1] = useState(recurModifyFirstPage)
    const [recurModifyTitleAndContent, setRecurModifyTitleAndContent] = useState(
        [['내용 없음', '내용 없음'], 
        ['내용을 추가해 주세요', '내용을 추가해 주세요']]
    )
    
    // 이 페이지가 처음 렌더링 될 때 API 서버로부터 데이터를 가져와 사용자에게 출력하는 함수
    useEffect(() => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: `https://127.0.0.1:8000/${match.params.db}/${match.params.id}/`,
        headers: { }
        };

        axios(config)
        .then(function (response) {
            for(let i=0; i<2; i++){
                recurModifyTitleAndContent[i][0] = response.data.title;
                recurModifyTitleAndContent[i][1] = response.data.content;
            }
            setRecurModifyTitleAndContent(recurModifyTitleAndContent.concat());
        })
        .catch(function (error) {
            console.log(error);
        });

    }, [])

    // 수정하고자 하는 데이터가 출력되는 웹 페이지로 돌아가는 함수
    const goToLeft = () => {
        setCssBook1({...cssBook1, zIndex: "2", animation: "turnToRecurCreateRight 1.5s forwards"});
        setTimeout(function() {
            window.open(`/JazzRecur/${match.params.page}/${match.params.db}`, '_self');
        }, 1500);
    }

    // 타이틀의 내용이 바뀔때마다 그 내용을 저장하여 다시 렌더링 하는 함수
    const changeTitle = (e) => {
        const { value } = e.target;
        recurModifyTitleAndContent[1][0] = value;
        setRecurModifyTitleAndContent(recurModifyTitleAndContent.concat());
    }

    // 본문의 내용이 바뀔때마다 그 내용을 저장하여 다시 렌더링 하는 함수
    const changeContent = (e) => {
        const { value } = e.target;
        recurModifyTitleAndContent[1][1] = value;
        setRecurModifyTitleAndContent(recurModifyTitleAndContent.concat());
    }

    // API를 통해 수정 요청을 보내는 함수
    const reqUpdate = () => {
        // id와 password를 받아 base64로 encoding하여 인증정보와 함께 데이터 수정 요청을 보냄        
        var id = prompt('아이디를 입력하세요');
        var password = prompt('비밀번호를 입력하세요');
        var authStr = btoa(`${id}:${password}`)

        var axios = require('axios');
        var data = {
            "title": `${recurModifyTitleAndContent[1][0]}`,
            "content": `${recurModifyTitleAndContent[1][1]}`
        };

        var config = {
            method: 'put',
            url: `https://127.0.0.1:8000/${match.params.db}/${match.params.id}/`,
            headers: {
                'Authorization': `Basic ${authStr}`,
                'Content-Type': 'application/json',
            },
            data : data
        };

        // 데이터 수정 요청 후 온 수정된 데이터를 사용자에게 출력
        axios(config)
        .then(function (response) {
            for(let i=0; i<2; i++){
                recurModifyTitleAndContent[i][0] = response.data.title;
                recurModifyTitleAndContent[i][1] = response.data.content;
            }
            setRecurModifyTitleAndContent(recurModifyTitleAndContent.concat());
        })
        .catch(function (error) {
            alert('계정이 일치하지 않습니다.')
        });
    }

    return (
        <>
            <div className="recurModifyZeroPage">

            </div>

            <div style={cssBook1}>
                <div className="recurModifyFirst recurModifyPage0">

                </div>
                <div className="recurModifyFirst recurModifyPage1">
                    <h1>{recurModifyTitleAndContent[0][0]}</h1>
                    <p>{recurModifyTitleAndContent[0][1]}</p>
                    <button type="button" id="cover" onClick={goToLeft}>원래 페이지로</button>
                </div>
            </div>

            <div className="recurModifySecondPage">
                <div className="recurModifySecond recurModifyPage2">
                    <textarea id="modifyTitle" name="story" rows="100" cols="1" value={recurModifyTitleAndContent[1][0]} onChange={changeTitle}></textarea>
                    <textarea id="modifyStory" name="story" rows="100" cols="100" value={recurModifyTitleAndContent[1][1]} onChange={changeContent}></textarea>
                    <button type="button" id="update" onClick={reqUpdate}>수정</button>
                </div>
                <div className="recurModifySecond recurModifyPage3">

                </div>
            </div>

            <div className="recurModifyLastPage">

            </div>
        </>
    )
}

export default JazzModifyRecurPage
