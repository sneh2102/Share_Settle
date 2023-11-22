import { Box, Button, Grid, Typography, Container, } from "@mui/material"
import { Link, Link as RouterLink } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import Groups from "../Groups/Groups";
import RecentExpense from './RecentExpense'
import CalenderExpenseGraph from './CalenderExpenseGraph'
import { CategoryExpense } from "./CategoryExpense";
import { useGroup } from "../../Hooks/useGroup";
import { useEffect, useState } from "react";


const Dashboard = () => {
    const icons = ['fa-home', 'fa-user', 'fa-envelope', 'fa-star'];
    const iconBackgroundColors = ['#6691B9', '#BC8AC4', '#FFA07A', '#7CBF7C'];
    function getRandomIcon() {
        const randomIndex = Math.floor(Math.random() * icons.length);
        return icons[randomIndex];
    }

    function getRandomBackgroundColor() {
        const randomIndex = Math.floor(Math.random() * iconBackgroundColors.length);
        return iconBackgroundColors[randomIndex];
    }

    const [group, setGroup] = useState();
    const user = JSON.parse(window.localStorage.getItem('user'))

    const { fetchGroups } = useGroup()
    useEffect(() => {

        const getGroup = async () => {

            var group = await fetchGroups(user.email)
            group = group.slice(0, 6)
            setGroup(group)
        }
        getGroup();
    }, [])
    return (
        <>
            <Navbar />
            <div className="content-wrapper">

            <Container maxWidth={'xl'} >

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Box sx={{
                                    boxShadow: 5,
                                    p: 5,
                                    bgcolor: (theme) => theme.palette['primary'].lighter,
                                    color: (theme) => theme.palette['primary'].darker,
                                    borderRadius: 2
                                }}>
                                    <Grid container spacing={2} justifyContent={'center'}
                                        alignItems={'center'}
                                        >
                                        <Grid container>
                                            <Grid item lg={6} md={6} xs={12}>

                                                <Typography variant="h5" pb={2}>
                                                    Hello there, Welcome back!
                                                </Typography>
                                                <Typography variant="body2" pb={2} >
                                                    Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way.
                                                </Typography>
                                                <Button variant="contained">
                                                    <Link to='/groups' style={{ color: "white", width: "100px", height: "100%" }}> View Groups</Link>
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Grid>


                            <Grid item xs={12}>
                                <Typography variant="h5" pb={2} >
                                                   Current Groups
                                                </Typography>
                                <Grid container spacing={2} style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    {!group ?
                                        <>
                                            <Typography variant="body2" fontSize={18} textAlign={'center'}>
                                                Seems to be new here! Create your first group and add expenses <br />
                                                <Link
                                                    to={'/groups'}>
                                                    Create Group
                                                </Link>
                                            </Typography>
                                        </> : <>{group.map((group, index) => (
                                            <Link to={`/groups/view/${group._id}`} key={group._id}>
                                                <div className="card" style={{ width: "200px" }}>
                                                    <i className={`fa ${getRandomIcon()} custom-icon`}
                                                        style={{ backgroundColor: getRandomBackgroundColor() }}></i>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{group.name}</h5>
                                                        <p className='settlement-period'>Settlement period</p>
                                                    </div>
                                                </div>
                                            </Link>))}</>
                                    }
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <CalenderExpenseGraph />
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <RecentExpense/>
                            </Grid>
                            <Grid item xs={12}>
                                <CategoryExpense />
                            </Grid>
                            <Grid item md={12} xs={0}>
                                {/* <EndMessage /> */}End Message
                            </Grid>
                        </Grid>


                    </Grid>
                </Grid>
            </Container>
        </div>
        </>
    )
}
export default Dashboard
