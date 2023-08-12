import React from "react";
import { Row, Col } from "react-bootstrap";
import MainProgress from "./MainProgress";
import CountdownTimer from "../Clock/TimerCounter";
import { useCampaignContext } from "../../context/CampaignContext";

function ProgressAndClock() {

    const { campaigns } = useCampaignContext();
    
    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date()

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

    return (
        <>
            <Row className=''>

                <Col md="12" lg={6} className='text-center border-bottom mt-5' style={{ paddingBottom: '50px' }}>
                    <CountdownTimer targetDate={dateTimeAfterThreeDays} />
                    {/* <button onClick={()=>console.log(campaigns)}>test</button> */}
                </Col>
                <Col md="12" lg={6} className='border-start border-light-subtle text-center border-bottom mt-5'
                    style={{ paddingBottom: '50px' }}
                >
                    <MainProgress percentage={10} />
                </Col>
            </Row>
        </>
    );

}

export default ProgressAndClock;