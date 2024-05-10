import React from 'react';
import './Score.scss';

const Sidebar = () => {
    const pollution = [['대기', 10], ['수질', 20], ['토양', 30]];
    return (
        <div className="Score">
            <div className="TotalScore">오염도 총점</div>
            <div className="ScoreValue">50</div> {/* 오염도 총점 점수 칸 */}
            <div className="PollutionTypes">
                { pollution.map(([pol, score]) => {
                    return (
                        <div className="PollutionType">
                            <div className="PollutionTypeName">{pol}</div>
                            <div className="PollutionTypeScore">{score}</div> {/* 대기 점수 칸 */}
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
};

export default Sidebar;
