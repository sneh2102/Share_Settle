
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import ExpenseCard from '../../Components/ExpenseCard/ExpenseCard'
import { useExpenseAnalytics } from '../../Hooks/useExpenseAnalytics'


 const RecentExpense = () => {

    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const [recentExp, setRecentExp] = useState()
    const {recentExpense}=useExpenseAnalytics()
    const user = JSON.parse(window.localStorage.getItem('user'))
    useEffect(() => {
        const getRecentExp = async () => {
            console.log(user.email);
            const recent_exp = await recentExpense(user.email)
            setRecentExp(recent_exp.expense)
        }
        getRecentExp()


    }, [])

    return (
        <>
        <Box sx={{
            boxShadow: 5,
            bgcolor: 'background.paper',
            borderRadius: 2,
        }}>
            <Typography variant="h6" p={2} >
                Your Recent transactions,
            </Typography>
            {recentExp?.map(myExpense => (

                <ExpenseCard
                    expense={myExpense}
                />
            ))}
        </Box>
        </>
    )
}
export default RecentExpense