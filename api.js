// 서버 설정
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.listen(5000);

// 모듈
const fs = require('fs');
const youtubedl = require('youtube-dl');
const ffmpeg = require('fluent-ffmpeg');

// api
app.post('/api/download', (req, res) => {
  console.log('다운로드 요청');

  const { url } = req.body;
  const audio = youtubedl(url, ['--format', 140])
  const video = youtubedl(url, ['--format', 137])
  let title = '';

  video.on('info', (info) => {
    console.log(info.title, ' 다운로드 시작');
    audio.pipe(fs.createWriteStream(info.title + '.mp3'))
    video.pipe(fs.createWriteStream(info.title + 'v.mp4').on('finish', () => {
      console.log('인코딩 시작');
      ffmpeg('./' + info.title + 'v.mp4')
        .input('./' + info.title + '.mp3')
        .on('end', () => {
          console.log('변환 완료');
          fs.unlink('./' + info.title + 'v.mp4', ()=> {})
          fs.unlink('./' + info.title + '.mp3', ()=> {})
        })
        .save('./' + info.title + '.mp4')
    }))
  })
})