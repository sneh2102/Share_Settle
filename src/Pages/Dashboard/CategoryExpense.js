import { Box, Grid } from "@mui/material"
import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useExpenseAnalytics} from '../../Hooks/useExpenseAnalytics'
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto'

export const CategoryExpense = () => {

    const params = useParams();

    const [categoryExp, setCategoryExp] = useState()
    const user = JSON.parse(localStorage.getItem("user"))
    const {categoryExpense}=useExpenseAnalytics()
    const data = {
        labels: categoryExp?.map(category => (category._id)),
        datasets: [
            {
                label: 'Category Expenses',
                data: categoryExp?.map(category => (category.amount)),
                fill: true,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderWidth: 1,
                //borderColor: ["red", "green", "Blue", "Yellow", "Orange", "Violet"]
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {   
            datalabels: {
                display:false,
                formatter: "CAD"
              },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 10
                },
            },
        }
    };


    useEffect(() => {
        const getGroupCategoryExpense = async () => {
            
            const category_exp =
                await categoryExpense(user.email)
            setCategoryExp(category_exp.data)
            console.log(categoryExp);
            
        }
        getGroupCategoryExpense()

    }, [])

    return (
        <>
        <Box sx={{
            p: 5,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 5
        }}>
              <Typography variant="h6" mb={2}>
                Category Expense Chart
            </Typography>
                    <Box height={500}>
                    <Doughnut data={data} options={options} plugins={[ChartDataLabels]}/>
                    </Box>                   
        </Box>
        </>
    )
}
export default CategoryExpense;;
