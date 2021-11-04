import React, { useState, useEffect } from 'react';
import './JazzRecurPage.css';
import axios from 'axios';

const book1Design = {
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

const book2Design = {
    zIndex: "1",
    position: "absolute",
    left: "50%",
    width: "40%",
    height: "100%",
    transform: "rotateY(0deg)",
    transition: "1s",
    transformStyle: "preserve-3d",
    transformOrigin: "left",
}

const JazzRecurPage = ({ match }) => {
    const [cssBook1, setCssBook1] = useState(book1Design);
    const [cssBook2, setCssBook2] = useState(book2Design);
    const [recurTitleAndContent, setRecurTitleAndContent] = useState(
        [['내용 없음', '내용 없음'],
         ['내용 없음', '내용 없음'], 
         ['내용 없음', '내용 없음'], 
         ['내용 없음', '내용 없음']]
    );
    const [nextNum, setNextNum] = useState(-1);
    const [previousNum, setPreviousNum] = useState(-1);
    const [idList, setIdList] = useState([]);

    useEffect(() => {
        renderData();
    }, [])
    
    // 처음 웹 페이지를 렌더링 할 때 API 서버로부터 데이터들을 받음
    const renderData = () => {
        var axios = require('axios');

        var config = {
        method: 'get',
        url: `https://127.0.0.1:8000/${match.params.db}/?page=${match.params.id}`,
        headers: { }
        };

        axios(config)
        .then(function (response) {
            const urlNext = response.data.next
            const urlPrevious = response.data.previous
            // 이후 페이지가 존재하는지 확인하여 존재하면 이후페이지의 페이지 수를 추출
            if(urlNext != null){
                setNextNum(urlNext.substring( urlNext.indexOf('=')+1, urlNext.length ));
            }
            // 이전 페이지가 1페이지 인지 확인
            if(urlPrevious != null && urlPrevious.indexOf('=') === -1){
                setPreviousNum(1);
            }
            // 이전 페이지가 존재하는지 확인하여 존재하면 이전페이지의 페이지 수를 추출
            else if(urlPrevious != null){
                setPreviousNum(urlPrevious.substring( urlPrevious.indexOf('=')+1, urlPrevious.length ));
            }
            // 각 데이터의 id값을 배열에 저장
            setIdList(response.data.results);

            // API서버로부터 받은 데이터들을 배열에 저장
            for(let i=0; i<response.data.results.length; i++){
                recurTitleAndContent[i][0] = response.data.results[i].title
                recurTitleAndContent[i][1] = response.data.results[i].content
            }
            setRecurTitleAndContent(recurTitleAndContent.concat());
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    
    // 이전 페이지로 돌아가는 함수
    const goToLeft = () => {
        if(previousNum === -1){
            alert('맨 처음 페이지 입니다, 표지로 돌아갑니다.');
            setCssBook1({...cssBook1, zIndex: "2", animation:  "turnToRecurLeft 1.5s forwards"});
            setTimeout(function() {
                window.open(`/JazzInter`, '_self');
            }, 1500);
        } 
        else{
            setCssBook1({...cssBook1, zIndex: "2", animation:  "turnToRecurLeft 1.5s forwards"});
            setTimeout(function() {
                window.open(`/JazzRecur/${previousNum}/${match.params.db}`, '_self');
            }, 1500);
        }
    }

    // 이후 페이지로 가는 함수
    const goToRight = () => {
        if(nextNum === -1){
            alert('마지막 페이지 입니다.')
        } 
        else{
            setCssBook2({...cssBook2, zIndex: "2", animation:  "turnToRecurRight 1.5s forwards"});
            setTimeout(function() {
                window.open(`/JazzRecur/${nextNum}/${match.params.db}`, '_self');
            }, 1500);
        }
    }

    // 수정 페이지로 가는 함수
    const goToModify = (n) => {
        try {
            const dataId = idList[n].id
            setCssBook2({...cssBook2, zIndex: "2", animation:  "turnToRecurRight 1.5s forwards"});
            setTimeout(function() {
                window.open(`/JazzModifyRecur/${dataId}/${match.params.id}/${match.params.db}`, '_self');
            }, 1500);
        } catch(e) {
            alert('데이터가 없습니다.')
        }
    }

    // 데이터 삭제를 위한 함수
    const goToDelete = (n) => {
        try {
            // 받아놓은 데이터의 pk값을 이용하여 없을경우 에러를 발생시켜 '데이터가 없습니다'를 사용자에게 출력
            var axios = require('axios');
            const dataId = idList[n].id;

            // id와 password를 받아 base64로 encoding하여 인증정보와 함께 삭제 요청을 보냄
            var id = prompt('아이디를 입력하세요');
            var password = prompt('비밀번호를 입력하세요');
            var authStr = btoa(`${id}:${password}`);

            var config = {
                method: 'delete',
                url: `https://127.0.0.1:8000/${match.params.db}/${dataId}/`,
                headers: {
                    'Authorization': `Basic ${authStr}`,
                }
            };

            axios(config)
            .then(function (response) {
                let errorcheck = response.data.title
                alert('삭제가 완료되었습니다.');
                window.open(`/JazzRecur/${match.params.id}/${match.params.db}`, '_self');
            })
            .catch(function (error) {
                alert('계정이 일치하지 않습니다.');
            });
        } catch(e) {
            alert('데이터가 없습니다.')
        }
    }

    return (
        <>  
            <div className="recurZeroPage">

            </div>

            <div style={cssBook1}>
                <div className="recurFirst recurPage0">

                </div>
                <div className="recurFirst recurPage1">
                    <div id="recurPage1Up">
                        <h1>{recurTitleAndContent[0][0]}</h1>
                        <p>{recurTitleAndContent[0][1]}</p>
                        <button type="button" id="recurModify" onClick={() => {goToModify(0);}}>수정</button>
                        <button type="button" id="recurDelete" onClick={() => {goToDelete(0);}}>삭제</button>
                    </div>
                    <div id="recurPage1Down">
                        <h1>{recurTitleAndContent[1][0]}</h1>
                        <p>{recurTitleAndContent[1][1]}</p>
                        <button type="button" id="recurModify" onClick={() => {goToModify(1);}}>수정</button> 
                        <button type="button" id="recurDelete" onClick={() => {goToDelete(1);}}>삭제</button>
                        <button type="button" id="previousPage" onClick={goToLeft}>이전 페이지로</button>
                    </div>
                </div>
            </div>
            
            <div style={cssBook2}>
                <div className="recurSecond recurPage2">
                    <div id="recurPage2Up">
                        <h1>{recurTitleAndContent[2][0]}</h1>
                        <p>{recurTitleAndContent[2][1]}</p>
                        <button type="button" id="recurModify" onClick={() => {goToModify(2);}}>수정</button> 
                        <button type="button" id="recurDelete" onClick={() => {goToDelete(2);}}>삭제</button>
                    </div>
                    <div id="recurPage2Down">
                        <h1>{recurTitleAndContent[3][0]}</h1>
                        <p>{recurTitleAndContent[3][1]}</p>
                        <button type="button" id="recurModify" onClick={() => {goToModify(3);}}>수정</button> 
                        <button type="button" id="recurDelete" onClick={() => {goToDelete(3);}}>삭제</button>
                        <button type="button" id="nextPage" onClick={goToRight}>다음 페이지로</button>
                    </div>
                </div>
                <div className="recurSecond recurPage3">

                </div>
            </div>

            <div className="recurLastPage">

            </div>
        </>
    )
}

export default JazzRecurPage
