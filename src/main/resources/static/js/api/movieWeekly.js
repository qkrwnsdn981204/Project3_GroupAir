
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////weekly////////////////////////////////////////////////////////
//주말 박스오피스 순위

function menu4(){ // 테이블 -> 그리드 숨김
boxOfficeFn();
 $('.grid1').css('display', 'none');
}

function menu3(){ // 그리드 -> 테이블 숨김
 $('.grid1').css('display', 'block');
  $('.boxOffice_table').css('display', 'none');
}


function boxOfficeFn() {

    $.ajax({
        url: '/api/boxOffice',
        method: 'GET',
        success: function(response) {


             $('.weekly').css('display', 'block');
             $('#grid1').css('display', 'none');
             $('#grid').css('display', 'none');
             $('.boxOffice_table').css('display', 'block');
             $('.menuBtn').css('display', 'none');
             $('.menuBtn2').css('display', 'flex');
                        console.log("서버 응답:", response);

                        try {
                          const dataString2 = response.toString(); // 데이터를 문자열로 변환
                          console.log("dataString:", dataString2);

                          const items2 = dataString2.split(',');

                          const movieData2 = [];
                          for (let i = 0; i < items2.length; i += 11) {
                            const movie2 = {
                                 rank: items2[i].trim(),
                                 movieCd: items2[i+ 1],
                                 movieNm: items2[i + 2],
                                 rankInten: items2[i + 3],
                                 rankOldAndNew: items2[i + 4],
                                 audiCnt: items2[i + 5],
                                 salesAcc: items2[i + 6],
                                 movieTitle: items2[i + 7],
                                 openDt: items2[i + 8],
                                 releaseDate: items2[i + 9],
                                 posterUrl: items2[i + 10]
                            };
                            movieData2.push(movie2);
                          }

                          console.log("박스오피스 데이터:", movieData2);


                            $('.boxOffice_table').css('display', 'block');
                             movieFnAndDetail();
                            createBoxOfficeTable(movieData2); // 테이블 생성 함수 호출
                        } catch (error) {
                            console.error('데이터 처리 중 오류 발생:', error);
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('AJAX 요청 에러:', status, error);
                    }
                });
            }

function createBoxOfficeTable(movieData2) {

 //목록
    const tableBody1 = $('#movie_table tbody');
    tableBody1.empty(); // 이전 데이터를 지웁니다.


    //주말
    const tableContainer2 = $('#boxOffice_table tbody');
    const gridContainer2 = $('#grid1 .span-on');
    tableContainer2.empty();
    gridContainer2.empty();

    //금일
    const tableContainer = $('#box_movie_table tbody');
    const gridContainer = $('#grid .span-on');
    tableContainer.empty();
    gridContainer.empty();
    $('.movie_table, .box_movie_table').css('display', 'none'); // 테이블 숨기기

     movieData2.forEach(box => {
        const row = `
            <tr>
                <td style="color:yellow";>${box.rank}</td>
                <td class="codeName">${box.movieCd}</td>
                <td class="movieNm-cell" ;>${box.movieNm}</td>
                <td>${box.rankOldAndNew}</td>
                <td>${box.rankInten}</td>
                <td>${box.audiCnt}</td>
                <td>${box.salesAcc}</td>
                <td hidden>${box.posterUrl}</td>
            </tr>
        `;
        tableContainer2.append(row);

            const gridItem2 = `

              <div class="grid-item"  data-moviecd="${box.movieCd}">
                <div class="rank-caption">${box.rank}등</div>
              <img src="${box.posterUrl || 'N/A'}" alt="포스터" class="pos">
              <div class="name-caption">${box.movieNm}</div>
           </div>

            `;
            gridContainer2.append(gridItem2);

    });
}

// 영화 이름 클릭 시 영화 코드를 가져옴
$('#boxOffice_table').on('click', '.movieNm-cell', function() {
    var movieCd = $(this).prev().text(); // 바로 앞에 있는 td의 텍스트를 가져옵니다.
 var posterUrl = $(this).closest('tr').find('td:hidden').text(); // 숨겨진 포스터 URL 가져오기
    movieDetailFn(movieCd, posterUrl);
    // 추가 작업 수행
});

// 영화 포스터 클릭 시 영화 코드를 가져옴 (이벤트 위임 사용)
$(document).on('click', '.grid-item .pos', function() {
    const movieCd = $(this).closest('.grid-item').data('moviecd');
     const posterUrl = $(this).attr('src'); // 포스터 이미지 URL 가져오기
      movieDetailFn(movieCd, posterUrl); // 함수 호출


});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function movieFnAndDetail(){
  $('#boxOffice_table .codeName').each(function() {
    var codeName = $(this).text();
    var posterUrl = $(this).closest('tr').find('td:hidden').text(); // 숨겨진 포스터 URL 가져오기
    movieDetailFn(movieCd, posterUrl);
     });
}

//상세조회 저장시키기
function movieDetailFn2(codeName) {

    let appUrl = `/api/movieListId?movieCd=${codeName}`;
    $.ajax({
        url: appUrl,
        type: "GET",
        dataType: 'json',
        data: { movieCode: codeName },
        success: function(response) {
            const movieDetail = JSON.parse(response.movie);
        },
    });
}

