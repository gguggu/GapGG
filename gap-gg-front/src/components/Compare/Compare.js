import React from 'react';
import PropTypes from 'prop-types';
import './Compare.scss';

const Compare = () => {
  return (
    <div className="Compare">
      <div className="Compare-inputs">
        <input className="Compare-inputs-input" placeholder="비교할 사용자명"/>
        <input className="Compare-inputs-input" placeholder="비교할 사용자명"/>
      </div>
      <div className="Compare-contents">
        <div className="Compare-contents-leftCtt">
          <div className="Compare-contents-leftCtt-box">
            <div className="Compare-contents-leftCtt-box-title">
              KDA
            </div>
            <div className="Compare-contents-leftCtt-box-boxContent">
              <div className="Compare-contents-leftCtt-box-boxContent-lefter">
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-score">
                  3.2
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-name">
                  Mosin
                </div>
              </div>
              <div className="Compare-contents-leftCtt-box-boxContent-righter">
                <div className="Compare-contents-leftCtt-box-boxContent-righter-score">
                  1.2
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-righter-name">
                  hide on bush
                </div>
              </div>
            </div>
          </div>

          <div className="Compare-contents-leftCtt-box">
            <div className="Compare-contents-leftCtt-box-title">
              전체승률
            </div>
            <div className="Compare-contents-leftCtt-box-boxContent">
              <div className="Compare-contents-leftCtt-box-boxContent-lefter">
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-score">
                  74%
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-name">
                  Mosin
                </div>
              </div>
              <div className="Compare-contents-leftCtt-box-boxContent-righter">
                <div className="Compare-contents-leftCtt-box-boxContent-righter-score">
                  54%
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-righter-name">
                  hide on bush
                </div>
              </div>
            </div>
          </div>

          <div className="Compare-contents-leftCtt-box">
            <div className="Compare-contents-leftCtt-box-title">
              분당 데미지
            </div>
            <div className="Compare-contents-leftCtt-box-boxContent">
              <div className="Compare-contents-leftCtt-box-boxContent-lefter">
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-score">
                  52
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-name">
                  Mosin
                </div>
              </div>
              <div className="Compare-contents-leftCtt-box-boxContent-righter">
                <div className="Compare-contents-leftCtt-box-boxContent-righter-score">
                  37
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-righter-name">
                  hide on bush
                </div>
              </div>
            </div>
          </div>

          <div className="Compare-contents-leftCtt-box">
            <div className="Compare-contents-leftCtt-box-title">
              평균 CS 개수
            </div>
            <div className="Compare-contents-leftCtt-box-boxContent">
              <div className="Compare-contents-leftCtt-box-boxContent-lefter">
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-score">
                  185.2개
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-name">
                  Mosin
                </div>
              </div>
              <div className="Compare-contents-leftCtt-box-boxContent-righter">
                <div className="Compare-contents-leftCtt-box-boxContent-righter-score">
                  221.5개
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-righter-name">
                  hide on bush
                </div>
              </div>
            </div>
          </div>

          <div className="Compare-contents-leftCtt-box">
            <div className="Compare-contents-leftCtt-box-title">
              죽음당 받은 피해량
            </div>
            <div className="Compare-contents-leftCtt-box-boxContent">
              <div className="Compare-contents-leftCtt-box-boxContent-lefter">
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-score">
                  50
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-lefter-name">
                  Mosin
                </div>
              </div>
              <div className="Compare-contents-leftCtt-box-boxContent-righter">
                <div className="Compare-contents-leftCtt-box-boxContent-righter-score">
                  30
                </div>
                <div className="Compare-contents-leftCtt-box-boxContent-righter-name">
                  hide on bush
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Compare-contents-rightCtt">
          <div className="Compare-contents-rightCtt-box">
            <div className="Compare-contents-rightCtt-box-title">
              각 포지션 선택률
            </div>
            <div className="Compare-contents-rightCtt-box-boxContent">
              <div className="Compare-contents-rightCtt-box-boxContent-lefter">
                <div className="Compare-contents-rightCtt-box-boxContent-lefter-score">
                  <div className="Compare-contents-rightCtt-box-boxContent-lefter-score-position">
                    <img src="https://w.namu.la/s/b151ed5a28ee76f5155075d591fd6fda9d3a20f33ce96b493054af61e4655310cf18353afb0b85755501cc130c0b38a3844baaad9fff71ec3e20ff542e5a0641139361c3d1b009e09f894d947018450473c307b781cc85a299a9ec46ae6fda55" alt="SP"/>
                    80%
                  </div>
                  <div className="Compare-contents-rightCtt-box-boxContent-lefter-score-position">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACICAMAAAALZFNgAAAAKlBMVEX////Iqm6ag17k1bfNwq/5+PbQxrXUyrq/sZm8rZXPxLLVzLy/sZr9/Pwosw9dAAABr0lEQVR4nO3aS26DUBBEURI7iZ3P/rebOY78uqtuPWXQdw4cCcSA4jimaZqmaZr+Wa9+19MpLy9/tAFScmyAfJYceUjREYdUHWlI2RGGvJcdWUjDEYV0HElIyxGE9Bw5yEfPEYN0HSlI2xGCfLUdGYjg6EOWBzxWceyAlBwbIDVHHlJ0xCFVxyUM4RweBHRYENLhQFCHAWEdOgR2yBDaoUJwhwjhHRok4JAgCYcCiTgESMbRh4QcbUjK0YWojm8Yojpu61vegugOFmI4UIjjICGq4157LZQhnoODmA4M4jooiO2AIL6DgQAOBEI4CAjiACCMw4dAjjaktoutHW+FZ+8ZhHK4kPoOtHCYEM7hQUCHBSEdDqS5vzx3GBDWoUNghwyhHSoEd4iQ/h61chw/CiTgEL4yhBwCRNnF1o4+JOTYtgMtv8OYkNmBYo7ZgUDI7EBZx+xADGR2oA2O2YF8SMiRgrQdIUjfkYEIjgjk7LieL1IJgCAOAMI4fAjksCGUw4VgDhPCOTwI6LAgpMOBoA4Dwjp0COyQIbRDheAOEcI7NEjAofzmPk3TNE3TFO0XzyksGgXs+dAAAAAASUVORK5CYII=" alt="Mid"/>
                    20%
                  </div>
                </div>
                <div className="Compare-contents-rightCtt-box-boxContent-lefter-name">
                  Mosin
                </div>
              </div>
              <div className="Compare-contents-rightCtt-box-boxContent-righter">
              <div className="Compare-contents-rightCtt-box-boxContent-righter-score">
                  <div className="Compare-contents-rightCtt-box-boxContent-righter-score-position">
                    <img src="https://w.namu.la/s/b151ed5a28ee76f5155075d591fd6fda9d3a20f33ce96b493054af61e4655310cf18353afb0b85755501cc130c0b38a3844baaad9fff71ec3e20ff542e5a0641139361c3d1b009e09f894d947018450473c307b781cc85a299a9ec46ae6fda55" alt="SP"/>
                    80%
                  </div>
                  <div className="Compare-contents-rightCtt-box-boxContent-righter-score-position">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACICAMAAAALZFNgAAAAKlBMVEX////Iqm6ag17k1bfNwq/5+PbQxrXUyrq/sZm8rZXPxLLVzLy/sZr9/Pwosw9dAAABr0lEQVR4nO3aS26DUBBEURI7iZ3P/rebOY78uqtuPWXQdw4cCcSA4jimaZqmaZr+Wa9+19MpLy9/tAFScmyAfJYceUjREYdUHWlI2RGGvJcdWUjDEYV0HElIyxGE9Bw5yEfPEYN0HSlI2xGCfLUdGYjg6EOWBzxWceyAlBwbIDVHHlJ0xCFVxyUM4RweBHRYENLhQFCHAWEdOgR2yBDaoUJwhwjhHRok4JAgCYcCiTgESMbRh4QcbUjK0YWojm8Yojpu61vegugOFmI4UIjjICGq4157LZQhnoODmA4M4jooiO2AIL6DgQAOBEI4CAjiACCMw4dAjjaktoutHW+FZ+8ZhHK4kPoOtHCYEM7hQUCHBSEdDqS5vzx3GBDWoUNghwyhHSoEd4iQ/h61chw/CiTgEL4yhBwCRNnF1o4+JOTYtgMtv8OYkNmBYo7ZgUDI7EBZx+xADGR2oA2O2YF8SMiRgrQdIUjfkYEIjgjk7LieL1IJgCAOAMI4fAjksCGUw4VgDhPCOTwI6LAgpMOBoA4Dwjp0COyQIbRDheAOEcI7NEjAofzmPk3TNE3TFO0XzyksGgXs+dAAAAAASUVORK5CYII=" alt="Mid"/>
                    20%
                  </div>
                </div>
                <div className="Compare-contents-rightCtt-box-boxContent-righter-name">
                  hide on bush
                </div>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Compare.propTypes = {
  
};

export default Compare;