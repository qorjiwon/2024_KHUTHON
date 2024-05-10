import React from 'react';
import './Score.scss';

const Sidebar = ({pollution}: {pollution: [name: string, num: number][]}) => {
    return (
        <div className="PollutionTypes">
            { pollution.map(([name, score]) => {
                return (
                    <div key={name} className="PollutionType">
                        <div className="PollutionTypeName">{name}</div>
                        <div className="PollutionTypeScore">{score}</div> {/* 대기 점수 칸 */}
                    </div>
                )
            })}
        </div>
    );
};

export default Sidebar;
