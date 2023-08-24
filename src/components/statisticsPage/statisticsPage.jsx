import React from 'react'
import './statisticsPage.css'
import CalendarComponent from './statistics/calendar'
import { dataCalendar } from './statistics/mockData' //dataPieChart
// import PieChartComponent from './statistics/pieChart'
const StatisticsPage = () => {

    return (
        <>
            <div>statisticsPage</div>
            <div style={{ margin: "10px 10px 0 10px", }} className="container__component">
                <h3 style={{ padding: "10px" }}>Calendario nuevos ingresos (diarios)</h3>
                <div style={{ height: 200, width: "90%" }} className='center'>
                    <CalendarComponent data={dataCalendar} />
                </div>

            </div>

            <div className="statistics__Container-3">
                <div className="container__component">
                    <div style={{ height: 200, width: "100%" }} className='center'>
                        <h4 style={{ padding: "10px" }}>Votantes registrados por lider</h4>
                        {/* <PieChartComponent data={dataPieChart} /> */}
                    </div>
                </div>
                <div className="container__component">b</div>
                <div className="container__component">c</div>
            </div>

        </>
    )
}

export default StatisticsPage