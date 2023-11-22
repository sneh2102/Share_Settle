import { Box, FormControlLabel, FormGroup, Grid, Switch, Typography } from "@mui/material"
import { Line } from "react-chartjs-2";
import 'chart.js/auto'
import useResponsive from "../../Hooks/useResposnsive";
import { useEffect, useState } from "react";
import { useExpenseAnalytics } from '../../Hooks/useExpenseAnalytics';


export const CalenderExpenseGraph = () => {

   const monthNamesMMM = ["JAN", "FRB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

    const {dailyExpense,monthlyExpense}=useExpenseAnalytics()
    const mdUp = useResponsive('up', 'md');
    const [montlyView, setMonthlyView] = useState(false)
    const [loading, setLoading] = useState(true)
    const user = JSON.parse(window.localStorage.getItem("user"))
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userMonthlyExp, setUserMonthlyExp] = useState()
    const [userDailyExp, setUserDailyExp] = useState()

    const toggleMonthlyView = () => {
        setMonthlyView(!montlyView)
    }

    function getMonthMMM(expDate) {
        const date = new Date(expDate)
        return monthNamesMMM[date.getMonth()];
      }

    const data = {
        labels: montlyView? userDailyExp?.map(daily => (monthNamesMMM[daily._id.month-1] + '-' + daily._id.date)):userMonthlyExp?.map(monthly => ( monthNamesMMM[monthly._id.month-1])),
        datasets: [
            {
                label:  montlyView? "Daily expense" : "Monthly expense",
                data: montlyView? userDailyExp?.map(daily => (daily.amount)):userMonthlyExp?.map(monthly => (monthly.amount)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true
            }
        ]
    }

    const options = {
        tension: 0.4,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: montlyView? "Daily expense graph" : "Monthly expense graph",
                font: { size: 18 },
                padding: 19,
                position: 'bottom'
            },
            datalabels: {
                display: 'true',
                formatter: (value) => {
                    return value + '%';
                }
            },
            legend: {
                display: false,
            },
        }
    };

    useEffect(() => {
    const getUserDetails = async() => {
       
      
        const response_group_monthly = await monthlyExpense(user.email)
        setUserMonthlyExp(response_group_monthly.data)
        const response_group_daily = await dailyExpense(user.email)
        setUserDailyExp(response_group_daily.data)
        console.log(userMonthlyExp);
        console.log(userDailyExp);
        

    }   
    getUserDetails();
        

    }, [])
    return (
        <>
        <Box sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 5,
            ...(mdUp && {p:5}),
            ...(!mdUp && {p:1})
        }}
        >
            <Typography variant="h6">
                Expense Graph - {montlyView? "Daily View" : "Monthly View"}
            </Typography>
            
            <Box height={350} my={2}>
                <Line data={data} options={options} />
            </Box>
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked onClick={toggleMonthlyView} />} label="Monthly expense view" />
            </FormGroup>

        </Box>
        </>
    )
}
export default CalenderExpenseGraph
