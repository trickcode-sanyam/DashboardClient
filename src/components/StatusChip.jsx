import React from 'react';
import { Chip, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const chipColors = {
    ongoing: {
        main: '#30d158', // green
        background: '#5a7664',
    },
    upcoming: {
        main: '#ffd60a', // yellow
        background: '#7d7656',
    },
    completed: {
        main: '#ff410a', // for red text
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    ongoingOutlined: {
        backgroundColor: chipColors.ongoing.background,
    },
    ongoingOutlinedPrimary: {
        color: chipColors.ongoing.main,
        borderColor: chipColors.ongoing.main,
    },
    ongoingAvatar: {
        color: chipColors.ongoing.main,
    },
    completedOutlined: {
        backgroundColor: chipColors.upcoming.background,
    },
    completedOutlinedPrimary: {
        color: chipColors.upcoming.main,
        borderColor: chipColors.upcoming.main,
    },
    completedAvatar: {
        color: chipColors.completed.main,
    },
    upcomingOutlined: {
        backgroundColor: chipColors.upcoming.background,
    },
    upcomingOutlinedPrimary: {
        color: chipColors.upcoming.main,
        borderColor: chipColors.upcoming.main,
    },
    upcomingAvatar: {
        color: chipColors.upcoming.main,
    },
    label: {
        width: '100%',
        display: 'inline-block',
        fontWeight: 800,
    },
    span: {
        width: '103px',
    },
}));

export default function StatusChip({ status }) {
    const classes = useStyles();
    if (status === 'ongoing') {
        return (
            <Chip
                label={
                    <Typography
                        align="center"
                        className={classes.label}
                        variant="button"
                    >
                        {status}
                    </Typography>
                }
                variant="outlined"
                color="primary"
                size="small"
                avatar={
                    <Avatar
                        style={{ backgroundColor: chipColors.ongoing.main }}
                        classes={{ fallback: classes.ongoingAvatar }}
                    />
                }
                classes={{
                    outlined: classes.ongoingOutlined,
                    outlinedPrimary: classes.ongoingOutlinedPrimary,
                    label: classes.span,
                }}
            />
        );
    }
    if (status === 'upcoming' || status === 'idea') {
        return (
            <Chip
                label={
                    <Typography
                        align="center"
                        className={classes.label}
                        variant="button"
                    >
                        {status}
                    </Typography>
                }
                variant="outlined"
                color="primary"
                size="small"
                avatar={
                    <Avatar
                        style={{ backgroundColor: chipColors.upcoming.main }}
                        classes={{ fallback: classes.upcomingAvatar }}
                    />
                }
                classes={{
                    outlined: classes.upcomingOutlined,
                    outlinedPrimary: classes.upcomingOutlinedPrimary,
                    label: classes.span,
                }}
            />
        );
    }
    return (
        <Chip
            label={
                <Typography
                    align="center"
                    className={classes.label}
                    variant="button"
                    style={{ color: chipColors.completed.main }}
                >
                    {status}
                </Typography>
            }
            variant="outlined"
            color="primary"
            size="small"
            avatar={
                <Avatar
                    style={{ backgroundColor: chipColors.completed.main }}
                    classes={{ fallback: classes.completedAvatar }}
                />
            }
            classes={{
                outlined: classes.completedOutlined,
                outlinedPrimary: classes.completedOutlinedPrimary,
                label: classes.span,
            }}
        />
    );
}

StatusChip.propTypes = {
    status: PropTypes.string.isRequired,
};
